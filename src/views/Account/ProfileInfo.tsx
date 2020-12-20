import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { CountryDropdown } from 'react-country-region-selector'

import moment from 'moment'

import { userSelector, loadingSelector, messageSelector, errorSelector } from '../../redux/User/UserSelectors'
import { cleanState, getProfile, updateProfile } from '../../redux/User/UserThunks'

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
import SelectForm, { SelectOptionsType } from '../../components/Common/SelectForm'
import { UserType, OccupationType } from '../../types/UserType.d'

import professions from '../../constants/professions.json'

const ProfileInfo: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const loading: boolean = useSelector(loadingSelector)
  const userData: UserType = useSelector(userSelector)

  const [userName, setUserName] = useState(userData.userName)
  const [profileDescription, setProfileDescription] = useState(userData.profileDescription)
  const [countryName, setCountry] = useState(userData.countryName)
  const [cityName, setCityName] = useState(userData.cityName)
  const [birthDate, setBirthdate] = useState<Date | null>(userData.birthDate ? moment(userData.birthDate).toDate() : null)
  const [occupation, setOccupation] = useState<OccupationType | null>(userData.occupation || null)
  const [updateFields, setUpdateFields] = useState<boolean>(true)

  const professionList: SelectOptionsType[] = professions

  useEffect(() => {
    dispatch(getProfile())

    return () => {
      dispatch(cleanState())
    }
  }, [dispatch])

  useEffect(() => {
    if (updateFields) {
      setUserName(userData.fullName)
      setOccupation(userData.occupation || null)
      setProfileDescription(userData.profileDescription)
      setCountry(userData.countryName)
      setCityName(userData.cityName)
      setBirthdate(userData.birthDate ? moment(userData.birthDate).toDate() : null)

      setUpdateFields(false)
    }
  }, [userData])

  const saveUserData = () => {
    let user: UserType = {
      ...userData,
      userName,
      profileDescription,
      countryName,
      cityName,
      occupationId: occupation?.id,
    }

    if (birthDate) user = { ...user, birthDate }
    dispatch(updateProfile(user))
  }

  const onOccupationHandle = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const occupationValue = professionList.find((o) => {
        return o.value === e.target.value
      })

      if (occupationValue) {
        setOccupation({ id: parseInt(occupationValue?.value, 10), name: occupationValue?.name })
      }
    },
    [occupation]
  )

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
                          value={userName}
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
                          value={profileDescription}
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
                        <TextInput
                          type="text"
                          id="city"
                          classNameFormInput="small"
                          name="city"
                          placeholder={t('profileInfo.cityField')}
                          value={cityName}
                          onChange={(e) => setCityName(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow>
                      <FormItem> </FormItem>
                      <FormItem>
                        <SelectForm
                          id="occupation"
                          name="occupation"
                          placeholder={t('accountInfo.occupationField')}
                          options={professionList}
                          value={occupation?.id || ''}
                          onChange={onOccupationHandle}
                        />
                      </FormItem>
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

                {(error || message) && (
                  <div className="widget-box" style={{ marginTop: '20px' }}>
                    <div className="widget-box-content">
                      <FormRow>
                        {error && <Alert alertType="DANGER" message={t(error)} style={{ width: '100%' }} />}
                        {message && <Alert alertType="PRIMARY" message={t(message)} style={{ width: '100%' }} />}
                      </FormRow>
                    </div>
                  </div>
                )}

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
