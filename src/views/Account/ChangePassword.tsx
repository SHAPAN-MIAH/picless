import React, { FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import PasswordStrengthBar from 'react-password-strength-bar'

import { errorSelector, messageSelector, getAction } from '../../redux/Auth/AuthSelectors'
import { changePassword } from '../../redux/Auth/AuthThunks'

import LayoutMain from '../LayoutMain/LayoutMain'
import FormItem from '../../components/Common/Form/FormItem'
import TextInput from '../../components/Common/TextInput'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import FormRow from '../../components/Common/Form/FormRow'
import Alert from '../../components/Common/Alerts/Alerts'
import ButtonWithLoader from '../../components/Common/ButtonWithLoader'

const ChangePassword: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const error: string = useSelector(errorSelector)
  const message: string = useSelector(messageSelector)
  const dispatch = useDispatch()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const onChangePassword = () => {
    dispatch(changePassword(oldPassword, newPassword, passwordRepeat))
  }
  const scoreWords = [
    t('passwordStrengthBar.scoreWords.weak'),
    t('passwordStrengthBar.scoreWords.okay'),
    t('passwordStrengthBar.scoreWords.good'),
    t('passwordStrengthBar.scoreWords.strong'),
  ]

  const currentAction = useSelector(getAction)

  const showLoader = currentAction.action === 'CHANGE_PASSWORD' && currentAction.status === 'WAITING'

  return (
    <LayoutMain>
      <div className="content-grid">
        <div className="grid grid-3-9">
          <AccountSidebar />

          <div className="account-hub-content">
            <div className="section-header">
              <div className="section-header-info">
                <p className="section-pretitle">Account</p>

                <h2 className="section-title">{t('changePassword.changePasswordTitle')} </h2>
              </div>
            </div>

            <div className="grid-column">
              <div className="widget-box">
                <p className="widget-box-title">{t('changePassword.changeYourPasswordHere')} </p>

                <div className="widget-box-content">
                  <form className="form">
                    <FormRow>
                      <FormItem>
                        <TextInput
                          type="password"
                          id="old-password"
                          classNameFormInput="small active"
                          name="old_password"
                          placeholder={t('changePassword.oldPasswordField')}
                          defaultValue={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow>
                      <FormItem>
                        <TextInput
                          type="password"
                          id="new-Password"
                          classNameFormInput="small active"
                          name="new_Password"
                          placeholder={t('changePassword.newPasswordField')}
                          defaultValue={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <PasswordStrengthBar
                          password={newPassword}
                          shortScoreWord={t('passwordStrengthBar.shortScoreWord')}
                          scoreWords={scoreWords}
                          minLength={6}
                        />
                      </FormItem>
                    </FormRow>

                    <FormRow>
                      <FormItem>
                        <TextInput
                          type="password"
                          id="password-repeat"
                          classNameFormInput="small active"
                          name="password_repeat"
                          placeholder={t('changePassword.passwordRepeatField')}
                          defaultValue={passwordRepeat}
                          onChange={(e) => setPasswordRepeat(e.target.value)}
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
                          onClick={onChangePassword}
                          showLoader={showLoader}
                        >
                          {t('changePassword.buttonChangePassowrd')}
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

export default ChangePassword
