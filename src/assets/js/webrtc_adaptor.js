/**
 *
 * @returns
 */

import adapter from 'webrtc-adapter'
import { PeerStats } from './peer_stats'
import { WebSocketAdaptor } from './websocket_adaptor'

export default class WebRTCAdaptor {
  constructor(initialValues) {
    this.peerconnection_config = null
    this.sdp_constraints = null
    this.remotePeerConnection = []
    this.remotePeerConnectionStats = []
    this.remoteDescriptionSet = []
    this.iceCandidateList = []
    this.roomName = null
    this.videoTrackSender = null
    this.audioTrackSender = null
    this.playStreamId = []
    this.currentVolume = null

    this.audioContext = null
    this.soundOriginGainNode = null
    this.secondStreamGainNode = null
    this.localStream = null
    this.bandwidth = 900 // default bandwidth kbps
    this.isMultiPeer = false // used for multiple peer client
    this.multiPeerStreamId = null // used for multiple peer client
    this.isWebSocketTriggered = false
    this.webSocketAdaptor = null
    this.isPlayMode = false
    this.debug = false

    this.publishMode = 'camera' // screen, screen+camera

    /**
     * Supported candidate types. Below types are for both sending and receiving candidates.
     * It means if when client receives candidate from STUN server, it sends to the server if candidate's protocol
     * is in the list. Likely, when client receives remote candidate from server, it adds as ice candidate
     * if candidate protocol is in the list below.
     */
    this.candidateTypes = ['udp', 'tcp']

    this.desktopStream = null

    /**
     * The cam_location below is effective when camera and screen is send at the same time.
     * possible values are top and bottom. It's on right all the time
     */
    this.camera_location = 'top'

    /**
     * The cam_margin below is effective when camera and screen is send at the same time.
     * This is the margin value in px from the edges
     */
    this.camera_margin = 15

    /**
     * this camera_percent is how large the camera view appear on the screen. It's %15 by default.
     */
    this.camera_percent = 15

    for (const key in initialValues) {
      if (initialValues.hasOwnProperty(key)) {
        this[key] = initialValues[key]
      }
    }

    this.localVideo = document.getElementById(this.localVideoId)
    this.remoteVideo = document.getElementById(this.remoteVideoId)

    // It should be compatible with previous version
    if (this.mediaConstraints.video === 'camera') {
      this.publishMode = 'camera'
    } else if (this.mediaConstraints.video === 'screen') {
      this.publishMode = 'screen'
    } else if (this.mediaConstraints.video === 'screen+camera') {
      this.publishMode = 'screen+camera'
    }

    if (!this.isPlayMode && typeof this.mediaConstraints !== 'undefined' && this.localStream == null) {
      this.checkWebRTCPermissions()
      // Check browser support for screen share function
      this.checkBrowserScreenShareSupported()

      // Get devices only in publish mode.
      this.getDevices()
      this.trackDeviceChange()

      if (typeof this.mediaConstraints.video !== 'undefined' && this.mediaConstraints.video !== false) {
        this.openStream(this.mediaConstraints, this.mode)
      } else {
        // get only audio
        const media_audio_constraint = { audio: this.mediaConstraints.audio }
        this.navigatorUserMedia(
          media_audio_constraint,
          (stream) => {
            this.gotStream(stream)
          },
          true
        )
      }
    } else {
      // just playing, it does not open any stream
      // eslint-disable-next-line no-lonely-if
      if (this.webSocketAdaptor === null || this.webSocketAdaptor.isConnected() === false) {
        this.webSocketAdaptor = new WebSocketAdaptor({
          websocket_url: this.websocket_url,
          webrtcadaptor: this,
          callback: this.callback,
          callbackError: this.callbackError,
          debug: this.debug,
        })
      }
    }
  }

  setDesktopwithCameraSource(stream, streamId, audioStream, onEndedCallback) {
    this.desktopStream = stream
    this.navigatorUserMedia(
      { video: true, audio: false },
      (cameraStream) => {
        // create a canvas element
        const canvas = document.createElement('canvas')
        const canvasContext = canvas.getContext('2d')

        // create video element for screen
        // var screenVideo = document.getElementById('sourceVideo');
        const screenVideo = document.createElement('video')

        screenVideo.srcObject = stream
        screenVideo.play()
        // create video element for camera
        const cameraVideo = document.createElement('video')

        cameraVideo.srcObject = cameraStream
        cameraVideo.play()
        const canvasStream = canvas.captureStream(15)

        if (this.localStream == null) {
          this.gotStream(canvasStream)
        } else {
          this.updateVideoTrack(canvasStream, streamId, this.mediaConstraints, onended, null)
        }
        if (onEndedCallback != null) {
          stream.getVideoTracks()[0].onended = (event) => {
            onEndedCallback(event)
          }
        }

        // update the canvas
        setInterval(() => {
          // draw screen to canvas
          canvas.width = screenVideo.videoWidth
          canvas.height = screenVideo.videoHeight
          canvasContext.drawImage(screenVideo, 0, 0, canvas.width, canvas.height)

          const cameraWidth = screenVideo.videoWidth * (this.camera_percent / 100)
          const cameraHeight = (cameraVideo.videoHeight / cameraVideo.videoWidth) * cameraWidth

          const positionX = canvas.width - cameraWidth - this.camera_margin
          let positionY

          if (this.camera_location === 'top') {
            positionY = this.camera_margin
          } else {
            // if not top, make it bottom
            // draw camera on right bottom corner
            positionY = canvas.height - cameraHeight - this.camera_margin
          }
          canvasContext.drawImage(cameraVideo, positionX, positionY, cameraWidth, cameraHeight)
        }, 66)
      },
      true
    )
  }

  trackDeviceChange() {
    navigator.mediaDevices.ondevicechange = () => {
      this.getDevices()
    }
  }

