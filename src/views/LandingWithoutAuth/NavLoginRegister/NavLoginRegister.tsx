import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

const NavLoginRegister: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <div className="tab-switch">
      <p className={classNames('tab-switch-button login-register-form-trigger', 'active')}>{t('authentication.login')}</p>

      <p className={classNames('tab-switch-button login-register-form-trigger')}>{t('authentication.register')}</p>
    </div>
  )
}

export default NavLoginRegister
