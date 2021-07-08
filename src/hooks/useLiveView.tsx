import { useEffect, useRef, useCallback, useState } from 'react'
import videojs from 'video.js'

import useUser from './useUser'

import WebRTCAdaptor from '../assets/js/webrtc_adaptor'
import useLiveChat, { LiveChatMessageType } from './useLiveChat'

import { UserType } from '../types/UserType'

const streamingName = 'lup20k'
const token = ''
let webRTCAdaptor: any = {}

const hlsExtension = 'm3u8'

const appName = process.env.REACT_APP_ANTMEDIA_APPNAME

const mediaConstraints = { video: false, audio: false }
const sdpConstraints = { OfferToReceiveAudio: true, OfferToReceiveVideo: true }
const websocketURL = `${process.env.REACT_APP_WEBSOCKET_MAIN_URL}/${appName}/websocket?rtmpForward=false`
const pc_config = {
  iceServers: [
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
  ],
}

type UseLiveViewProps = {
  videojsId?: string
}

const useLiveView = (props: UseLiveViewProps) => {
  const { videojsId } = props

  const { addMessage, chatRef } = useLiveChat()

  const { user } = useUser()
  const [userName, setUserName] = useState('')

  const videoRef = useRef<HTMLVideoElement>(null)

  const initWebRTCAdaptor = useCallback(() => {
    webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: websocketURL,
      mediaConstraints,
      peerconnection_config: pc_config,
      sdp_constraints: sdpConstraints,
      remoteVideoId: videoRef,
      isPlayMode: true,
      debug: false,
      callback: (info: any, description: any) => {
        if (info === 'initialized') {
          console.log('initialized')

          webRTCAdaptor.getStreamInfo(streamingName)
        } else if (info === 'streamInformation') {
          console.log('stream information')

          webRTCAdaptor.play(streamingName, token)
        } else if (info === 'play_started') {
          // joined the stream
          console.log('play started')

          // document.getElementById('video_info').style.display = 'none'
          playWebRTCVideo() // Only play the video
        } else if (info === 'play_finished') {
          // leaved the stream
          console.log('play finished')
          // check that publish may start again
          setTimeout(() => {
            webRTCAdaptor.getStreamInfo(streamingName)
          }, 3000)
        } else if (info === 'closed') {
          // console.log("Connection closed");
          if (typeof description !== 'undefined') {
            console.log(`Connecton closed: ${JSON.stringify(description)}`)
          }
        } else if (info === 'bitrateMeasurement') {
          console.log('bitrateMeasurement')
        } else if (info === 'data_received') {
          console.log(description)
          addMessage(JSON.parse(description.event.data))

          // console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
          // console.log(info)
        }
      },
      callbackError: (error: any, message: string) => {
        console.log(error)
        console.log(message)

        console.log(`error callback: ${JSON.stringify(error)}`)

        if (error === 'no_stream_exist') {
          // if (typeof noStreamCallback != 'undefined') {
          //   noStreamCallback()
          // }
        }
        if (error === 'notSetRemoteDescription') {
          /*
           * If getting codec incompatible or remote description error, it will redirect HLS player.
           */
          // TODO: asfads
          // tryToPlay(streamingName, hlsExtension, hlsNoStreamCallback)
        }
      },
    })
  }, [])

  useEffect(() => {
    setUserName(user.userName)

    initWebRTCAdaptor()

    if (videoRef.current) {
      const video: any = videoRef.current
      video.scrollIntoView({ behavior: 'smooth' })
    }
  }, [setUserName])

  const playWebRTCVideo = () => {
    if (videoRef.current) {
      const { current } = videoRef
      current
        .play()
        .then((a: any) => {
          console.log(a)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  const initializePlayer = (streamId: string, type: string, tokenId: string) => {
    // hideWebRTCElements();
    startPlayer(streamId, type, tokenId)
  }

  const startPlayer = (streamId: string, extension: string, tokenId: string) => {
    let type
    let liveStream = false

    if (extension === 'mp4') {
      type = 'video/mp4'
      liveStream = false
    } else if (extension === 'webm') {
      type = 'video/webm'
      liveStream = false
    } else if (extension === 'mov') {
      type = 'video/mp4'
      alert('Browsers do not support to play mov format')
      liveStream = false
    } else if (extension === 'avi') {
      type = 'video/mp4'
      alert('Browsers do not support to play avi format')
      liveStream = false
    } else if (extension === 'm3u8') {
      type = 'application/x-mpegURL'
      liveStream = true
    } else if (extension === 'mpd') {
      type = 'application/dash+xml'
      liveStream = true
    } else {
      console.log(`Unknown extension: ${extension}`)
      return
    }

    // if (streamId.endsWith('_adaptive')) {
    //   preview = streamId.substring(0, streamId.indexOf('_adaptive'))
    // }

    // const player = videojs(videojsId, {
    //   poster: 'previews/' + preview + '.png',
    // })
    const player = videojs(videojsId, {})

    player.src({
      src: `streams/${streamId}.${extension}?token=${token}`,
      type,
    })

    // player.poster('previews/' + preview + '.png')

    player.ready(() => {
      player.play()
    })

    // Check HLS player is finished. If finished page should be reload
    if (typeof player.ready !== 'undefined') {
      player.ready(() => {
        player.on('ended', () => {
          tryToPlay(streamId, token, hlsExtension)
        })
      })
    } else {
      console.log('player ready is not available. List playing may not be continous')
    }
  }

  const tryToPlay = (streamId: string, type: string, noStreamCallback: any) => {
    // const tryToPlay = (name, token, type, subscriberId, subscriberCode, noStreamCallback, initializePlayer) => {
    type = 'webrtc'
    const streamURL = `streams/${streamingName}_adaptive.${type}`

    fetch(streamURL, { method: 'HEAD' })
      .then((response) => {
        if (response.status === 200) {
          // adaptive m3u8 & mpd exists,play it
          initializePlayer(`${streamingName}_adaptive`, type, token)
        } else {
          // adaptive not exists, try mpd or m3u8 exists.
          fetch(`streams/${streamingName}.${type}`, { method: 'HEAD' })
            .then((r) => {
              if (r.status === 200) {
                initializePlayer(streamingName, type, token)
              } else {
                console.log('No stream found')
                if (typeof noStreamCallback !== 'undefined') {
                  noStreamCallback()
                }
              }
            })
            .catch((err) => {
              console.log(`Error: ${err}`)
            })
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`)
      })
  }

  const sendMessageChat = (message: string) => {
    try {
      const iceState = webRTCAdaptor.iceConnectionState(streamingName)

      if (iceState !== null && iceState !== 'failed' && iceState !== 'disconnected') {
        const dataMessage = {
          userName,
          text: message,
          type: 'TEXT',
        }
        webRTCAdaptor.sendData(streamingName, JSON.stringify(dataMessage))

        addMessage(dataMessage as LiveChatMessageType)
      } else {
        alert('WebRTC publishing is not active. Please click Start Publishing first')
      }
    } catch (exception) {
      console.error(exception)
      alert("Message cannot be sent. Make sure you've enabled data channel on server web panel")
    }
  }

  return {
    videoRef,
    chatRef,
    playVideo: playWebRTCVideo,
    sendMessageChat,
  }
}

export default useLiveView
