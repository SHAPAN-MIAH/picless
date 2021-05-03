import { yupResolver } from '@hookform/resolvers/yup'
import React, { FunctionComponent, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import * as Yup from 'yup'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import SelectForm, { SelectOptionsType } from '../../../components/Common/SelectForm'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import useUser from '../../../hooks/useUser'
import { UserTimeLineType, UserType } from '../../../types/UserType'

type AddOrEditTimeLineEventProps = {
  years: SelectOptionsType[]
  onAdd: () => void
  edit?: number
}

type FormValues = {
  title: string
  yearSarted: string
  yearEnded: string
  description: string
}

const Form = styled.form`
  padding: 15px;
  border-radius: 10px;
`

const AddOrEditTimeLineEvent: FunctionComponent<AddOrEditTimeLineEventProps> = (props) => {
  const { onAdd, edit, years } = props

  const { t } = useTranslation()

  const { user, updateUser } = useUser()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title field is required'),
    yearSarted: Yup.string(),
    yearEnded: Yup.string(),
    description: Yup.string().required('Description field is required').max(500).min(1),
  })

  const { control, handleSubmit, errors, getValues, setValue, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = () => {
    const timeLineEvent: UserTimeLineType = {
      userId: user.id,
      title: getValues().title,
      yearSarted: getValues().yearSarted,
      yearEnded: getValues().yearEnded,
      description: getValues().description,
    }
    let dataToSubmit: Partial<UserType>

    if (edit && edit > 0) {
      timeLineEvent.id = edit
      const userTimeLine: UserTimeLineType[] =
        user.userTimeLine?.map((t) => {
          if (t.id === edit) {
            return timeLineEvent
          }

          return t
        }) || []

      dataToSubmit = { userTimeLine }
    } else {
      dataToSubmit = { userTimeLine: user.userTimeLine?.concat(timeLineEvent) }
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
      const timeLineEvents = user.userTimeLine?.find((item) => item.id === edit)

      setValue('title', timeLineEvents?.title)
      setValue('description', timeLineEvents?.description)
      setValue('yearSarted', timeLineEvents?.yearSarted)
      setValue('yearEnded', timeLineEvents?.yearEnded)
    } else {
      setValue('yearSarted', '1981')
      setValue('yearEnded', '1981')
    }
  }, [setValue])

  return (
    <>
      <Form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow classNameRow="split">
          <FormItem>
            <Controller
              control={control}
              as={TextInput}
              type="text"
              name="title"
              defaultValue=""
              required
              placeholder={t('profileInfo.timeline.addNewTitleTimelineEventField')}
              classNameFormInput="small active"
              errorMessage={errors.title?.message}
            />
          </FormItem>
          <FormRow classNameRow="split">
            <FormItem>
              <Controller
                control={control}
                as={SelectForm}
                name="yearSarted"
                placeholder={t('profileInfo.timeline.newYearStarted')}
                options={years}
              />
            </FormItem>
            <FormItem>
              <Controller
                control={control}
                as={SelectForm}
                name="yearEnded"
                placeholder={t('profileInfo.timeline.newYearEnded')}
                options={years}
              />
            </FormItem>
          </FormRow>
        </FormRow>
        <FormRow>
          <FormItem>
            <Controller
              control={control}
              as={TextArea}
              name="description"
              defaultValue=""
              classNameFormInput="small full"
              placeholder={t('profileInfo.timeline.addNewDescriptionEventField')}
              errorMessage={errors.description?.message}
              maxLength={500}
            />
          </FormItem>
        </FormRow>

        <FormRow classNameRow="split">
          <FormItem>
            <ButtonWithLoader type="submit" className="small secondary" showLoader={formState.isSubmitting}>
              {edit && edit !== -1
                ? `${t('profileInfo.timeline.editTimeLineEventButton')}`
                : `+ ${t('profileInfo.timeline.addNewTimeLineEventButton')}`}
            </ButtonWithLoader>
          </FormItem>
          <FormItem>
            <ButtonWithLoader type="button" className="small white" onClick={() => onAdd()} showLoader={false}>
              {`${t('profileInfo.timeline.cancelNewTimeLineEventButton')}`}
            </ButtonWithLoader>
          </FormItem>
        </FormRow>
      </Form>
    </>
  )
}

export default AddOrEditTimeLineEvent
