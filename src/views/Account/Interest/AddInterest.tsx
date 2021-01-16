import React, { FunctionComponent, useState } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import useUser from '../../../hooks/useUser'

import { addInterest } from '../../../redux/User/UserThunks'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import { UserInterestType } from '../../../types/UserType.d'

type FormValues = {
  name: string
  description: string
}
const AddInterest: FunctionComponent<{ onAdd: () => void }> = (props) => {
  const { t } = useTranslation()

  const { getUser, updateUser } = useUser()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('User name field is required'),
    description: Yup.string().max(500).min(1),
  })

  const { control, handleSubmit, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const { onAdd } = props

  const [errorMessage, setErrorMessage] = useState('')

  const onAddInterest = () => {
    // if (interestName && interestDescription) {
    //   const interest: UserInterestType = {
    //     userId: userData.id,
    //     name: interestName,
    //     description: interestDescription,
    //   }
    //   dispatch(addInterest(interest))
    //   onAdd()
    // } else {
    //   setErrorMessage(t('profileInfo.interest.error.nameOrDescriptionEmpty'))
    // }
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow classNameRow="top-border">
          <FormRow>
            <p>{t('profileInfo.interests.newInterest')}</p>
          </FormRow>
          <FormItem>
            <Controller
              control={control}
              as={TextInput}
              type="text"
              name="name"
              defaultValue=""
              required
              placeholder={t('profileInfo.interests.addNewTitleInterestField')}
              classNameFormInput="small active"
              errorMessage={errors.name?.message}
            />
          </FormItem>
        </FormRow>
        <FormRow>
          <FormItem>
            <Controller
              control={control}
              as={TextArea}
              name="description"
              defaultValue=""
              classNameFormInput="small full"
              placeholder={t('profileInfo.interests.addNewDescriptionInterestField')}
              errorMessage={errors.description?.message}
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
            <ButtonWithLoader
              type="submit"
              className="small white"
              onClick={() => onAdd()}
              showLoader={formState.isSubmitting}
            >
              {`${t('profileInfo.interests.cancelNewInterestButton')}`}
            </ButtonWithLoader>
          </FormItem>
          <FormItem>
            <ButtonWithLoader type="button" className="small secondary" onClick={onAddInterest} showLoader={false}>
              {`+ ${t('profileInfo.interests.addNewInterestButton')}`}
            </ButtonWithLoader>
          </FormItem>
        </FormRow>
      </form>
    </>
  )
}

export default AddInterest
