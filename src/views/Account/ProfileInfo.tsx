import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'

import moment from 'moment'

import { userSelector, loadingSelector, messageSelector, errorSelector } from '../../redux/User/UserSelectors'
import { cleanState, getProfile, updateProfile } from '../../redux/User/UserThunks'

import { UserType } from '../../types/UserType.d'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import AccountHubMain from './AccountHub/AccountHubMain'
import TextArea from '../../components/Common/TextArea'
import DatePickerForm from '../../components/Common/DatePickerForm/DatePickerForm'
import Alert from '../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'
import InterestList from './Interest/InterestList'
import TimeLineList from './TimeLine/TimeLineList'

const ProfileInfo: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const loading: boolean = useSelector(loadingSelector)
  const userData: UserType = useSelector(userSelector)

  const [userName, setUserName] = useState(userData.userName)
  const [tagLine, setTagLine] = useState(userData.tagLine || '')
  const [profileDescription, setProfileDescription] = useState(userData.profileDescription)
  const [countryName, setCountry] = useState(userData.countryName)
  const [regionName, setRegionName] = useState(userData.regionName)
  const [birthDate, setBirthdate] = useState<Date | null>(userData.birthDate ? moment(userData.birthDate).toDate() : null)

  const prevUserDataRef = useRef(userData)

  useEffect(() => {
    dispatch(cleanState()) // TODO: MOVE TO UNMOUNT

    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    setUserName(userData.fullName)
    setTagLine(userData.tagLine || '')
    setProfileDescription(userData.profileDescription)
    setCountry(userData.countryName)
    setRegionName(userData.regionName)
    setBirthdate(userData.birthDate ? moment(userData.birthDate).toDate() : null)

    prevUserDataRef.current = userData
  }, [userData, dispatch])

  const saveUserData = () => {
    let user: UserType = {
      ...userData,
      userName,
      profileDescription,
      countryName,
      regionName,
      tagLine,
    }

    if (birthDate) user = { ...user, birthDate }
    debugger
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
                <p className="section-pretitle">{t('profileInfo.myProfileTitle')}</p>

                <h2 className="section-title">{t('profileInfo.profileInfo')}</h2>
              </div>
            </div>

            <div className="grid-column">
              <AccountHubMain />

              <form className="form">
                <div className="widget-box">
                  <p className="widget-box-title">{t('profileInfo.aboutYourProfile')}</p>

                  <div className="widget-box-content">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-profile-name"
                          classNameFormInput="small"
                          name="account_profile_name"
                          placeholder={t('profileInfo.profileNameField')}
                          defaultValue={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </FormItem>
                      <FormItem>
                        <div className="form-input-decorated">
                          <DatePickerForm
                            customInputRef="birthdayRef"
                            placeholderText={t('profileInfo.birthdayField')}
                            selected={birthDate}
                            onChange={(date: any) => setBirthdate(date)}
                            iconName="events"
                          />
                        </div>
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextArea
                          type="text"
                          id="account-url-username"
                          classNameFormInput="small full"
                          name="account_url_username"
                          placeholder={t('profileInfo.writeDescriptionField')}
                          defaultValue={profileDescription}
                          onChange={(e) => setProfileDescription(e.target.value)}
                        />
                      </FormItem>

                      <FormItem>
                        <div className="form-select">
                          <label htmlFor="account-country">{t('profileInfo.countryField')}</label>
                          <CountryDropdown
                            id="account-country"
                            name="account_country"
                            value={countryName || ''}
                            onChange={(val) => {
                              setCountry(val)
                            }}
                          />
                        </div>

                        <div className="form-select">
                          <label htmlFor="account-region">{t('profileInfo.regionField')}</label>
                          <RegionDropdown
                            id="account-region"
                            name="account_region"
                            disableWhenEmpty
                            country={countryName || ''}
                            value={regionName || ''}
                            onChange={(val) => {
                              setRegionName(val)
                            }}
                          />
                        </div>
                      </FormItem>
                    </FormRow>

                    <FormRow>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="tag-line"
                          classNameFormInput="small"
                          name="tag_line"
                          placeholder={t('profileInfo.taglineField')}
                          defaultValue={tagLine}
                          onChange={(e) => setTagLine(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow>
                      {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
                      {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />}
                    </FormRow>
                  </div>
                </div>

                <div className="widget-box" style={{ marginTop: '20px' }}>
                  <p className="widget-box-title">{t('profileInfo.interestTitle')}</p>

                  <div className="widget-box-content">
                    {/* Interests */}
                    <InterestList />
                  </div>
                </div>

                <div className="widget-box" style={{ marginTop: '20px' }}>
                  <p className="widget-box-title">{t('profileInfo.timelineTitle')}</p>

                  <div className="widget-box-content">
                    {/* TimeLine */}
                    <TimeLineList />
                  </div>
                </div>

                <div className="widget-box" style={{ marginTop: '20px' }}>
                  <div className="widget-box-content">
                    <FormRow>
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

export default ProfileInfo
