import { useTranslation } from 'react-i18next'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListDevices } from '../../redux/slices/AuthView'
import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import UserService from '../../services/UserService'
import { UserType } from '../../types/UserType'

const AccountDevices: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
 
    dispatch(getListDevices())

  }, [])

  const saveUserData = () => {
    const userData: UserType = {
      fullName,
      email
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
                <p className="widget-box-title">{t('accountInfo.devices')}</p>

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

export default AccountDevices
