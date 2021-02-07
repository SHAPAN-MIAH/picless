import React, { FormEvent, FunctionComponent, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'

import TextInput from '../../../../components/Common/TextInput'

import Alert from '../../../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import useAuth from '../../../../hooks/useAuth'
import useRouter from '../../../../hooks/useRouter'

type ConfirmEmailProps = { email: string }

type FormValues = {
  code: string
}

const ConfirmEmail: FunctionComponent<ConfirmEmailProps> = (props) => {
  const { email } = props
  const { t } = useTranslation()

  const validationSchema = Yup.object().shape({
    code: Yup.string(),
  })

  const { confirmRegister, resendVerificationCode } = useAuth()
  const { control, errors, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const [messages, setMessages] = useState<string>('')
  const [generalError, setGeneralError] = useState<string>('')

  const onSubmit = async (data: FormValues) => {
    return confirmRegister(email, data.code).then((message: string) => {
      setMessages(message)

      window.location.reload()
    })
  }

  const resendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    resendVerificationCode(email)
      .then((message: string) => {
        setMessages(message)
      })
      .catch((err) => {
        setGeneralError(err.message)
      })
  }

  return (
    <div>
      <h2 className="form-box-title">{t('authentication.enterEmailCode')}</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <p>{t('authentication.confirmEmailMessage')}</p>
        </FormRow>

        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="text"
            name="code"
            defaultValue=""
            placeholder={t('authentication.code')}
            errorMessage={errors.code?.message}
          />
        </FormRowItem>

        <FormRow classNameRow="flex-end">
          <a className="form-link" href="" onClick={resendCode}>
            {t('authentication.resendVerificationCode')}
          </a>
        </FormRow>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium primary" showLoader={formState.isSubmitting}>
            {t('authentication.confirm')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>
          {generalError && <Alert alertType="DANGER" message={t(generalError)} style={{ width: '100%' }} />}
          {messages && <Alert alertType="PRIMARY" message={t(messages)} style={{ width: '100%' }} />}
        </FormRow>
      </form>
    </div>
  )
}

export default ConfirmEmail
