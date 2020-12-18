import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { actionFail } from '../../../redux/User/UserSlice'
import { userSelector, errorSelector } from '../../../redux/User/UserSelectors'
import { addInterest } from '../../../redux/User/UserThunks'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import { UserType, UserInterestType } from '../../../types/UserType.d'

const AddInterest: FunctionComponent<{ onAdd: () => void }> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userData: UserType = useSelector(userSelector)

  const { onAdd } = props

  const [interestName, setInterestName] = useState('')
  const [interestDescription, setInterestDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const onAddInterest = () => {
    if (interestName && interestDescription) {
      const interest: UserInterestType = {
        userId: userData.id,
        name: interestName,
        description: interestDescription,
      }

      dispatch(addInterest(interest))
      onAdd()
    } else {
      setErrorMessage(t('profileInfo.interest.error.nameOrDescriptionEmpty'))
    }
  }

  return (
    <>
      <FormRow classNameRow="top-border">
        <FormRow>
          <p>{t('profileInfo.interests.newInterest')}</p>
        </FormRow>
        <FormItem>
          <TextInput
            type="text"
            id="tag-line"
            classNameFormInput="small"
            name="tag_line"
            placeholder={t('profileInfo.interests.addNewTitleInterestField')}
            value={interestName || ''}
            onChange={(e) => setInterestName(e.target.value)}
          />
        </FormItem>
      </FormRow>
      <FormRow>
        <FormItem>
          <TextArea
            type="text"
            id="interest-1"
            classNameFormInput="small full"
            name="account_url_username"
            placeholder={t('profileInfo.interests.addNewDescriptionInterestField')}
            value={interestDescription || ''}
            onChange={(e) => setInterestDescription(e.target.value)}
            maxLength={500}
          />
        </FormItem>
      </FormRow>
      {errorMessage !== '' && (
        <FormRow>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </FormRow>
      )}

      <FormRow classNameRow="split">
        <FormItem>
          <ButtonWithLoader type="button" className="small white" onClick={() => onAdd()} showLoader={false}>
            {`${t('profileInfo.interests.cancelNewInterestButton')}`}
          </ButtonWithLoader>
        </FormItem>
        <FormItem>
          <ButtonWithLoader type="button" className="small secondary" onClick={onAddInterest} showLoader={false}>
            {`+ ${t('profileInfo.interests.addNewInterestButton')}`}
          </ButtonWithLoader>
        </FormItem>
      </FormRow>
    </>
  )
}

export default AddInterest
