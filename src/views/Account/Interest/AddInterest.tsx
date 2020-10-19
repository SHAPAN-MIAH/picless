import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import _ from 'lodash'

import { userSelector } from '../../../redux/User/UserSelectors'
import { updateProfile } from '../../../redux/User/UserThunks'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import { UserType } from '../../../types/UserType.d'

const AddInterest: FunctionComponent<{ onAdd: () => void }> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userData: UserType = useSelector(userSelector)

  const { onAdd } = props

  const [interestTitle, setInterestTitle] = useState('')
  const [interestDescription, setInterestDescription] = useState('')

  const handleInputTitle = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInterestTitle(e.target.value)
  }

  const addInterest = () => {
    let interestList = userData.userInterest || []

    interestList = _.concat(interestList, [{ name: interestTitle, description: interestDescription }])

    const user: UserType = {
      ...userData,
      userInterest: interestList,
    }

    dispatch(updateProfile(user))
    onAdd()
  }

  return (
    <>
      <FormRow>
        <FormItem>
          <TextInput
            type="text"
            id="tag-line"
            classNameFormInput="small"
            name="tag_line"
            placeholder={t('profileInfo.interest.addNewTitleInterestField')}
            defaultValue={interestTitle}
            onChange={handleInputTitle}
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
            placeholder={t('profileInfo.addNewDescriptionInterestField')}
            defaultValue={interestDescription}
            onChange={(e) => setInterestDescription(e.target.value)}
          />
        </FormItem>
      </FormRow>
      <FormRow classNameRow="split">
        <FormItem>
          <ButtonWithLoader type="button" className="small white" onClick={() => onAdd()} showLoader={false}>
            {`+ ${t('interests.cancelNewInterest')}`}
          </ButtonWithLoader>
        </FormItem>
        <FormItem>
          <ButtonWithLoader type="button" className="small secondary" onClick={addInterest} showLoader={false}>
            {`+ ${t('interests.saveNewInterest')}`}
          </ButtonWithLoader>
        </FormItem>
      </FormRow>
    </>
  )
}

export default AddInterest
