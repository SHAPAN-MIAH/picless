import React, { FunctionComponent, useEffect, useRef } from 'react'
import videojs from 'video.js'
import dashjs from 'dashjs'
import WebRTCAdaptor from '../../../assets/js/webrtc_adaptor'
import { isMobile, tryToPlay, tryToVODPlay } from '../../../assets/js/fetch.stream'

import LayoutMain from '../../LayoutMain/LayoutMain'
import { start } from 'repl'

const streamId = 'lupanarStreamc'
const token = ''
const subscriberId = ''
const subscriberCode = ''
const bitrate = 900 // 900 ~ 2500
const maxVideoBitrateKbps = bitrate
let webRTCAdaptor: any = {}

const appName = 'WebRTCAppEE'

const path = `antmedia.lup20.uk/${appName}/websocket`
const websocketURL = `wss://${path}`
const mediaConstraints = { video: false, audio: false }
const sdpConstraints = { OfferToReceiveAudio: true, OfferToReceiveVideo: true }
const pc_config = {
  iceServers: [
    {
      ustreamIdls: 'stun:stun1.l.google.com:19302',
    },
  ],
}

const playOrder = ['webrtc', 'hls']
const playType = ['webm', 'mp4']
const targetLatency = 3

const hlsExtension = 'm3u8'
const dashExtension = 'mpd'

const autoPlay = true // is Mobile should be in false

const mute = false

