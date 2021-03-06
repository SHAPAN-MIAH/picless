import { useCallback, useEffect, useRef, useState } from 'react'
import { SoundMeter } from '../assets/js/soundmeter'
import WebRTCAdaptor from '../assets/js/webrtc_adaptor'
import StreamService from '../services/StreamService'
import { ServiceStreamingType, StreamingType, StreamType } from '../types/StreamingType'
import { UserType } from '../types/UserType'
import useLiveChat, { LiveChatMessageType } from './useLiveChat'
import useUser from './useUser'

type AvailableDeviceType = { deviceId: string; selected: boolean }
type LiveStatusType = 'WAITING' | 'ON_AIR'

// const streamingName = '201e3b7b-5348-47f7-909d-fa16e8ecacae' // ADDED INTO PROPSs
const bitrate = 900 // 900 ~ 2500
const maxVideoBitrateKbps = bitrate
let webRTCAdaptor: any = {}
let streamingName = ''
let tokenId = ''
let autoRepublishIntervalJob: any

const appName = process.env.REACT_APP_ANTMEDIA_APPNAME

const mediaConstraints = { video: true, audio: true }
const sdpConstraints = { OfferToReceiveAudio: false, OfferToReceiveVideo: false }
const websocketURL = `${process.env.REACT_APP_WEBSOCKET_MAIN_URL}:/${appName}/websocket?rtmpForward=undefined`
const pc_config = {
  iceServers: [
    {
      urls: 'stun:stun1.l.google.com:19302',
    },
  ],
}

const useLiveStreaming = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  const { addMessage, chatRef } = useLiveChat()

  const { user } = useUser()
  const [userName, setUserName] = useState('')

  const [availableDevices, setAvailableDevices] = useState<AvailableDeviceType[]>([])
  const [liveStatus, setLiveStatus] = useState<LiveStatusType>('WAITING')
  const [streamData, setStreamData] = useState<StreamingType>()
  const [micToggle, setMicToggle] = useState<boolean>(true)

  const initWebRTCAdaptor = useCallback(() => {
    webRTCAdaptor = new WebRTCAdaptor({
      websocket_url: websocketURL,
      mediaConstraints,
      peerconnection_config: pc_config,
      sdp_constraints: sdpConstraints,
      localVideoId: videoRef,
      debug: false,
      bandwidth: maxVideoBitrateKbps,
      callback: (info: any, obj: any) => {
        if (info === 'initialized') {
          // console.log('Initialized')
        } else if (info === 'publish_started') {
          setLiveStatus('ON_AIR')

          StreamService.startLive(streamingName)

          if (autoRepublishIntervalJob == null) {
            autoRepublishIntervalJob = setInterval(() => {
              checkAndRepublishIfRequired()
            }, 3000)
          }
        } else if (info === 'refreshConnection') {
          checkAndRepublishIfRequired()
        } else if (info === 'publish_finished') {
          setLiveStatus('WAITING')

          alert('Live Stoped')
        } else if (info === 'available_devices') {
          const videoDevices: AvailableDeviceType[] = []

          obj.forEach((item: any) => {
            if (item.kind === 'videoinput') {
              const selectFirst: boolean = videoDevices.length === 0
              videoDevices.push({ deviceId: item.deviceId, selected: selectFirst })
            }
          })

          setAvailableDevices(videoDevices)
        } else if (info === 'data_received') {
          addMessage(JSON.parse(obj.event.data))

          // alert(`Data received: ${obj.event.data} type: ${obj.event.type} for stream: ${obj.streamId}`)
        }
      },
      callbackError: (error: any, message: string) => {
        console.log(error)
        console.log(message)
      },
    })
  }, [streamingName])

  useEffect(() => {
    StreamService.getToken(StreamType.PUBLISH).then((data: ServiceStreamingType) => {
      setStreamData(data.data)
      streamingName = data.data.streamId
      tokenId = data.data.tokenId

      setUserName(user.userName)

      initWebRTCAdaptor()
    })

    // if (videoRef.current) {
    //   const video: any = videoRef.current
    //   video.scrollIntoView({ behavior: 'smooth' })
    // }
  }, [])

  const checkAndRepublishIfRequired = () => {
    const iceState = webRTCAdaptor.iceConnectionState(streamingName)

    if (iceState == null || iceState === 'failed' || iceState === 'disconnected') {
      webRTCAdaptor.stop(streamingName)
      webRTCAdaptor.closePeerConnection(streamingName)
      webRTCAdaptor.closeWebSocket()
      initWebRTCAdaptor()
    }
  }

  const changeVideoDevice = () => {
    let newDeviceSelected: string
    availableDevices.map((device: AvailableDeviceType, index: number) => {
      if (device.selected) {
        if (index < availableDevices.length - 1) {
          newDeviceSelected = availableDevices[index + 1].deviceId
        } else {
          newDeviceSelected = availableDevices[0].deviceId
        }

        webRTCAdaptor.switchVideoCameraCapture(streamingName, newDeviceSelected)
      }
      device.selected = false
      return device
    })

    setAvailableDevices(
      availableDevices.map((device) => {
        if (newDeviceSelected === device.deviceId) {
          device.selected = true
        }

        return device
      })
    )
  }

  const publish = () => {
    webRTCAdaptor.publish(streamingName, '')
  }

  const stop = () => {
    if (liveStatus === 'ON_AIR') {
      if (autoRepublishIntervalJob != null) {
        clearInterval(autoRepublishIntervalJob)
        autoRepublishIntervalJob = null
      }
      webRTCAdaptor.stop(streamingName)
    }
  }

  const audioToggle = (): void => {
    if (micToggle) webRTCAdaptor.muteLocalMic()
    else webRTCAdaptor.unmuteLocalMic()

    setMicToggle(!micToggle)
  }

  const sendMessageChat = (message: string) => {
    try {
      const iceState = webRTCAdaptor.iceConnectionState(streamingName)

      if (iceState !== null && iceState !== 'failed' && iceState !== 'disconnected') {
        const dataMessage = {
          userName,
          text: message,
          type: 'TEXT',
          isStreamer: true,
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
    audioStatus: micToggle,
    availableDevices,
    changeVideoDevice,
    liveStatus,
    publish,
    stop,
    audioToggle,
    sendMessageChat,
  }
}

export default useLiveStreaming
