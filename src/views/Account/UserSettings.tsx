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
              <div className="widget-box">
                <p className="widget-box-title">{t('settings.general')}</p>

                <div className="widget-box-content">
                  <form className="form">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-full-name"
                          classNameFormInput="small active"
                          name="account_full_name"
                          placeholder={t('settings.fullName')}
                          defaultValue={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </FormItem>
                      <FormItem>
                        <CheckboxForm
                          id="display-profile-searchbar"
                          title={t('settings.fields.displayProfileSearchBar')}
                          description={t('settings.fields.displayProfileSearchBarDescription')}
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
                          id="display-profile-searchbar"
                          title={t('settings.fields.displayProfileSearchBar')}
                          description={t('settings.fields.displayProfileSearchBarDescription')}
                          checked={displayProfileSearchBar}
                          onChange={(e: any) => {
                            setDisplayProfileSearchBar(e.target.value)
                          }}
                        />
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
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  )
}

export default UserSettings