const Viewer: FunctionComponent<{}> = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    initWebRTCAdaptor()
    // alert(playOrder)
    // if (playOrder[0] === 'webrtc') {
    //   initWebRTCAdaptor()
    // } else if (playOrder[0] === 'hls') {
    //   tryToPlay(streamId, token, hlsExtension, subscriberId, subscriberCode, hlsNoStreamCallback, startPlayer)
    // } else if (playOrder[0] === 'vod') {
    //   tryToVODPlay(streamId, token, subscriberId, subscriberCode, vodNoStreamCallback, playType, startPlayer)
    // } else if (playOrder[0] === 'dash') {
    //   tryToPlay(streamId, token, dashExtension, subscriberId, subscriberCode, dashNoStreamCallback, startPlayer)
    // } else {
    //   alert(
    //     'Unsupported play order requested. Supported formats are webrtc and hls. Use something like playOrder=webrtc,hls'
    //   )
    // }
  }, [])

  const webrtcNoStreamCallback = () => {
    genericCallback('webrtc')
  }

  function hlsNoStreamCallback() {
    genericCallback('hls')
  }

  function dashNoStreamCallback() {
    genericCallback('dash')
  }

  function vodNoStreamCallback() {
    setTimeout(() => {
      if (playOrder.includes('vod')) {
        tryToVODPlay(streamId, token, subscriberId, subscriberCode, vodNoStreamCallback, playType, startPlayer)
      }
    }, 3000)
  }

  const genericCallback = (currentTech: any) => {
    setTimeout(() => {
      let index = playOrder.indexOf(currentTech)
      if (index === -1 || index === playOrder.length - 1) {
        index = 0
      } else {
        index++
      }

      const tech = playOrder[index]

      if (tech === 'webrtc') {
        // It means there is no HLS stream, so try to play WebRTC stream
        if (webRTCAdaptor == null) {
          initWebRTCAdaptor()
        } else {
          webRTCAdaptor.getStreamInfo(streamId)
        }
      } else if (tech === 'hls') {
        tryToPlay(streamId, token, hlsExtension, '', '', hlsNoStreamCallback, startPlayer)
      } else if (tech === 'dash') {
        tryToPlay(streamId, token, dashExtension, '', '', dashNoStreamCallback, startPlayer)
      }
    }, 3000)
  }

  const startPlayer = (st: any, extension: any, t: any) => {
    let type
    let liveStream = false
    let player: any
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

    let preview = streamId
    if (streamId.endsWith('_adaptive')) {
      preview = streamId.substring(0, streamId.indexOf('_adaptive'))
    }

    // If it's not dash, play with videojs

    alert(extension)
    alert(dashExtension)

    if (extension !== dashExtension) {
      player = videojs('video-player', {
        poster: `previews/${preview}.png`,
      })

      player.src({
        src: `streams/${streamId}.${extension}?token=${token}&subscriberId=${''}&subscriberCode=${''}`,
        type,
      })

      player.poster(`previews/${preview}.png`)

      if (mute) {
        player.muted(true)
      } else {
        player.muted(false)
      }

      if (autoPlay) {
        player.ready(function () {
          player.play()
        })
      }
    } else {
      player = dashjs.MediaPlayer().create()

      player.updateSettings({ streaming: { lowLatencyEnabled: true } })

      player.updateSettings({
        streaming: {
          liveDelay: targetLatency,
          liveCatchUpMinDrift: 0.05,
          liveCatchUpPlaybackRate: 0.5,
          liveCatchupLatencyThreshold: 30,
        },
      })

      player.initialize(videoRef.current, `streams/${streamId}.${extension}?token=${token}`, false)

      if (mute) {
        player.setMute(true)
      } else {
        player.setMute(false)
      }

      if (autoPlay && player.isReady()) {
        player.play()
      }
    }
    // Check HLS player is finished. If finished page should be reload
    if (typeof player.ready !== 'undefined') {
      player.ready(() => {
        player.on('ended', function () {
          tryToPlay(streamId, token, hlsExtension, '', '', startPlayer)
        })
      })
    } else {
      console.log('player ready is not available. List playing may not be continous')
    }
  }

  const initWebRTCAdaptor = () => {
    webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: websocketURL,
      mediaConstraints,
      peerconnection_config: pc_config,
      sdp_constraints: sdpConstraints,
      remoteVideoId: videoRef,
      isPlayMode: true,
      callback: (info: any, description: any) => {
        if (info === 'initialized') {
          webRTCAdaptor.getStreamInfo(streamId)
        } else if (info === 'streamInformation') {
          console.log('stream information')
          webRTCAdaptor.play(streamId, '', '', '')
        } else if (info === 'play_started') {
          console.log('play_started')
        } else if (info === 'play_finished') {
          console.log('play finished')

          setTimeout(() => {
            webRTCAdaptor.getStreamInfo(streamId)
          }, 3000)
        } else if (info === 'closed') {
          if (typeof description !== 'undefined') {
            console.log(`Connecton closed: ${JSON.stringify(description)}`)
          }
        }
      },
      callbackError: (error: any, message: string) => {
        if (error === 'notSetRemoteDescription') {
          tryToPlay(streamId, token, hlsExtension, subscriberId, subscriberCode, hlsNoStreamCallback, startPlayer)
        }
      },
    })
  }

  const startView = () => {
    webRTCAdaptor.play(streamId)
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-3-9">
            <div className="account-hub-content">
              <div className="grid-column"> </div>
              <div className="grid-column">
                <div className="widget-box">
                  <p className="widget-box-title">Viewer</p>

                  <div id="video_container">
                    <video
                      id="video-player"
                      className="video-js vjs-default-skin vjs-big-play-centered"
                      controls
                      muted
                      preload="auto"
                    >
                      <track kind="caption" />
                      <p className="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a web browser that supports
                        HTML5 video
                      </p>
                    </video>
                  </div>

                  <video id="remoteVideo" ref={videoRef} controls muted playsInline />
                  <div id="networkWarning">Your connection isn't fast enough to play this stream!</div>
                  <img
                    id="play_button"
                    src="images/play.png"
                    onClick={() => {
                      alert('IMG')
                    }}
                    style={{ position: 'absolute', top: '30px', left: '30px', display: 'none' }}
                  />
                  <button type="button" className="btn btn-primary" onClick={startView}>
                    start camera
                  </button>
                </div>
              </div>

              <div className="grid-column"> </div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Viewer
