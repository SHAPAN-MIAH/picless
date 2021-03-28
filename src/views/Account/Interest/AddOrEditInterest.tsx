import { yupResolver } from '@hookform/resolvers/yup'
import React, { FunctionComponent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import useUser from '../../../hooks/useUser'
import { UserInterestType, UserType } from '../../../types/UserType.d'

type AddOrEditInterestProps = {
  onAdd: () => void
  edit?: number
}

type FormValues = {
  name: string
  description: string
}

const Form = styled.form`
  padding: 15px;
  border-radius: 10px;
`

const AddOrEditInterest: FunctionComponent<AddOrEditInterestProps> = (props) => {
  const { onAdd, edit } = props

  const { t } = useTranslation()

  const { user, updateUser } = useUser()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('User name field is required'),
    description: Yup.string().required('Description field is required').max(500).min(1),
  })

  const { control, handleSubmit, errors, getValues, setValue, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = () => {
    const interest: UserInterestType = {
      userId: user.id,
      name: getValues().name,
      description: getValues().description,
    }
    let dataToSubmit: Partial<UserType>

    if (edit && edit > 0) {
      interest.id = edit
      const userInterest: UserInterestType[] =
        user.userInterest?.map((i) => {
          if (i.id === edit) {
            return interest
          }

          return i
        }) || []

      dataToSubmit = { userInterest }
    } else {
      dataToSubmit = { userInterest: user.userInterest?.concat(interest) }
    }

    const toastOptions = {
      loading: 'Saving account information ...',
      success: 'The account information has been successfully saved',
      error: 'Error Saving the account information',
    }

    return updateUser(dataToSubmit, toastOptions).then(() => {
      onAdd()
    })
  }

  useEffect(() => {
    if (edit && edit > 0) {
      const interest = user.userInterest?.find((item) => item.id === edit)

      setValue('name', interest?.name)
      setValue('description', interest?.description)
    }
  }, [])

  return (
    <>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
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
              maxLength={500}
            />
          </FormItem>
        </FormRow>

        <FormRow classNameRow="split">
          <FormItem>
            <ButtonWithLoader type="submit" className="small secondary" showLoader={formState.isSubmitting}>
              {edit && edit !== -1
                ? `${t('profileInfo.interests.editInterestButton')}`
                : `+ ${t('profileInfo.interests.addNewInterestButton')}`}
            </ButtonWithLoader>
          </FormItem>
          <FormItem>
            <ButtonWithLoader type="submit" className="small white" onClick={() => onAdd()} showLoader={false}>
              {`${t('profileInfo.interests.cancelNewInterestButton')}`}
            </ButtonWithLoader>
          </FormItem>
        </FormRow>
      </Form>
    </>
  )
}

export default AddOrEditInterest
