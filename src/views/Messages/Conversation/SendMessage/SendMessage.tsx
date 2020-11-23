import React, { FormEvent, FunctionComponent, useState } from 'react'

type SendMessageProps = {
  sendMessage: (value: string) => void
}

const SendMessage: FunctionComponent<SendMessageProps> = (props) => {
  const { sendMessage } = props

  const [message, setMessage] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isMessageProvided = message && message !== ''

    if (isMessageProvided) {
      sendMessage(message)

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
      <form className="chat-widget-form" onSubmit={onSubmit} style={{ marginTop: '33px' }}>
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
}

export default SendMessage
