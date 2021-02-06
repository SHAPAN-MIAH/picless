import React, { FunctionComponent } from 'react'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import useUser from '../../../hooks/useUser'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import { UserInterestType, UserType } from '../../../types/UserType.d'

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
    description: Yup.string().required('Description field is required').max(500).min(1),
  })

  const { control, handleSubmit, errors, getValues, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const { onAdd } = props

  const onSubmit = () => {
    getUser().then((user) => {
      const interest: UserInterestType = {
        userId: user.id,
        name: getValues().name,
        description: getValues().description,
      }

      const dataToSubmit: Partial<UserType> = { userInterest: user.userInterest?.concat(interest) }

      const toastOptions = {
        loading: 'Saving account information ...',
        success: 'The account information has been successfully saved',
        error: 'Error Saving the account information',
      }

      return updateUser(dataToSubmit, toastOptions).then(() => {
        onAdd()
      })
    })
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
            <ButtonWithLoader type="submit" className="small secondary" showLoader={false}>
              {`+ ${t('profileInfo.interests.addNewInterestButton')}`}
            </ButtonWithLoader>
          </FormItem>
        </FormRow>
      </form>
    </>
  )
}

export default AddInterest
