import React, { FunctionComponent, useEffect, useRef } from 'react'
import WebRTCAdaptor from '../../../assets/js/webrtc_adaptor'
import { SoundMeter } from '../../../assets/js/soundmeter'
import LayoutMain from '../../LayoutMain/LayoutMain'

const streamingName = 'lupanarStreamc'
const bitrate = 900 // 900 ~ 2500
const maxVideoBitrateKbps = bitrate
let webRTCAdaptor: any = {}
let autoRepublishIntervalJob: any
const rtmpForward = false

const appName = 'WebRTCAppEE'

const path = `antmedia.lup20.uk/${appName}/websocket?rtmpForward=${rtmpForward}`
const websocketURL = `wss://${path}`
const mediaConstraints = { video: true, audio: true }
const sdpConstraints = { OfferToReceiveAudio: false, OfferToReceiveVideo: false }
const pc_config = {
  iceServers: [
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
  ],
}

const PublisherTest: FunctionComponent<{}> = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const initWebRTCAdaptor = () => {
    webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: websocketURL,
      mediaConstraints,
      peerconnection_config: pc_config,
      sdp_constraints: sdpConstraints,
      localVideoId: videoRef,
      debug: false,
      bandwidth: maxVideoBitrateKbps,
      callback: (info: any, obj: any) => {
        console.log(info)
        console.log(obj)
        if (info === 'initialized') {
          if (true) {
            webRTCAdaptor.publish(streamingName, '')
            enableAudioLevel()
          }
        } else if (info === 'publish_started') {
          if (autoRepublishIntervalJob == null) {
            autoRepublishIntervalJob = setInterval(() => {
              checkAndRepublishIfRequired()
            }, 3000)
          }
        } else if (info === 'refreshConnection') {
          checkAndRepublishIfRequired()
        }
      },
      callbackError: (error: any, message: string) => {
        console.log(error)
        console.log(message)
      },
    })
  }

  const checkAndRepublishIfRequired = () => {
    const iceState = webRTCAdaptor.iceConnectionState(streamingName)

    if (iceState == null || iceState === 'failed' || iceState === 'disconnected') {
      webRTCAdaptor.stop(streamingName)
      webRTCAdaptor.closePeerConnection(streamingName)
      webRTCAdaptor.closeWebSocket()
      initWebRTCAdaptor()
    }
  }

  function enableAudioLevel() {
    // Put variables in global scope to make them available to the
    // browser console.
    window.stream = webRTCAdaptor.localStream
    window.soundMeter = new SoundMeter(webRTCAdaptor.audioContext)
    // eslint-disable-next-line prefer-destructuring
    const soundMeter = window.soundMeter

    soundMeter.connectToSource(window.stream, (e: any) => {
      console.log('SOUNDMETER')
      console.log(e)
    })
  }

  const startCamera = async () => {
    initWebRTCAdaptor()
  }

  const stopBroadcasting = () => {
    if (autoRepublishIntervalJob != null) {
      clearInterval(autoRepublishIntervalJob)
      autoRepublishIntervalJob = null
    }
    webRTCAdaptor.stop(streamingName)
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
                  <p className="widget-box-title">Publisher</p>
                  <button type="button" className="btn btn-primary" onClick={startCamera}>
                    start camera
                  </button>{' '}
                  <button type="button" className="btn btn-danger" onClick={stopBroadcasting}>
                    Stop broadcast
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

export default PublisherTest
