import React, { FunctionComponent } from 'react'
// import { useTranslation } from 'react-i18next'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import TextInput from '../../../../components/Common/TextInput'
import FormRow from '../../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

import styles from './SendATip.module.css'

const SendATip: FunctionComponent<{}> = () => {
  // const { t } = useTranslation()

  const handleSubmit = () => {
    alert('Tip Sended')
  }

  return (
    <>
      <div className={styles.mainPopup}>
        <FormRowItem style={{ alignContent: 'center' }}>
          <h4>Send a tip</h4>
        </FormRowItem>

        <form className="form" onSubmit={handleSubmit}>
          <FormRowItem>
            <TextInput
              type="text"
              id="amount"
              name="amount"
              placeholder="Enter tip amount"
              // defaultValue={userName}
              // onChange={(e) => setUserName(e.target.value.toLowerCase())}
            />
          </FormRowItem>

          <FormRowItem>
            <TextInput
              type="text"
              id="message"
              name="message"
              placeholder="Write me something"
              // defaultValue={password}
              // onChange={(e) => setPassword(e.target.value)}
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
