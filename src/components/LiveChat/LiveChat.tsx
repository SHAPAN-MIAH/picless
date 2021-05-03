import React, { FormEvent, useState } from 'react'

type LiveChatProps = {
  sendMessageChat: (message: string) => void
}

const LiveChat = React.forwardRef<HTMLDivElement | null, LiveChatProps>((props, ref) => {
  const { sendMessageChat } = props

  const [message, setMessage] = useState<string>('')

  const onSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isMessageProvided = message && message !== ''

    if (isMessageProvided) {
      sendMessageChat(message)

      setMessage('')
    } else {
      alert('Please insert an user and a message.')
    }
  }

  const onMessageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  return (
    <>
      <div className="chat-widget-header"> LIVE</div>
      <div ref={ref} className="chat-widget-conversation" style={{ overflowY: 'scroll' }}>
        {' '}
      </div>

      <form onSubmit={onSendMessage}>
        <div className="form-row split">
          <div className="form-item">
            <div className="interactive-input small">
              <input
                type="text"
                id="chat-widget-message-text-2"
                name="chat_widget_message_text_2"
                placeholder="Write a message..."
                value={message}
                autoComplete="off"
                onChange={onMessageUpdate}
              />

              {/* <div className="interactive-input-icon-wrap actionable">
                <div className="tooltip-wrap text-tooltip-tft" data-title="Send Photo">
                  <svg className="interactive-input-icon icon-camera">
                    <use xlinkHref="#svg-camera" />
                  </svg>
                </div>
              </div> */}

              <div className="interactive-input-action">
                <svg className="interactive-input-action-icon icon-cross-thin">
                  <use xlinkHref="#svg-cross-thin" />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-item auto-width">
            <button type="submit" className="button primary padded">
              <svg className="button-icon no-space icon-send-message">
                <use xlinkHref="#svg-send-message" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  )
})

export default LiveChat
