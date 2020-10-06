import { useTranslation } from 'react-i18next'
import React, { FunctionComponent, useEffect, useState } from 'react'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import UserService from '../../services/UserService'
import { UserType } from '../../types/UserType'

const AccountInfo: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [urlUserName, setUrlUserName] = useState('')
  const [recoveryEmail, setRecoveryEmail] = useState('')
  const [country, setCountry] = useState('0')
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    UserService.getUserProfile()
      .then((response) => {
        setFullName(response.fullName || '')
        setEmail(response.email || '')
        setUrlUserName(response.userName || '')
        setRecoveryEmail(response.emailRecovery || '')
        setCountry((response.countryId || 0).toString())
        setPhoneNumber(response.phoneNumber || '')
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  const saveUserData = () => {
    const userData: UserType = {
      fullName,
      email,
      userName: urlUserName,
      emailRecovery: recoveryEmail,
      countryId: parseInt(country, 10),
      phoneNumber,
    }

    UserService.updateUserProfile(userData)
      .then((w) => {
        console.info(w)
        alert('User Updated')
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <AccountSidebar onSaveButton={saveUserData} />

          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">{t('accountInfo.accountTitle')}</p>

                <h2 className="section-title">{t('accountInfo.accountSubTitle')}</h2>
              </div>
            </div>

            <div className="grid-column">
              <div className="widget-box">
                <p className="widget-box-title">{t('accountInfo.personalInfo')}</p>

                <div className="widget-box-content">
                  <form className="form">
                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-full-name"
                          classNameFormInput="small active"
                          name="account_full_name"
                          placeholder={t('accountInfo.fullNameField')}
                          defaultValue={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </FormItem>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-email"
                          classNameFormInput="small active"
                          name="account_email"
                          placeholder={t('accountInfo.accountEmailField')}
                          defaultValue={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-url-username"
                          classNameFormInput="small active"
                          name="account_url_username"
                          placeholder={t('accountInfo.urlUserNameField5')}
                          defaultValue={urlUserName}
                          onChange={(e) => setUrlUserName(e.target.value)}
                        />
                      </FormItem>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="account-recovery-email"
                          classNameFormInput="small active"
                          name="account_recovery_email"
                          placeholder={t('accountInfo.recoveryEmailField')}
                          defaultValue={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <div className="form-select">
                          <label htmlFor="account-country">{t('accountInfo.countryField')}</label>
                          <select
                            id="account-country"
                            name="account_country"
                            defaultValue={country}
                            onChange={(e) => setCountry(e.target.value)}
                          >
                            <option value="0">Select your Country</option>
                            <option value="1">United States</option>
                          </select>

                          <svg className="form-select-icon icon-small-arrow">
                            <use xlinkHref="#svg-small-arrow" />
                          </svg>
                        </div>
                      </FormItem>
                      <FormItem>
                        <TextInput
                          type="text"
                          id="phone-number"
                          classNameFormInput="small active"
                          name="phone_number"
                          placeholder={t('accountInfo.phoneNumberField')}
                          defaultValue={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
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

export default AccountInfo
