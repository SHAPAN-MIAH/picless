import { useTranslation } from 'react-i18next'
import React, { FunctionComponent, useEffect, useState } from 'react'
import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import CheckboxForm from '../../components/Common/CheckboxForm'
import Alert from '../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'

import { ProfileUserSettings } from '../../types/UserType.d'
import UserService from '../../services/UserService'

const UserSettings: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const [enabledPushNotificatoins, setEnabledPushNotificatoins] = useState<boolean>(false)
  const [enabledEmailNotificatoins, setEnabledEmailNotificatoins] = useState<boolean>(false)
  const [notificationComments, setNotificationComments] = useState<boolean>(false)
  const [notificationNewSuscriber, setNotificationNewSuscriber] = useState<boolean>(false)
  const [notificationTips, setNotificationTips] = useState<boolean>(false)
  const [notificationsMessage, setNotificationsMessage] = useState<boolean>(false)
  const [privacityDisplayProfileInSearchBar, setprivacityDisplayProfileInSearchBar] = useState<boolean>(false)
  const [privacityDisplayChatActivity, setPrivacityDisplayChatActivity] = useState<boolean>(false)
  const [privacityGoogleAuthenticator, setPrivacityGoogleAuthenticator] = useState<boolean>(false)
  const [privacityWhoCanSendMessage, setPrivacityWhoCanSendMessage] = useState<string>('everyOne')

  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    UserService.getUserSettings().then((userData: any) => {
      if (userData) {
        setEnabledPushNotificatoins(userData.enabledPushNotificatoins)
        setEnabledEmailNotificatoins(userData.enabledEmailNotificatoins)
        setNotificationComments(userData.notificationComments)
        setNotificationNewSuscriber(userData.notificationNewSuscriber)
        setNotificationTips(userData.notificationTips)
        setNotificationsMessage(userData.notificationsMessage)
        setprivacityDisplayProfileInSearchBar(userData.privacityDisplayProfileInSearchBar)
        setPrivacityDisplayChatActivity(userData.privacityDisplayChatActivity)
        setPrivacityGoogleAuthenticator(userData.privacityGoogleAuthenticator)
        setPrivacityWhoCanSendMessage(userData.privacityWhoCanSendMessage)
      }
    })
  }, []) // Will mount

  // useEffect(() => {
  //   UserService.getUserSettings().then((userData: any) => {
  //     if (userData) {
  //       setEnabledPushNotificatoins(userData.enabledPushNotificatoins)
  //       setEnabledEmailNotificatoins(userData.enabledEmailNotificatoins)
  //       setNotificationComments(userData.notificationComments)
  //       setNotificationNewSuscriber(userData.notificationNewSuscriber)
  //       setNotificationTips(userData.notificationTips)
  //       setNotificationsMessage(userData.notificationsMessage)
  //       setprivacityDisplayProfileInSearchBar(userData.privacityDisplayProfileInSearchBar)
  //       setPrivacityDisplayChatActivity(userData.privacityDisplayChatActivity)
  //       setPrivacityGoogleAuthenticator(userData.privacityGoogleAuthenticator)
  //       setPrivacityWhoCanSendMessage(userData.privacityWhoCanSendMessage)
  //     }
  //   })
  // }, [
  //   enabledPushNotificatoins,
  //   enabledEmailNotificatoins,
  //   notificationComments,
  //   notificationNewSuscriber,
  //   notificationTips,
  //   notificationsMessage,
  //   privacityDisplayProfileInSearchBar,
  //   privacityDisplayChatActivity,
  //   privacityGoogleAuthenticator,
  //   privacityWhoCanSendMessage,
  // ]) // Will mount

  const saveUserData = () => {
    setLoading(true)

    const settings: ProfileUserSettings = {
      enabledPushNotificatoins,
      enabledEmailNotificatoins,
      notificationComments,
      notificationNewSuscriber,
      notificationTips,
      notificationsMessage,
      privacityDisplayProfileInSearchBar,
      privacityDisplayChatActivity,
      privacityGoogleAuthenticator,
      privacityWhoCanSendMessage,
    }

    UserService.updateUserSettings(settings)
      .then(() => {
        setMessage('OK')
        setLoading(false)
      })
      .catch(() => {
        setError('error')
        setLoading(false)
      })
  }

  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <AccountSidebar />

          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">{t('settings.title')}</p>

                <h2 className="section-title">{t('settings.subTitle')}</h2>
              </div>
            </div>

            <div className="grid-column">
              <form className="form">
                <div className="widget-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <p className="widget-box-title">{t('settings.generalTitle')}</p>

                  <div className="widget-box-content">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="enabled-push-notifications"
                          title={t('settings.fields.enabledPushNotifications')}
                          checked={privacityDisplayProfileInSearchBar}
                          onChange={(value: boolean) => {
                            setprivacityDisplayProfileInSearchBar(value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="enabled-email-notifications"
                          title={t('settings.fields.enabledEmailNotifications')}
                          checked={enabledEmailNotificatoins}
                          onChange={(e: any) => {
                            setEnabledEmailNotificatoins(e)
                          }}
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
                        <CheckboxForm
                          id="notification-comments"
                          title={t('settings.fields.comments')}
                          checked={notificationComments}
                          onChange={(value: boolean) => {
                            setNotificationComments(value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-new-suscriber"
                          title={t('settings.fields.newSubscriber')}
                          checked={notificationNewSuscriber}
                          onChange={(e: any) => {
                            setNotificationNewSuscriber(e)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-tips"
                          title={t('settings.fields.tips')}
                          checked={notificationTips}
                          onChange={(e: any) => {
                            setNotificationTips(e)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-messages"
                          title={t('settings.fields.messages')}
                          checked={notificationsMessage}
                          onChange={(e: any) => {
                            setNotificationsMessage(e)
                          }}
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
                        <CheckboxForm
                          id="display-profileInSearchBar"
                          title={t('settings.fields.displayProfileInSearchBar')}
                          checked={privacityDisplayProfileInSearchBar}
                          onChange={(value: any) => {
                            setprivacityDisplayProfileInSearchBar(value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="display-chatActivity"
                          title={t('settings.fields.displayChatActivity')}
                          checked={privacityDisplayChatActivity}
                          onChange={(e: any) => {
                            setPrivacityDisplayChatActivity(e)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="google-Authenticator"
                          title={t('settings.fields.googleAuthenticator')}
                          checked={privacityGoogleAuthenticator}
                          onChange={(e: any) => {
                            setPrivacityGoogleAuthenticator(e)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <div className="form-select">
                          <label htmlFor="settings-howCanSendMessage">{t('settings.fields.whoCanSendMessage')}</label>
                          <select
                            name="settings-howCanSendMessage"
                            id="settings-howCanSendMessage"
                            onChange={(e: any) => {
                              setPrivacityWhoCanSendMessage(e.target.value)
                            }}
                            value={privacityWhoCanSendMessage}
                          >
                            <option id="everyOne" value="everyOne">
                              {t('settings.fields.sendEveryone')}
                            </option>
                            <option id="onlySuscribers" value="onlySuscribers">
                              {t('settings.fields.sendOnlySubscribers')}
                            </option>
                          </select>
                        </div>
                      </FormItem>
                    </FormRow>

                    <FormRow>
                      {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
                      {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />}
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <ButtonWithLoader
                          type="button"
                          className="medium primary"
                          onClick={saveUserData}
                          showLoader={loading}
                        >
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
    </LayoutMain>
  )
}

export default UserSettings
