import { useRef, useState } from 'react'

type LiveTypeMessage = 'TEXT' | 'TIP'

export type LiveChatMessageType = {
  userName: string
  text: string
  type: LiveTypeMessage
  isStreamer?: boolean
}

const colors = ['#4eb2fd', '#615dfa', 'rgba(97, 93, 250, .2)', 'rgba(253, 67, 80, .2)']

const useLiveChat = () => {
  const chatRef = useRef<HTMLDivElement>(null)
  const randomColor = Math.floor(Math.random() * colors.length)
  const color = colors[randomColor]

  const addMessage = (data: LiveChatMessageType) => {
    const msg = document.createElement('div')

    if (data.isStreamer) {
      const msgIsStreamer = document.createElement('span')
      msgIsStreamer.innerHTML = '&#x2605;'
      msgIsStreamer.style.color = '#fecc06'
      msgIsStreamer.style.fontSize = '24px'
      msgIsStreamer.style.marginRight = '7px'

      msg.appendChild(msgIsStreamer)
    }

    if (data.text === 'SENDATIP') {
      const msgTip = document.createElement('div')
      msgTip.className = 'chat-widget-speaker right'
      const msgText = document.createElement('p')
      msgText.className = 'chat-widget-speaker-message'
      msgText.innerHTML = `${data.userName} send a tip`

      msgTip.appendChild(msgText)
      msg.appendChild(msgTip)
    } else {
      const msgUser = document.createElement('span')
      msgUser.style.color = color
      msgUser.style.marginRight = '7px'
      const msgUserContent = document.createTextNode(`${data.userName}: `)
      msgUser.appendChild(msgUserContent)

      msg.appendChild(msgUser)

      const msgText = document.createElement('span')
      const msgTextContent = document.createTextNode(`${data.text}`)

      msgText.appendChild(msgTextContent)
      msg.appendChild(msgText)
    }

    chatRef.current?.appendChild(msg)
  }

  return {
    chatRef,
    addMessage,
  }
}

export default useLiveChat
