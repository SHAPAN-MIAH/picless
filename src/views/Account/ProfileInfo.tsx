import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UserType } from '../../types/UserType'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import AccountHubMain from './AccountHub/AccountHubMain'
import TextArea from '../../components/Common/TextArea'
import DatePickerForm from '../../components/Common/DatePickerForm/DatePickerForm'
import UserService from '../../services/UserService'

const ProfileInfo: FunctionComponent<{}> = (props: any) => {
  const { t } = useTranslation()

  const [userName, setUserName] = useState('')
  const [tagline, setTagline] = useState('')
  const [profileDescription, setProfileDescription] = useState('')
  const [countryId, setCountryId] = useState('0')
  const [birthday, setBirthday] = useState(null)
  
  const [coverPicture, setCoverPicture] = useState('')
  const [profilePicture, setProfilePicture] = useState('')

  useEffect(() => {
    UserService.getUserProfile()
      .then((response) => {
        setUserName(response.userName || '')
        setProfileDescription(response.profileDescription || '')
        // setBirthday()
        setCountryId((response.countryId || 0).toString())
        
        setCoverPicture(response.coverPicture || '')
        setProfilePicture(response.profilePicture || '')

      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const saveUserData = useCallback(() => {
    const userData: UserType = {
      userName,
      profileDescription,
      countryId: parseInt(countryId, 10),
    }

    UserService.updateUserProfile(userData)
      .then((w) => {
        console.info(w)
        alert('User Updated')
      })
      .catch((err) => {
        console.error(err)
      })
  }, [countryId, profileDescription, userName])

  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <AccountSidebar onSaveButton={saveUserData} />

          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">{t('profileInfo.myProfileTitle')}</p>

                <h2 className="section-title">{t('profileInfo.profileInfo')}</h2>
              </div>
            </div>

            <div className="grid-column">
              <AccountHubMain coverPicture = {coverPicture} profilePicture={profilePicture} />

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
                        <TextInput
                          type="text"
                          id="tag-line"
                          classNameFormInput="small"
                          name="tag_line"
                          placeholder={t('profileInfo.taglineField')}
                          defaultValue={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                        />
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
                          <select
                            id="account-country"
                            name="account_country"
                            defaultValue={countryId}
                            onChange={(e) => {
                              setCountryId(e.target.value)
                            }}
                          >
                            <option value="0">Select your Country</option>
                            <option value="1">United States</option>
                          </select>

                          <svg className="form-select-icon icon-small-arrow">
                            <use xlinkHref="#svg-small-arrow" />
                          </svg>
                        </div>

                        <div className="form-input-decorated">
                          <DatePickerForm
                            placeholderText={t('profileInfo.birthdayField')}
                            selected={birthday}
                            onChange={(date: any) => setBirthday(date)}
                            iconName="events"
                          />
                        </div>
                      </FormItem>
                    </FormRow>
                  </div>
                </div>

                {/* Interests */}
                <div className="widget-box">
                  <p className="widget-box-title">{t('profileInfo.interestTitle')}</p>

                  <div className="widget-box-content">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextArea
                          type="text"
                          id="interest-1"
                          classNameFormInput="small full"
                          name="account_url_username"
                          placeholder="Write a about you ..."
                          defaultValue=""
                        />
                      </FormItem>

                      <FormItem>
                        <TextArea
                          type="text"
                          id="interest-2"
                          classNameFormInput="small full"
                          name="account_url_username"
                          placeholder="Write a little description about you ..."
                          defaultValue=""
                        />
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