  getDevices() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const deviceArray = []
        let checkAudio = false
        devices.forEach((device) => {
          if (device.kind === 'audioinput' || device.kind === 'videoinput') {
            deviceArray.push(device)
            if (device.kind === 'audioinput') {
              checkAudio = true
            }
          }
        })
        this.callback('available_devices', deviceArray)
        if (checkAudio === false && this.localStream == null) {
          console.log('Audio input not found')
          console.log('Retrying to get user media without audio')
          this.openStream({ video: true, audio: false }, this.mode)
        }
      })
      .catch((err) => {
        console.error(`Cannot get devices -> error name: ${err.name}: ${err.message}`)
      })
  }

  prepareStreamTracks(mediaConstraints, audioConstraint, stream, streamId) {
    // this trick, getting audio and video separately, make us add or remove tracks on the fly
    const audioTrack = stream.getAudioTracks()
    let audioStream
    if (audioTrack.length > 0 && this.publishMode === 'camera') {
      audioTrack[0].stop()
      stream.removeTrack(audioTrack[0])
    }
    // now get only audio to add this stream
    if (audioConstraint !== 'undefined' && audioConstraint !== false) {
      const media_audio_constraint = { audio: audioConstraint }
      this.navigatorUserMedia(
        media_audio_constraint,
        (audio_Stream) => {
          audioStream = this.setGainNodeStream(audio_Stream)

          // add callback if desktop is sharing
          const onended = () => {
            this.callback('screen_share_stopped')
            this.setVideoCameraSource(streamId, mediaConstraints, null, true)
          }

          if (this.publishMode === 'screen') {
            this.updateVideoTrack(stream, streamId, mediaConstraints, onended, true)
            if (audioTrack.length > 0) {
              const mixedStream = this.mixAudioStreams(stream, audioStream, streamId)
              this.updateAudioTrack(mixedStream, streamId, null)
            } else {
              this.updateAudioTrack(audioStream, streamId, null)
            }
          } else if (this.publishMode === 'screen+camera') {
            if (audioTrack.length > 0) {
              const mixedStream = this.mixAudioStreams(stream, audioStream, streamId)
              this.updateAudioTrack(mixedStream, streamId, null)
              this.setDesktopwithCameraSource(stream, streamId, mixedStream, onended)
            } else {
              this.updateAudioTrack(audioStream, streamId, null)
              this.setDesktopwithCameraSource(stream, streamId, audioStream, onended)
            }
          } else {
            if (audioConstraint !== false && audioConstraint !== undefined) {
              stream.addTrack(audioStream.getAudioTracks()[0])
            }
            this.gotStream(stream)
          }
        },
        true
      )
    } else {
      if (typeof audioStream !== 'undefined' && audioStream.getAudioTracks()[0] != null) {
        stream.addTrack(audioStream.getAudioTracks()[0])
      }
      this.gotStream(stream)
    }
  }

  navigatorUserMedia(mediaConstraints, func, catch_error) {
    if (catch_error === true) {
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(func)
        .catch((error) => {
          if (error.name === 'NotFoundError') {
            this.getDevices()
          } else {
            // this.callbackError(error.name, error.message)
          }
        })
    } else {
      navigator.mediaDevices.getUserMedia(mediaConstraints).then(func)
    }
  }

  /**
   * Get user media
   */
  getUserMedia(mediaConstraints, audioConstraint, streamId) {
    // Check Media Constraint video value screen or screen + camera
    if (this.publishMode === 'screen+camera' || this.publishMode === 'screen') {
      navigator.mediaDevices
        .getDisplayMedia(mediaConstraints)
        .then((stream) => {
          this.prepareStreamTracks(mediaConstraints, audioConstraint, stream, streamId)
        })
        .catch((error) => {
          if (error.name === 'NotAllowedError') {
            console.debug('Permission denied error')
            this.callbackError('ScreenSharePermissionDenied')

            // Redirect Default Stream Camera
            if (this.localStream == null) {
              mediaConstraints = {
                video: true,
                audio: true,
              }

              this.openStream(mediaConstraints)
            } else {
              this.switchVideoCameraCapture(streamId)
            }
          }
        })
    }
    // If mediaConstraints only user camera
    else {
      this.navigatorUserMedia(
        mediaConstraints,
        (stream) => {
          this.prepareStreamTracks(mediaConstraints, audioConstraint, stream, streamId)
        },
        true
      )
    }
  }

  /**
   * Open media stream, it may be screen, camera or audio
   */
  openStream(mediaConstraints) {
    this.mediaConstraints = mediaConstraints
    let audioConstraint = false
    if (typeof mediaConstraints.audio !== 'undefined' && mediaConstraints.audio !== false) {
      audioConstraint = mediaConstraints.audio
    }

    if (typeof mediaConstraints.video !== 'undefined') {
      this.getUserMedia(mediaConstraints, audioConstraint)
    } else {
      console.error('MediaConstraint video is not defined')
      this.callbackError('media_constraint_video_not_defined')
    }
  }

  /**
   * Closes stream, if you want to stop peer connection, call stop(streamId)
   */
  closeStream() {
    this.localStream.getVideoTracks().forEach(function (track) {
      track.onended = null
      track.stop()
    })

    this.localStream.getAudioTracks().forEach(function (track) {
      track.onended = null
      track.stop()
    })
  }

  /*
   * Checks if we is permitted from browser
   */
  checkWebRTCPermissions() {
    if (!('WebSocket' in window)) {
      console.log('WebSocket not supported.')
      this.callbackError('WebSocketNotSupported')
      return
    }

    if (typeof navigator.mediaDevices === 'undefined' && this.isPlayMode === false) {
      console.log('Cannot open camera and mic because of unsecure context. Please Install SSL(https)')
      this.callbackError('UnsecureContext')
      return
    }
    if (
      typeof navigator.mediaDevices === 'undefined' ||
      navigator.mediaDevices === undefined ||
      navigator.mediaDevices === null
    ) {
      this.callbackError('getUserMediaIsNotAllowed')
    }
  }

  /**
   * Checks browser supports screen share feature
   * if exist it calls callback with "browser_screen_share_supported"
   */

  checkBrowserScreenShareSupported() {
    if (
      (typeof navigator.mediaDevices !== 'undefined' && navigator.mediaDevices.getDisplayMedia) ||
      navigator.getDisplayMedia
    ) {
      this.callback('browser_screen_share_supported')
    }
  }

  enableSecondStreamInMixedAudio(enable) {
    if (this.secondStreamGainNode !== null) {
      if (enable) {
        this.secondStreamGainNode.gain.value = 1
      } else {
        this.secondStreamGainNode.gain.value = 0
      }
    }
  }

  publish(streamId, token, subscriberId, subscriberCode) {
    // If it started with playOnly mode and wants to publish now
    let jsCmd
    if (this.localStream == null) {
      this.navigatorUserMedia(
        this.mediaConstraints,
        (stream) => {
          this.gotStream(stream)
          jsCmd = {
            command: 'publish',
            streamId,
            token,
            subscriberId: typeof subscriberId !== undefined ? subscriberId : '',
            subscriberCode: typeof subscriberCode !== undefined ? subscriberCode : '',
            video: this.localStream.getVideoTracks().length > 0,
            audio: this.localStream.getAudioTracks().length > 0,
          }
          this.webSocketAdaptor.send(JSON.stringify(jsCmd))
        },
        false
      )
    } else {
      jsCmd = {
        command: 'publish',
        streamId,
        token,
        subscriberId: typeof subscriberId !== undefined ? subscriberId : '',
        subscriberCode: typeof subscriberCode !== undefined ? subscriberCode : '',
        video: this.localStream.getVideoTracks().length > 0,
        audio: this.localStream.getAudioTracks().length > 0,
      }
    }
    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  joinRoom(roomName, streamId) {
    this.roomName = roomName

    const jsCmd = {
      command: 'joinRoom',
      room: roomName,
      streamId,
    }
    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  play(streamId, token, roomId, enableTracks, subscriberId, subscriberCode) {
    this.playStreamId.push(streamId)
    const jsCmd = {
      command: 'play',
      streamId,
      token,
      room: roomId,
      trackList: enableTracks,
      subscriberId: typeof subscriberId !== undefined ? subscriberId : '',
      subscriberCode: typeof subscriberCode !== undefined ? subscriberCode : '',
    }

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  stop(streamId) {
    this.closePeerConnection(streamId)

    const jsCmd = {
      command: 'stop',
      streamId,
    }

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  join(streamId) {
    const jsCmd = {
      command: 'join',
      streamId,
      multiPeer: this.isMultiPeer && this.multiPeerStreamId == null,
      mode: this.isPlayMode ? 'play' : 'both',
    }

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  leaveFromRoom(roomName) {
    this.roomName = roomName
    const jsCmd = {
      command: 'leaveFromRoom',
      room: roomName,
    }
    console.log(`leave request is sent for ${roomName}`)

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  leave(streamId) {
    const jsCmd = {
      command: 'leave',
      streamId: this.isMultiPeer && this.multiPeerStreamId != null ? this.multiPeerStreamId : streamId,
    }

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
    this.closePeerConnection(streamId)
    this.multiPeerStreamId = null
  }

  getStreamInfo(streamId) {
    const jsCmd = {
      command: 'getStreamInfo',
      streamId,
    }
    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  getRoomInfo(roomName, streamId) {
    const jsCmd = {
      command: 'getRoomInfo',
      streamId,
      room: roomName,
    }
    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  enableTrack(mainTrackId, trackId, enabled) {
    const jsCmd = {
      command: 'enableTrack',
      streamId: mainTrackId,
      trackId,
      enabled,
    }
    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  getTracks(streamId, token) {
    this.playStreamId.push(streamId)
    const jsCmd = {
      command: 'getTrackList',
      streamId,
      token,
    }

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  gotStream(stream) {
    stream = this.setGainNodeStream(stream)

    this.localStream = stream
    this.localVideo.srcObject = stream

    if (this.webSocketAdaptor == null || this.webSocketAdaptor.isConnected() === false) {
      this.webSocketAdaptor = new WebSocketAdaptor({
        websocket_url: this.websocket_url,
        webrtcadaptor: this,
        callback: this.callback,
        callbackError: this.callbackError,
        debug: this.debug,
      })
    }
    this.getDevices()
  }

  switchDesktopCapture(streamId) {
    this.publishMode = 'screen'

    let audioConstraint = false
    if (typeof this.mediaConstraints.audio !== 'undefined' && this.mediaConstraints.audio !== false) {
      audioConstraint = this.mediaConstraints.audio
    }

    this.getUserMedia(this.mediaConstraints, audioConstraint, streamId)
  }

  /*
   * This method mixed the first stream audio to the second stream audio and
   * returns mixed stream.
   * stream: Initiali stream that contain video and audio
   *
   */
  mixAudioStreams(stream, secondStream, streamId) {
    // console.debug("audio stream track count: " + audioStream.getAudioTracks().length);
    const composedStream = new MediaStream()
    // added the video stream from the screen
    stream.getVideoTracks().forEach(function (videoTrack) {
      composedStream.addTrack(videoTrack)
    })

    this.audioContext = new AudioContext()
    const audioDestionation = this.audioContext.createMediaStreamDestination()

    if (stream.getAudioTracks().length > 0) {
      this.soundOriginGainNode = this.audioContext.createGain()

      // Adjust the gain for screen sound
      this.soundOriginGainNode.gain.value = 1
      const audioSource = this.audioContext.createMediaStreamSource(stream)

      audioSource.connect(this.soundOriginGainNode).connect(audioDestionation)
    } else {
      console.debug('Origin stream does not have audio track')
    }

    if (secondStream.getAudioTracks().length > 0) {
      this.secondStreamGainNode = this.audioContext.createGain()

      // Adjust the gain for second sound
      this.secondStreamGainNode.gain.value = 1

      const audioSource2 = this.audioContext.createMediaStreamSource(secondStream)
      audioSource2.connect(this.secondStreamGainNode).connect(audioDestionation)
    } else {
      console.debug('Second stream does not have audio track')
    }

    audioDestionation.stream.getAudioTracks().forEach(function (track) {
      composedStream.addTrack(track)
      console.log('audio destination add track')
    })

    return composedStream
  }

  setGainNodeStream(stream) {
    // Get the videoTracks from the stream.
    const videoTracks = stream.getVideoTracks()

    // Get the audioTracks from the stream.
    const audioTracks = stream.getAudioTracks()

    /**
     * Create a new audio context and build a stream source,
     * stream destination and a gain node. Pass the stream into
     * the mediaStreamSource so we can use it in the Web Audio API.
     */
    this.audioContext = new AudioContext()
    const mediaStreamSource = this.audioContext.createMediaStreamSource(stream)
    const mediaStreamDestination = this.audioContext.createMediaStreamDestination()
    this.soundOriginGainNode = this.audioContext.createGain()

    /**
     * Connect the stream to the gainNode so that all audio
     * passes through the gain and can be controlled by it.
     * Then pass the stream from the gain to the mediaStreamDestination
     * which can pass it back to the RTC client.
     */
    mediaStreamSource.connect(this.soundOriginGainNode)
    this.soundOriginGainNode.connect(mediaStreamDestination)

    if (this.currentVolume == null) {
      this.soundOriginGainNode.gain.value = 1
    } else {
      this.soundOriginGainNode.gain.value = this.currentVolume
    }

    /**
     * The mediaStreamDestination.stream outputs a MediaStream object
     * containing a single AudioMediaStreamTrack. Add the video track
     * to the new stream to rejoin the video with the controlled audio.
     */
    const controlledStream = mediaStreamDestination.stream

    for (const videoTrack of videoTracks) {
      controlledStream.addTrack(videoTrack)
    }
    for (const audioTrack of audioTracks) {
      controlledStream.addTrack(audioTrack)
    }

    /**
     * Use the stream that went through the gainNode. This
     * is the same stream but with altered input volume levels.
     */
    return controlledStream
  }

  switchAudioInputSource(streamId, deviceId) {
    // stop the track because in some android devices need to close the current camera stream
    const audioTrack = this.localStream.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.stop()
    } else {
      console.warn('There is no audio track in local stream')
    }

    if (typeof deviceId !== 'undefined') {
      this.mediaConstraints.audio = { deviceId }
    }
    this.setAudioInputSource(streamId, this.mediaConstraints, null, true, deviceId)
  }

  switchVideoCameraCapture(streamId, deviceId) {
    // stop the track because in some android devices need to close the current camera stream
    const videoTrack = this.localStream.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.stop()
    } else {
      console.warn('There is no video track in local stream')
    }

    this.publishMode = 'camera'

    if (typeof deviceId !== 'undefined') {
      this.mediaConstraints.video = { deviceId }
    }
    this.setVideoCameraSource(streamId, this.mediaConstraints, null, true, deviceId)
  }

  switchDesktopCaptureWithCamera(streamId) {
    this.publishMode = 'screen+camera'

    let audioConstraint = false
    if (typeof this.mediaConstraints.audio !== 'undefined' && this.mediaConstraints.audio != false) {
      audioConstraint = this.mediaConstraints.audio
    }
    this.getUserMedia(this.mediaConstraints, audioConstraint, streamId)
  }

  /**
   * This method updates the local stream. It removes existant audio track from the local stream
   * and add the audio track in `stream` parameter to the local stream
   */
  updateLocalAudioStream(stream, onEndedCallback) {
    const audioTrack = this.localStream.getAudioTracks()[0]
    const newAudioTrack = stream.getAudioTracks()[0]

    if (audioTrack != null) {
      this.localStream.removeTrack(audioTrack)
      audioTrack.stop()
    }

    this.localStream.addTrack(newAudioTrack)

    if (this.localVideo != null) {
      // it can be null
      this.localVideo.srcObject = this.localStream
    }
    if (onEndedCallback != null) {
      stream.getAudioTracks()[0].onended = function (event) {
        onEndedCallback(event)
      }
    }
  }

  /**
   * This method updates the local stream. It removes existant video track from the local stream
   * and add the video track in `stream` parameter to the local stream
   */
  updateLocalVideoStream(stream, onEndedCallback, stopDesktop) {
    if (stopDesktop && this.desktopStream != null) {
      this.desktopStream.getVideoTracks()[0].stop()
    }

    const videoTrack = this.localStream.getVideoTracks()[0]
    this.localStream.removeTrack(videoTrack)
    videoTrack.stop()
    this.localStream.addTrack(stream.getVideoTracks()[0])
    this.localVideo.srcObject = this.localStream

    if (onEndedCallback != null) {
      stream.getVideoTracks()[0].onended = function (event) {
        onEndedCallback(event)
      }
    }
  }

  /**
   * This method sets Audio Input Source.
   * It calls updateAudioTrack function for the update local audio stream.
   */
  setAudioInputSource(streamId, mediaConstraints, onEndedCallback) {
    this.navigatorUserMedia(
      mediaConstraints,
      (stream) => {
        this.updateAudioTrack(stream, streamId, mediaConstraints, onEndedCallback)
      },
      true
    )
  }

  /**
   * This method sets Video Input Source.
   * It calls updateVideoTrack function for the update local video stream.
   */
  setVideoCameraSource(streamId, mediaConstraints, onEndedCallback, stopDesktop) {
    this.navigatorUserMedia(
      mediaConstraints,
      (stream) => {
        stream = this.setGainNodeStream(stream)
        this.updateVideoTrack(stream, streamId, mediaConstraints, onEndedCallback, stopDesktop)
        this.updateAudioTrack(stream, streamId, mediaConstraints, onEndedCallback)
      },
      true
    )
  }

  updateAudioTrack(stream, streamId, onEndedCallback) {
    if (this.remotePeerConnection[streamId] != null) {
      const audioTrackSender = this.remotePeerConnection[streamId].getSenders().find(function (s) {
        return s.track.kind === 'audio'
      })

      if (audioTrackSender) {
        audioTrackSender
          .replaceTrack(stream.getAudioTracks()[0])
          .then(() => {
            this.updateLocalAudioStream(stream, onEndedCallback)
          })
          .catch(function (error) {
            console.log(error.name)
          })
      } else {
        console.error('AudioTrackSender is undefined or null')
      }
    } else {
      this.updateLocalAudioStream(stream, onEndedCallback)
    }
  }

  updateVideoTrack(stream, streamId, mediaConstraints, onEndedCallback, stopDesktop) {
    if (this.remotePeerConnection[streamId] != null) {
      const videoTrackSender = this.remotePeerConnection[streamId].getSenders().find(function (s) {
        return s.track.kind == 'video'
      })

      if (videoTrackSender) {
        videoTrackSender
          .replaceTrack(stream.getVideoTracks()[0])
          .then(() => {
            this.updateLocalVideoStream(stream, onEndedCallback, stopDesktop)
          })
          .catch((error) => {
            console.log(error.name)
          })
      } else {
        console.error('VideoTrackSender is undefined or null')
      }
    } else {
      this.updateLocalVideoStream(stream, onEndedCallback, stopDesktop)
    }
  }

  onTrack(event, streamId) {
    console.log('onTrack')
    if (this.remoteVideo != null) {
      // this.remoteVideo.srcObject = event.streams[0];
      if (this.remoteVideo.srcObject !== event.streams[0]) {
        this.remoteVideo.srcObject = event.streams[0]
        console.log('Received remote stream')
      }
    } else {
      const dataObj = {
        stream: event.streams[0],
        track: event.track,
        streamId,
      }
      this.callback('newStreamAvailable', dataObj)
    }
  }

  iceCandidateReceived(event, streamId) {
    if (event.candidate) {
      let protocolSupported = false

      if (event.candidate.candidate === '') {
        // event candidate can be received and its value can be "".
        // don't compare the protocols
        protocolSupported = true
      } else if (typeof event.candidate.protocol === 'undefined') {
        this.candidateTypes.forEach((element) => {
          if (event.candidate.candidate.toLowerCase().includes(element)) {
            protocolSupported = true
          }
        })
      } else {
        protocolSupported = this.candidateTypes.includes(event.candidate.protocol.toLowerCase())
      }

      if (protocolSupported) {
        const jsCmd = {
          command: 'takeCandidate',
          streamId,
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate,
        }

        if (this.debug) {
          console.log(`sending ice candiate for stream Id ${streamId}`)
          console.log(JSON.stringify(event.candidate))
        }
        this.webSocketAdaptor.send(JSON.stringify(jsCmd))
      } else {
        console.log(
          `Candidate's protocol(full sdp: ${event.candidate.candidate}) is not supported. Supported protocols: ${this.candidateTypes}`
        )
        if (event.candidate.candidate !== '') {
          //
          this.callbackError(
            'protocol_not_supported',
            `Support protocols: ${this.candidateTypes.toString()} candidate: ${event.candidate.candidate}`
          )
        }
      }
    } else {
      console.log('No event.candidate in the iceCandidate event')
    }
  }

  initDataChannel(streamId, dataChannel) {
    dataChannel.onerror = (error) => {
      console.log('Data Channel Error:', error)
      const obj = {
        streamId,
        error,
      }
      console.log('channel status: ', dataChannel.readyState)
      if (dataChannel.readyState !== 'closed') {
        this.callbackError('data_channel_error', obj)
      }
    }

    dataChannel.onmessage = (event) => {
      const obj = {
        streamId,
        event,
      }
      this.callback('data_received', obj)
    }

    dataChannel.onopen = () => {
      this.remotePeerConnection[streamId].dataChannel = dataChannel
      console.log('Data channel is opened')
      this.callback('data_channel_opened', streamId)
    }

    dataChannel.onclose = () => {
      console.log('Data channel is closed')
      this.callback('data_channel_closed', streamId)
    }
  }

  // data channel mode can be "publish" , "play" or "peer" based on this it is decided which way data channel is created
  initPeerConnection(streamId, dataChannelMode) {
    if (this.remotePeerConnection[streamId] == null) {
      const closedStreamId = streamId
      console.log(`stream id in init peer connection: ${streamId} close stream id: ${closedStreamId}`)
      this.remotePeerConnection[streamId] = new RTCPeerConnection(this.peerconnection_config)
      this.remoteDescriptionSet[streamId] = false
      this.iceCandidateList[streamId] = []
      if (!this.playStreamId.includes(streamId)) {
        if (this.localStream != null) {
          this.remotePeerConnection[streamId].addStream(this.localStream)
        }
      }
      this.remotePeerConnection[streamId].onicecandidate = (event) => {
        this.iceCandidateReceived(event, closedStreamId)
      }
      this.remotePeerConnection[streamId].ontrack = (event) => {
        this.onTrack(event, closedStreamId)
      }

      if (dataChannelMode === 'publish') {
        // open data channel if it's publish mode peer connection
        const dataChannelOptions = {
          ordered: true,
        }
        if (this.remotePeerConnection[streamId].createDataChannel) {
          const dataChannel = this.remotePeerConnection[streamId].createDataChannel(streamId, dataChannelOptions)
          this.initDataChannel(streamId, dataChannel)
        } else {
          console.warn('CreateDataChannel is not supported')
        }
      } else if (dataChannelMode === 'play') {
        // in play mode, server opens the data channel
        this.remotePeerConnection[streamId].ondatachannel = (ev) => {
          this.initDataChannel(streamId, ev.channel)
        }
      } else {
        // for peer mode do both for now
        const dataChannelOptions = {
          ordered: true,
        }

        if (this.remotePeerConnection[streamId].createDataChannel) {
          const dataChannelPeer = this.remotePeerConnection[streamId].createDataChannel(streamId, dataChannelOptions)
          this.initDataChannel(streamId, dataChannelPeer)

          this.remotePeerConnection[streamId].ondatachannel = (ev) => {
            this.initDataChannel(streamId, ev.channel)
          }
        } else {
          console.warn('CreateDataChannel is not supported')
        }
      }

      this.remotePeerConnection[streamId].oniceconnectionstatechange = () => {
        const obj = { state: this.remotePeerConnection[streamId].iceConnectionState, streamId }
        this.callback('ice_connection_state_changed', obj)

        if (!this.isPlayMode) {
          if (this.remotePeerConnection[streamId].iceConnectionState === 'connected') {
            this.changeBandwidth(this.bandwidth, streamId)
              .then(() => {
                console.log(`Bandwidth is changed to ${this.bandwidth}`)
              })
              .catch((e) => console.warn(e))
          }
        }
      }
    }
  }

  closePeerConnection(streamId) {
    if (this.remotePeerConnection[streamId] != null) {
      if (this.remotePeerConnection[streamId].dataChannel != null) {
        this.remotePeerConnection[streamId].dataChannel.close()
      }
      if (this.remotePeerConnection[streamId].signalingState !== 'closed') {
        this.remotePeerConnection[streamId].close()
        this.remotePeerConnection[streamId] = null
        delete this.remotePeerConnection[streamId]
        const playStreamIndex = this.playStreamId.indexOf(streamId)
        if (playStreamIndex !== -1) {
          this.playStreamId.splice(playStreamIndex, 1)
        }
      }
    }

    if (this.remotePeerConnectionStats[streamId] != null) {
      clearInterval(this.remotePeerConnectionStats[streamId].timerId)
      delete this.remotePeerConnectionStats[streamId]
    }
  }

  signallingState(streamId) {
    if (this.remotePeerConnection[streamId] != null) {
      return this.remotePeerConnection[streamId].signalingState
    }
    return null
  }

  iceConnectionState(streamId) {
    if (this.remotePeerConnection[streamId] != null) {
      return this.remotePeerConnection[streamId].iceConnectionState
    }
    return null
  }

  gotDescription(configuration, streamId) {
    this.remotePeerConnection[streamId]
      .setLocalDescription(configuration)
      .then(() => {
        console.debug(`Set local description successfully for stream Id ${streamId}`)

        const jsCmd = {
          command: 'takeConfiguration',
          streamId,
          type: configuration.type,
          sdp: configuration.sdp,
        }

        if (this.debug) {
          console.debug('local sdp: ')
          console.debug(configuration.sdp)
        }

        this.webSocketAdaptor.send(JSON.stringify(jsCmd))
      })
      .catch((error) => {
        console.error(`Cannot set local description. Error is: ${error}`)
      })
  }

  turnOffLocalCamera() {
    if (this.remotePeerConnection != null) {
      const track = this.localStream.getVideoTracks()[0]
      track.enabled = false
    } else {
      this.callbackError('NoActiveConnection')
    }
  }

  turnOnLocalCamera() {
    // If it started in playOnly mode and wants to turn on the camera
    if (this.localStream == null) {
      this.navigatorUserMedia(
        this.mediaConstraints,
        (stream) => {
          this.gotStream(stream)
        },
        false
      )
    } else if (this.remotePeerConnection != null) {
      const track = this.localStream.getVideoTracks()[0]
      track.enabled = true
    }
  }

  muteLocalMic() {
    if (this.remotePeerConnection != null) {
      const track = this.localStream.getAudioTracks()[0]
      track.enabled = false
    } else {
      this.callbackError('NoActiveConnection')
    }
  }

  /**
   * if there is audio it calls callbackError with "AudioAlreadyActive" parameter
   */
  unmuteLocalMic() {
    if (this.remotePeerConnection != null) {
      const track = this.localStream.getAudioTracks()[0]
      track.enabled = true
    } else {
      this.callbackError('NoActiveConnection')
    }
  }

  takeConfiguration(idOfStream, configuration, typeOfConfiguration) {
    const streamId = idOfStream
    const type = typeOfConfiguration
    const conf = configuration
    const isTypeOffer = type === 'offer'

    let dataChannelMode = 'publish'
    if (isTypeOffer) {
      dataChannelMode = 'play'
    }

    this.initPeerConnection(streamId, dataChannelMode)

    this.remotePeerConnection[streamId]
      .setRemoteDescription(
        new RTCSessionDescription({
          sdp: conf,
          type,
        })
      )
      .then((response) => {
        if (this.debug) {
          console.debug(
            `set remote description is succesfull with response: ${response} for stream : ${streamId} and type: ${type}`
          )
          console.debug(conf)
        }

        this.remoteDescriptionSet[streamId] = true
        const { length } = this.iceCandidateList[streamId]
        console.debug(`Ice candidate list size to be added: ${length}`)
        for (let i = 0; i < length; i++) {
          this.addIceCandidate(streamId, this.iceCandidateList[streamId][i])
        }
        this.iceCandidateList[streamId] = []

        if (isTypeOffer) {
          // SDP constraints may be different in play mode
          console.log(`try to create answer for stream id: ${streamId}`)

          this.remotePeerConnection[streamId]
            .createAnswer(this.sdp_constraints)
            .then((c) => {
              console.log(`created answer for stream id: ${streamId}`)
              this.gotDescription(c, streamId)
            })
            .catch((error) => {
              console.error(`create answer error :${error}`)
            })
        }
      })
      .catch((error) => {
        if (this.debug) {
          console.error(`set remote description is failed with error: ${error}`)
        }
        if (error.toString().indexOf('InvalidAccessError') > -1 || error.toString().indexOf('setRemoteDescription') > -1) {
          /**
           * This error generally occurs in codec incompatibility.
           * AMS for a now supports H.264 codec. This error happens when some browsers try to open it from VP8.
           */
          this.callbackError('notSetRemoteDescription')
        }
      })
  }

  takeCandidate(idOfTheStream, tmpLabel, tmpCandidate) {
    const streamId = idOfTheStream
    const label = tmpLabel
    const candidateSdp = tmpCandidate

    const candidate = new RTCIceCandidate({
      sdpMLineIndex: label,
      candidate: candidateSdp,
    })

    const dataChannelMode = 'peer'
    this.initPeerConnection(streamId, dataChannelMode)

    if (this.remoteDescriptionSet[streamId] === true) {
      this.addIceCandidate(streamId, candidate)
    } else {
      console.debug('Ice candidate is added to list because remote description is not set yet')
      this.iceCandidateList[streamId].push(candidate)
    }
  }

  addIceCandidate(streamId, candidate) {
    let protocolSupported = false
    if (candidate.candidate === '') {
      // candidate can be received and its value can be "".
      // don't compare the protocols
      protocolSupported = true
    } else if (typeof candidate.protocol === 'undefined') {
      this.candidateTypes.forEach((element) => {
        if (candidate.candidate.toLowerCase().includes(element)) {
          protocolSupported = true
        }
      })
    } else {
      protocolSupported = this.candidateTypes.includes(candidate.protocol.toLowerCase())
    }

    if (protocolSupported) {
      this.remotePeerConnection[streamId]
        .addIceCandidate(candidate)
        .then(() => {
          if (this.debug) {
            console.log(`Candidate is added for stream ${streamId}`)
          }
        })
        .catch((error) => {
          console.error(`ice candiate cannot be added for stream id: ${streamId} error is: ${error}`)
          console.error(candidate)
        })
    } else if (this.debug) {
      console.log(
        `Candidate's protocol(${candidate.protocol}) is not supported.` +
          `Candidate: ${candidate.candidate} Supported protocols:${this.candidateTypes}`
      )
    }
  }

  startPublishing(idOfStream) {
    const streamId = idOfStream

    this.initPeerConnection(streamId, 'publish')

    this.remotePeerConnection[streamId]
      .createOffer(this.sdp_constraints)
      .then((configuration) => {
        this.gotDescription(configuration, streamId)
      })
      .catch((error) => {
        console.error(`create offer error for stream id: ${streamId} error: ${error}`)
      })
  }

  /**
   * If we have multiple video tracks in coming versions, this method may cause some issues
   */
  getVideoSender(streamId) {
    let videoSender = null
    if (
      (adapter.browserDetails.browser === 'chrome' ||
        adapter.browserDetails.browser === 'firefox' ||
        (adapter.browserDetails.browser === 'safari' && adapter.browserDetails.version >= 64)) &&
      'RTCRtpSender' in window &&
      'setParameters' in window.RTCRtpSender.prototype
    ) {
      if (this.remotePeerConnection[streamId] != null) {
        const senders = this.remotePeerConnection[streamId].getSenders()

        for (let i = 0; i < senders.length; i++) {
          if (senders[i].track != null && senders[i].track.kind == 'video') {
            videoSender = senders[i]
            break
          }
        }
      }
    }
    return videoSender
  }

  /**
   * bandwidth is in kbps
   */
  changeBandwidth(bandwidth, streamId) {
    let errorDefinition = ''

    const videoSender = this.getVideoSender(streamId)

    if (videoSender != null) {
      const parameters = videoSender.getParameters()

      if (!parameters.encodings) {
        parameters.encodings = [{}]
      }

      if (bandwidth === 'unlimited') {
        delete parameters.encodings[0].maxBitrate
      } else {
        parameters.encodings[0].maxBitrate = bandwidth * 1000
      }

      return videoSender.setParameters(parameters)
    }
    errorDefinition = 'Video sender not found to change bandwidth. Streaming may not be active'

    return Promise.reject(errorDefinition)
  }

  getStats(streamId) {
    console.log(`peerstatsgetstats = ${this.remotePeerConnectionStats[streamId]}`)

    this.remotePeerConnection[streamId].getStats(null).then((stats) => {
      let bytesReceived = -1
      let videoPacketsLost = -1
      let audioPacketsLost = -1
      let fractionLost = -1
      let currentTime = -1
      let bytesSent = -1
      let audioLevel = -1
      let qlr = ''
      let framesEncoded = -1
      let width = -1
      let height = -1
      let fps = -1
      let frameWidth = -1
      let frameHeight = -1
      let videoRoundTripTime = -1
      let videoJitter = -1

      let audioRoundTripTime = -1
      let audioJitter = -1

      let framesDecoded = -1
      let framesDropped = -1
      let framesReceived = -1

      let audioJitterAverageDelay = -1
      let videoJitterAverageDelay = -1

      stats.forEach((value) => {
        // console.log(value);

        if (value.type === 'inbound-rtp' && typeof value.kind !== 'undefined') {
          bytesReceived += value.bytesReceived
          if (value.kind === 'audio') {
            audioPacketsLost = value.packetsLost
          } else if (value.kind === 'video') {
            videoPacketsLost = value.packetsLost
          }

          fractionLost += value.fractionLost
          currentTime = value.timestamp
        } else if (value.type === 'outbound-rtp') {
          // TODO: SPLIT AUDIO AND VIDEO BITRATES
          bytesSent += value.bytesSent
          currentTime = value.timestamp
          qlr = value.qualityLimitationReason
          if (value.framesEncoded != null) {
            // audio tracks are undefined here
            framesEncoded += value.framesEncoded
          }
        } else if (value.type === 'track' && typeof value.kind !== 'undefined' && value.kind == 'audio') {
          if (typeof value.audioLevel !== 'undefined') {
            audioLevel = value.audioLevel
          }

          if (typeof value.jitterBufferDelay !== 'undefined' && typeof value.jitterBufferEmittedCount !== 'undefined') {
            audioJitterAverageDelay = value.jitterBufferDelay / value.jitterBufferEmittedCount
          }
        } else if (value.type === 'track' && typeof value.kind !== 'undefined' && value.kind == 'video') {
          if (typeof value.frameWidth !== 'undefined') {
            frameWidth = value.frameWidth
          }
          if (typeof value.frameHeight !== 'undefined') {
            frameHeight = value.frameHeight
          }

          if (typeof value.framesDecoded !== 'undefined') {
            framesDecoded = value.framesDecoded
          }

          if (typeof value.framesDropped !== 'undefined') {
            framesDropped = value.framesDropped
          }

          if (typeof value.framesReceived !== 'undefined') {
            framesReceived = value.framesReceived
          }

          if (typeof value.jitterBufferDelay !== 'undefined' && typeof value.jitterBufferEmittedCount !== 'undefined') {
            videoJitterAverageDelay = value.jitterBufferDelay / value.jitterBufferEmittedCount
          }
        } else if (value.type === 'remote-inbound-rtp' && typeof value.kind !== 'undefined') {
          if (typeof value.packetsLost !== 'undefined') {
            if (value.kind === 'video') {
              // this is the packetsLost for publishing
              videoPacketsLost = value.packetsLost
            } else if (value.kind === 'audio') {
              // this is the packetsLost for publishing
              audioPacketsLost = value.packetsLost
            }
          }

          if (typeof value.roundTripTime !== 'undefined') {
            if (value.kind === 'video') {
              videoRoundTripTime = value.roundTripTime
            } else if (value.kind === 'audio') {
              audioRoundTripTime = value.roundTripTime
            }
          }

          if (typeof value.jitter !== 'undefined') {
            if (value.kind === 'video') {
              videoJitter = value.jitter
            } else if (value.kind === 'audio') {
              audioJitter = value.jitter
            }
          }
        } else if (value.type === 'media-source') {
          if (value.kind === 'video') {
            // returns video source dimensions, not necessarily dimensions being encoded by browser
            width = value.width
            height = value.height
            fps = value.framesPerSecond
          }
        }
      })

      this.remotePeerConnectionStats[streamId].totalBytesReceived = bytesReceived
      this.remotePeerConnectionStats[streamId].videoPacketsLost = videoPacketsLost
      this.remotePeerConnectionStats[streamId].audioPacketsLost = audioPacketsLost
      this.remotePeerConnectionStats[streamId].fractionLost = fractionLost
      this.remotePeerConnectionStats[streamId].currentTime = currentTime
      this.remotePeerConnectionStats[streamId].totalBytesSent = bytesSent
      this.remotePeerConnectionStats[streamId].audioLevel = audioLevel
      this.remotePeerConnectionStats[streamId].qualityLimitationReason = qlr
      this.remotePeerConnectionStats[streamId].totalFramesEncoded = framesEncoded
      this.remotePeerConnectionStats[streamId].resWidth = width
      this.remotePeerConnectionStats[streamId].resHeight = height
      this.remotePeerConnectionStats[streamId].srcFps = fps
      this.remotePeerConnectionStats[streamId].frameWidth = frameWidth
      this.remotePeerConnectionStats[streamId].frameHeight = frameHeight
      this.remotePeerConnectionStats[streamId].videoRoundTripTime = videoRoundTripTime
      this.remotePeerConnectionStats[streamId].videoJitter = videoJitter
      this.remotePeerConnectionStats[streamId].audioRoundTripTime = audioRoundTripTime
      this.remotePeerConnectionStats[streamId].audioJitter = audioJitter
      this.remotePeerConnectionStats[streamId].framesDecoded = framesDecoded
      this.remotePeerConnectionStats[streamId].framesDropped = framesDropped
      this.remotePeerConnectionStats[streamId].framesReceived = framesReceived

      this.remotePeerConnectionStats[streamId].videoJitterAverageDelay = videoJitterAverageDelay
      this.remotePeerConnectionStats[streamId].audioJitterAverageDelay = audioJitterAverageDelay

      this.callback('updated_stats', this.remotePeerConnectionStats[streamId])
    })
  }

  disableStats(streamId) {
    clearInterval(this.remotePeerConnectionStats[streamId].timerId)
  }

  enableStats(streamId) {
    if (this.remotePeerConnectionStats[streamId] == null) {
      this.remotePeerConnectionStats[streamId] = new PeerStats(streamId)
      this.remotePeerConnectionStats[streamId].timerId = setInterval(() => {
        this.getStats(streamId)
      }, 5000)
    }
  }

  /**
   * After calling this function, create new WebRTCAdaptor instance, don't use the the same objectone
   * Because all streams are closed on server side as well when websocket connection is closed.
   */
  closeWebSocket() {
    for (const key in this.remotePeerConnection) {
      this.remotePeerConnection[key].close()
    }
    // free the remote peer connection by initializing again
    this.remotePeerConnection = []
    this.webSocketAdaptor.close()
  }

  peerMessage(streamId, definition, data) {
    const jsCmd = {
      command: 'peerMessageCommand',
      streamId,
      definition,
      data,
    }

    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  forceStreamQuality(streamId, resolution) {
    const jsCmd = {
      command: 'forceStreamQuality',
      streamId,
      streamHeight: resolution,
    }
    this.webSocketAdaptor.send(JSON.stringify(jsCmd))
  }

  sendData(streamId, message) {
    const { dataChannel } = this.remotePeerConnection[streamId]
    dataChannel.send(message)
  }
}
