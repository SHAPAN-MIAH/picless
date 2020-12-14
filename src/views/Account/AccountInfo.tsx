import { useTranslation } from 'react-i18next'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import _ from 'lodash'

import { userSelector, loadingSelector, messageSelector, errorSelector } from '../../redux/User/UserSelectors'
import { getProfile, updateProfile, cleanState } from '../../redux/User/UserThunks'

import professions from '../../constants/professions.json'
import plans from '../../constants/plans.json'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import SelectForm, { SelectOptionsType } from '../../components/Common/SelectForm'
import Alert from '../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'

import { UserType } from '../../types/UserType.d'
import { PlansType } from '../../types/PaymentTypes.d'

const AccountInfo: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const loading: boolean = useSelector(loadingSelector)

  const userData: UserType = useSelector(userSelector)

  const [fullName, setFullName] = useState(userData.fullName)
  const [email, setEmail] = useState(userData.email)
  const [urlUserName, setUrlUserName] = useState(userData.userName)
  const [recoveryEmail, setRecoveryEmail] = useState(userData.emailRecovery)
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber)
  const [occupation, setOccupation] = useState(userData.occupation)
  const [plan, setPlan] = useState('') // TODO: ADD THE CORRECT FIELD

  const professionList: SelectOptionsType[] = professions

  const plansList = (): SelectOptionsType[] => {
    return plans.map((data: PlansType) => {
      return { value: data.id, name: `${data.name} | (${data.currency} ${data.amount})` }
    })
  }

  const prevUserDataRef = useRef(userData)

  useEffect(() => {
    dispatch(cleanState()) // TODO: MOVE TO UNMOUNT

    dispatch(getProfile())
  }, [])

  useEffect(() => {
    if (!_.isEqual(userData, prevUserDataRef.current)) {
      dispatch(getProfile())
    }
    // TODO: ADD THE OCCUPATION AND PLAN FIELD
    setFullName(userData.fullName)
    setEmail(userData.email)
    setUrlUserName(userData.userName)
    setRecoveryEmail(userData.emailRecovery)
    setPhoneNumber(userData.phoneNumber)
    setOccupation('')
    setPlan('')

    prevUserDataRef.current = userData
  }, [dispatch, userData])

  const saveUserData = () => {
    const user: UserType = {
      fullName,
      email,
      userName: urlUserName,
      emailRecovery: recoveryEmail,
      phoneNumber,
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
                          value={fullName}
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
                          value={email}
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
                          value={urlUserName}
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
                          value={recoveryEmail}
                          onChange={(e) => setRecoveryEmail(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem>
                        <TextInput
                          type="text"
                          id="phone-number"
                          classNameFormInput="small active"
                          name="phone_number"
                          placeholder={t('accountInfo.phoneNumberField')}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </FormItem>
                      <FormItem>
                        <SelectForm
                          id="occupation"
                          name="occupation"
                          placeholder={t('accountInfo.occupationField')}
                          options={professionList}
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow classNameRow="split">
                      <FormItem> </FormItem>
                      <FormItem>
                        <SelectForm
                          id="subscription-price"
                          name="subscription_price"
                          placeholder={t('accountInfo.subscriptionPriceField')}
                          options={plansList()}
                          value={plan}
                          onChange={(e) => setPlan(e.target.value)}
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

export default AccountInfo
