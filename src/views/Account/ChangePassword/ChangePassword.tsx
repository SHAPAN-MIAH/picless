import React, { FunctionComponent, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import PasswordStrengthBar from 'react-password-strength-bar'

import FormItem from '../../../components/Common/Form/FormItem'
import TextInput from '../../../components/Common/TextInput'
import FormRow from '../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import useAuth from '../../../hooks/useAuth'

type FormValues = {
  oldPassword: string
  newPassword: string
  confirmationPassword: string
}

const ChangePassword: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .required(t(`authentication.errors.passwordRequired`)),
    newPassword: Yup.string()
      .transform((x) => (x === '' ? undefined : x))
      .required(t(`authentication.errors.passwordRequired`)),
    confirmationPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  })

  const { changePassword } = useAuth()
  const { control, handleSubmit, errors, formState, reset } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = useCallback((data: FormValues) => {
    return changePassword(data.oldPassword, data.newPassword)
      .then((message: string) => {
        const msg = t(message)
        toast.success(msg)

        reset()
      })
      .catch((err) => {
        const errMsg = t(err.message)

        toast.error(errMsg)
      })
  }, [])

  const scoreWords = [
    t('passwordStrengthBar.scoreWords.weak'),
    t('passwordStrengthBar.scoreWords.okay'),
    t('passwordStrengthBar.scoreWords.good'),
    t('passwordStrengthBar.scoreWords.strong'),
  ]

  return (
    <>
      <div className="account-hub-content">
        <div className="section-header">
          <div className="section-header-info">
            <h2 className="section-title">{t('changePassword.changePasswordTitle')} </h2>
          </div>
        </div>

        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">{t('changePassword.changeYourPasswordHere')} </p>

            <div className="widget-box-content">
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <FormRow>
                  <FormItem>
                    <Controller
                      control={control}
                      as={TextInput}
                      type="password"
                      name="oldPassword"
                      defaultValue=""
                      classNameFormInput="small active"
                      placeholder={t('changePassword.oldPasswordField')}
                      errorMessage={errors.oldPassword?.message}
                    />
                  </FormItem>
                </FormRow>

                <FormRow>
                  <FormItem>
                    <Controller
                      control={control}
                      name="newPassword"
                      defaultValue=""
                      render={(propsController) => (
                        <>
                          <TextInput
                            type="password"
                            name={propsController.name}
                            ref={propsController.ref}
                            value={propsController.value}
                            classNameFormInput="small active"
                            placeholder={t('changePassword.newPasswordField')}
                            errorMessage={errors.newPassword?.message}
                            onChange={(e) => propsController.onChange(e.target.value)}
                          />

                          <PasswordStrengthBar
                            password={propsController.value}
                            shortScoreWord={t('passwordStrengthBar.shortScoreWord')}
                            scoreWords={scoreWords}
                            minLength={6}
                          />
                        </>
                      )}
                    />
                  </FormItem>
                </FormRow>

                <FormRow>
                  <FormItem>
                    <Controller
                      control={control}
                      as={TextInput}
                      type="password"
                      name="confirmationPassword"
                      defaultValue=""
                      classNameFormInput="small active"
                      placeholder={t('changePassword.passwordRepeatField')}
                      errorMessage={errors.confirmationPassword?.message}
                    />
                  </FormItem>
                </FormRow>

                <FormRow classNameRow="split">
                  <FormItem>
                    <ButtonWithLoader type="submit" className="small secondary" showLoader={formState.isSubmitting}>
                      {t('changePassword.buttonChangePassowrd')}
                    </ButtonWithLoader>
                  </FormItem>
                </FormRow>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
