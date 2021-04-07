import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import _ from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Loader from 'react-loader-spinner'
import * as Yup from 'yup'
import Alert from '../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'
import CheckboxForm from '../../components/Common/CheckboxForm'
import FormItem from '../../components/Common/Form/FormItem'
import FormRow from '../../components/Common/Form/FormRow'
import useUser from '../../hooks/useUser'
import { UserSettingsType } from '../../types/UserType.d'

type FormValues = {
  enabledPushNotifications: boolean
  enabledEmailNotifications: boolean
  notificationComments: boolean
  notificationNewSubscriber: boolean
  notificationTips: boolean
  notificationsMessage: boolean
  privacityDisplayProfileInSearchBar: boolean
  privacityDisplayChatActivity: boolean
  privacityGoogleAuthenticator: boolean
  displayAdultContent: boolean
  // privacityWhoCanSendMessage: string
}
type formFieldsNames = keyof FormValues
const formFields: formFieldsNames[] = [
  'enabledPushNotifications',
  'enabledEmailNotifications',
  'notificationComments',
  'notificationNewSubscriber',
  'notificationTips',
  'notificationsMessage',
  'privacityDisplayProfileInSearchBar',
  'privacityDisplayChatActivity',
  'privacityGoogleAuthenticator',
  'displayAdultContent',
  // 'privacityWhoCanSendMessage',
]

const UserSettings: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getSettings, updateSettings } = useUser()

  // Validations Fields
  const validationSchema = Yup.object().shape({
    enabledPushNotificatoins: Yup.boolean(),
    enabledEmailNotificatoins: Yup.boolean(),
    notificationComments: Yup.boolean(),
    notificationNewSubscriber: Yup.boolean(),
    notificationTips: Yup.boolean(),
    notificationsMessage: Yup.boolean(),
    privacityDisplayProfileInSearchBar: Yup.boolean(),
    privacityDisplayChatActivity: Yup.boolean(),
    privacityGoogleAuthenticator: Yup.boolean(),
    displayAdultContent: Yup.boolean(),
    // privacityWhoCanSendMessage: Yup.string(),
  })

  const { control, handleSubmit, setValue, formState } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setLoading(true)
    getSettings()
      .then((setting: UserSettingsType) => {
        formFields.forEach((field: string) => {
          const value = _.get(setting, field)

          setValue(field as formFieldsNames, value || false)
        })
      })
      .catch(() => {
        setError('Error loading data')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [getSettings, setValue])

  const onSubmit = (values: UserSettingsType) => {
    return updateSettings(values).catch((err) => {
      console.error(err)
      setError(err.message)
    })
  }

  return (
    <div className="content-grid" style={{ maxWidth: '800px' }}>
      <div className="grid grid-2-8-2">
        <div className="grid-column"> </div>

        <div className="account-hub-content">
          <div className="section-header">
            <div className="section-header-info">
              <p className="section-pretitle">{t('settings.title')}</p>

              <h2 className="section-title">{t('settings.subTitle')}</h2>
            </div>
          </div>

          <div className="grid-column">
            {loading && (
              <>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
                </div>
              </>
            )}

            <form className={classNames('form', loading ? 'hidden' : '')} onSubmit={handleSubmit(onSubmit)}>
              <div className="widget-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <p className="widget-box-title">{t('settings.generalTitle')}</p>

                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="enabledPushNotifications"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-push-notifications"
                            name={propsController.name}
                            title={t('settings.fields.enabledPushNotifications')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="enabledEmailNotifications"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-email-notifications"
                            name={propsController.name}
                            title={t('settings.fields.enabledEmailNotifications')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>
                </div>
              </div>

              <div className="widget-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <p className="widget-box-title">{t('settings.typeNotification')}</p>

                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="notificationComments"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-comments-notifications"
                            name={propsController.name}
                            title={t('settings.fields.comments')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="notificationNewSubscriber"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-new-subscriber-notifications"
                            name={propsController.name}
                            title={t('settings.fields.newSubscriber')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="notificationTips"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-tip-notifications"
                            name={propsController.name}
                            title={t('settings.fields.tips')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="notificationsMessage"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-message-notifications"
                            name={propsController.name}
                            title={t('settings.fields.messages')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>
                </div>
              </div>

              <div className="widget-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <p className="widget-box-title">{t('settings.privacyTitle')}</p>

                <div className="widget-box-content">
                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="displayAdultContent"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-display-adult-content"
                            name={propsController.name}
                            title={t('settings.fields.displayAdultContent')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="privacityDisplayProfileInSearchBar"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-display-searchbar"
                            name={propsController.name}
                            title={t('settings.fields.displayProfileInSearchBar')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="privacityDisplayChatActivity"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-display-chat-activity"
                            name={propsController.name}
                            title={t('settings.fields.displayChatActivity')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <Controller
                        control={control}
                        name="privacityGoogleAuthenticator"
                        defaultValue=""
                        render={(propsController) => (
                          <CheckboxForm
                            id="enabled-google-authenticator"
                            name={propsController.name}
                            title={t('settings.fields.googleAuthenticator')}
                            checked={propsController.value}
                            onChange={(value: boolean) => {
                              propsController.onChange(value)
                            }}
                          />
                        )}
                      />
                    </FormItem>
                  </FormRow>

                  {/* <FormRow classNameRow="split">
                    <FormItem>
                      <div className="form-select">
                        <label htmlFor="settings-howCanSendMessage">{t('settings.fields.whoCanSendMessage')}</label>
                        <Controller
                          control={control}
                          name="privacityWhoCanSendMessage"
                          defaultValue=""
                          render={(propsController) => (
                            <select
                              name={propsController.name}
                              id="settings-howCanSendMessage"
                              value={propsController.value}
                              onChange={(val) => {
                                propsController.onChange(val)
                              }}
                            >
                              <option id="everyOne" value="everyOne">
                                {t('settings.fields.sendEveryone')}
                              </option>
                              <option id="onlySuscribers" value="onlySuscribers">
                                {t('settings.fields.sendOnlySubscribers')}
                              </option>
                            </select>
                          )}
                        />
                      </div>
                    </FormItem>
                  </FormRow> */}

                  <FormRow>{error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}</FormRow>

                  <FormRow classNameRow="split">
                    <FormItem>
                      <ButtonWithLoader type="submit" className="medium primary" showLoader={formState.isSubmitting}>
                        {t('accountSidebar.saveButtonText')}
                      </ButtonWithLoader>
                    </FormItem>
                  </FormRow>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSettings
