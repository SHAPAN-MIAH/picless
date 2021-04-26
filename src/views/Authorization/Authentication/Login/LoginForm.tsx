import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
// import i18n from 'i18next'

import TextInput from '../../../../components/Common/TextInput'
import SimpleCheckboxForm from '../../../../components/Common/SimpleCheckboxForm'
import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'

import Alert from '../../../../components/Common/Alerts/Alerts'

import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import FormRow from '../../../../components/Common/Form/FormRow'
import useAuth from '../../../../hooks/useAuth'

import { CurrentView } from './Login'
import useRouter from '../../../../hooks/commons/useRouter'

type FormValues = {
  username: string
  password: string
  rememberMe: boolean
}

const LoginForm: FunctionComponent<{ changeView: (view: CurrentView) => void }> = (props) => {
  const { t } = useTranslation()

  const { changeView } = props

  // Validations Fields
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t(`authentication.errors.emailRequired`))
      .email(t(`authentication.errors.enterValidEmailAddress`)),
    password: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .required(t(`authentication.errors.passwordRequired`)),
  })

  const { login, checkAuthenticated } = useAuth()
  const router = useRouter()

  const { control, handleSubmit, setValue, errors, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const [messages, setMessages] = useState<string>('')
  const [generalError, setGeneralError] = useState<string>('')

  const onSubmit = (data: FormValues) => {
    const { username, password, rememberMe } = data

    setGeneralError('')

    return login(username, password, rememberMe)
      .then((message) => {
        setMessages(message)
        checkAuthenticated().then(() => {
          router.push('/user/home')
        })
      })
      .catch((err) => {
        console.log(err)
        setGeneralError(err.message)
      })
  }

  // const [language, setLanguage] = useState('en')

  // const changeLanguage = () => {
  //   let currentLanguage = language

  //   if (language === 'en') {
  //     currentLanguage = 'es'
  //   } else {
  //     currentLanguage = 'en'
  //   }
  //   setLanguage(currentLanguage)

  //   i18n.changeLanguage(currentLanguage)
  // }

  // TO TEST Purposes
  useEffect(() => {
    setValue('username', 'marcelo@lup20.uk')
    setValue('password', 'Nokia2000')
  }, [setValue])

  return (
    <>
      <h2 className="form-box-title">{t('authentication.accountLogin')}</h2>

      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="text"
            name="username"
            defaultValue=""
            placeholder={t('authentication.usernameOrEmail')}
            errorMessage={errors.username?.message}
          />
        </FormRowItem>

        <FormRowItem>
          <Controller
            control={control}
            as={TextInput}
            type="password"
            name="password"
            defaultValue=""
            placeholder={t('authentication.password')}
            errorMessage={errors.password?.message}
          />
        </FormRowItem>

        <FormRow classNameRow="space-between">
          <div className="form-item">
            <Controller
              control={control}
              name="rememberMe"
              defaultValue={false}
              render={(propsController) => (
                <SimpleCheckboxForm
                  name={propsController.name}
                  ref={propsController.ref}
                  defaultValue={propsController.value}
                  placeholder={t('authentication.rememberMe')}
                  onChange={(e) => propsController.onChange(e.target.checked)}
                />
              )}
            />
          </div>

          <div className="form-item">
            <p
              className="form-link"
              onClick={() => {
                changeView('FORGOT_PASSWORD_EMAIL')
              }}
            >
              {t('authentication.forgotPassword')}
            </p>
          </div>
        </FormRow>

        <FormRow>
          <ButtonWithLoader type="submit" className="button medium secondary" showLoader={formState.isSubmitting}>
            {t('authentication.loginToYourAccount')}
          </ButtonWithLoader>
        </FormRow>

        <FormRow>
          {generalError && <Alert alertType="DANGER" message={t(generalError)} style={{ width: '100%' }} />}
          {messages && <Alert alertType="PRIMARY" message={t(messages)} style={{ width: '100%' }} />}
        </FormRow>
      </form>
    </>
  )
}

export default LoginForm
