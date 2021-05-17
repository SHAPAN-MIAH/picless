import React, { FunctionComponent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { resetWarningCache } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useChatMessages from 'hooks/useChatMessages'
import { UserStatusMessagesType } from 'types/MessagesType'

type FormValues = {
  message: string
}

const WriteMessage: FunctionComponent<{}> = () => {
  const { userSelected, sendMessage } = useChatMessages()

  const validationSchema = Yup.object().shape({
    message: Yup.string().required('Please, write something before send'),
  })

  const { handleSubmit, register, reset, errors } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data: FormValues) => {
    sendMessage(userSelected as UserStatusMessagesType, data.message).then(() => {
      reset()
    })
  }
  return (
    <>
      <form className="chat-widget-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row split">
          <div className="form-item">
            <div className="interactive-input small">
              <input
                type="text"
                id="chat-widget-message-text"
                name="message"
                ref={register}
                placeholder="Write a message..."
                autoComplete="off"
              />

              {errors.message && (
                <p className="inputErrorFieldText" style={{ marginTop: '4px', textAlign: 'right' }}>
                  {errors.message.message}
                </p>
              )}

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

export default WriteMessage
