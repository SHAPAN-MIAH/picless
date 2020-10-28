import { useTranslation } from 'react-i18next'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userSelector, loadingSelector, messageSelector, errorSelector } from '../../redux/User/UserSelectors'
import { getProfile, updateProfile, cleanState } from '../../redux/User/UserThunks'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import CheckboxForm from '../../components/Common/CheckboxForm'
import Alert from '../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'

import { UserType } from '../../types/UserType.d'

const UserSettings: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const loading: boolean = useSelector(loadingSelector)

  const userData: UserType = useSelector(userSelector)

  const [fullName, setFullName] = useState(userData.fullName)
  const [displayProfileSearchBar, setDisplayProfileSearchBar] = useState(true)

  const prevUserDataRef = useRef(userData)

  // Will mount
  useEffect(() => {
    dispatch(cleanState()) // TODO: MOVE TO UNMOUNT

    dispatch(getProfile())
  }, [dispatch])

  // Component Update
  useEffect(() => {
    setFullName(userData.fullName)

    prevUserDataRef.current = userData
  }, [dispatch, userData])

  const saveUserData = () => {
    const user: UserType = {
      fullName,
    }

    dispatch(updateProfile(user))
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
                  <p className="widget-box-title">{t('profileInfo.General')}</p>

                  <div className="widget-box-content">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="enabled-push-notifications"
                          title={t('settings.fields.enabledPushNotifications')}
                          description={t('settings.fields.enabledPushNotifications')}
                          checked={displayProfileSearchBar}
                          onChange={(value: boolean) => {
                            setDisplayProfileSearchBar(value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="enabled-email-notifications"
                          title={t('settings.fields.enabledEmailNotifications')}
                          description={t('settings.fields.enabledEmailNotifications')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
                      </FormItem>
                    </FormRow>
                  </div>
                </div>

                <div className="widget-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <p className="widget-box-title">{t('profileInfo.Notification')}</p>

                  <div className="widget-box-content">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-comments"
                          title={t('settings.fields.comments')}
                          description={t('settings.fields.comments')}
                          checked={displayProfileSearchBar}
                          onChange={(value: boolean) => {
                            setDisplayProfileSearchBar(value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-new-suscriber"
                          title={t('settings.fields.newSuscriber')}
                          description={t('settings.fields.newSuscriber')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-tips"
                          title={t('settings.fields.tips')}
                          description={t('settings.fields.tips')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="notification-messages"
                          title={t('settings.fields.messages')}
                          description={t('settings.fields.messages')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
                      </FormItem>
                    </FormRow>
                  </div>
                </div>

                <div className="widget-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <p className="widget-box-title">{t('profileInfo.PrivacySettings')}</p>

                  <div className="widget-box-content">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="display-profileInSearchBar"
                          title={t('settings.fields.displayProfileInSearchBar')}
                          description={t('settings.fields.displayProfileInSearchBar')}
                          checked={displayProfileSearchBar}
                          onChange={(value: boolean) => {
                            setDisplayProfileSearchBar(value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="display-chatActivity"
                          title={t('settings.fields.displayChatActivity')}
                          description={t('settings.fields.displayChatActivity')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <CheckboxForm
                          id="google-Authenticator"
                          title={t('settings.fields.googleAuthenticator')}
                          description={t('settings.fields.googleAuthenticator')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <div className="form-select">
                          <label htmlFor="settings-howCanSendMessage">{t('settings.fields.howCanSendMessage')}</label>
                          <select name="settings-howCanSendMessage" id="settings-howCanSendMessage">
                            <option id="everyOne">Everyone (Public)</option>
                            <option id="onlySuscribers">Only Suscribers</option>
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
