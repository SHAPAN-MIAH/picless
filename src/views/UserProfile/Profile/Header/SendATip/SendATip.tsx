import React, { FormEvent, FunctionComponent, useState } from 'react'
import CurrencyInput from 'react-currency-input-field'

import UserService from '../../../../../services/UserService'

import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../../components/Common/TextInput'
import FormRow from '../../../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'

import { UserType, TipType } from '../../../../../types/UserType.d'

import styles from './SendATip.module.css'
import useUser from '../../../../../hooks/useUser'

const SendATip: FunctionComponent<{ user: UserType; callback?: (result: string) => void }> = (props) => {
  const { user, callback } = props

  const { userId } = useUser()

  const [message, setMessage] = useState<string>('')
  const [cash, setCash] = useState<number>(5.0)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const tip: TipType = {
      fromId: userId,
      toId: user.id?.toString() || '',
      message,
      cash,
    }

    UserService.sendATip(tip).then((data: { code: number; message: string }) => {
      switch (data.code) {
        case 0:
          if (callback) {
            callback('SUCCESS')
          }

          alert('Tip Sended')
          break
        case 2:
          if (callback) {
            callback('ERROR')
          }
          alert(`Error: ${data.message}`)
          break
        default:
          alert(`Default: ${data.message}`)
          break
      }
    })
  }

  return (
    <>
      <div className={styles.mainPopup}>
        <div className={styles.headerTip}>
          <h4>Send a tip</h4>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <FormRowItem>
            <div className="form-input active">
              <label htmlFor="input-example">Enter amount</label>
              <CurrencyInput
                id="input-tip"
                name="input_tip"
                value={cash}
                allowDecimals
                decimalsLimit={2}
                onChange={(value) => setCash(parseInt(value as string, 10))}
              />
            </div>
            {/*             
            <TextInput
            type="text"
            id="amount"
            name="amount"
            placeholder="Enter tip amount"
              value={cash}
              onChange={(e) => setCash(parseInt(e.target.value, 10))}
            /> */}
          </FormRowItem>

          <FormRowItem>
            <TextInput
              type="text"
              id="message"
              name="message"
              placeholder="Write me something"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormRowItem>

          <FormRow>
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={false}>
              SendTip
            </ButtonWithLoader>
          </FormRow>
        </form>
      </div>
    </>
  )
}

export default SendATip