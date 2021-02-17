import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
// import adapter from 'webrtc-adapter'

const streamingName = 'lupanarStream'
const bitrate = 2500 // 900 ~ 2500
const maxVideoBitrateKbps = bitrate
let webRTCAdaptor = {}
const rtmpForward = true

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

// const initWebRTCAdaptor = () => {
//   webRTCAdaptor = new WebRTCAdaptor({
//     websocket_url: websocketURL,
//     mediaConstraints,
//     peerconnection_config: pc_config,
//     sdp_constraints: sdpConstraints,
//     localVideoId: 'localVideo',
//     debug: false,
//     bandwidth: maxVideoBitrateKbps,
//     callback: (info: any, obj: any) => {
//       console.log(info)
//       console.log(obj)
//     },
//   })
// }

let recordedBlobs
let mediaRecorder

const PublisherTest: FunctionComponent<{}> = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const constraints = {
      audio: {
        echoCancellation: { exact: false },
      },
      video: {
        width: 1280,
        height: 720,
      },
    }
    init(constraints)
    // initWebRTCAdaptor()
  }, [])

  async function init(constraints: any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      const videoSrc = videoRef?.current
      if (videoSrc) videoSrc.srcObject = stream
    } catch (e) {
      // console.error('navigator.getUserMedia error:', e)
      // errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`
    }
  }

  const startCamera = async () => {
    const constraints = {
      audio: {
        echoCancellation: { exact: false },
      },
      video: {
        width: 1280,
        height: 720,
      },
    }

    await init(constraints)
  }

  const startBroadcasting = () => {}

  return (
    <>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <h1>Publisher</h1>
          <video ref={videoRef} autoPlay controls muted playsInline />

          <button type="button" className="btn btn-primary" onClick={startCamera}>
            start camera
          </button>

          <button type="button" className="btn btn-danger" onClick={startBroadcasting}>
            start broadcast
          </button>
        </div>
      </div>
    </>
  )
}

export default PublisherTest
