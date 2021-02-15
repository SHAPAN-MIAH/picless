import React from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import useRouter from '../../../hooks/useRouter'

const NavLoginRegister: React.FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const changeView = (hash: string) => {
    router.push(`#${hash}`)
  }

  return (
    <div className="tab-switch">
      <p
        className={classNames('tab-switch-button login-register-form-trigger', 'active')}
        onClick={() => changeView('login')}
      >
        {t('authentication.login')}
      </p>

      <p className={classNames('tab-switch-button login-register-form-trigger')} onClick={() => changeView('register')}>
        {t('authentication.register')}
      </p>
    </div>
  )
}

export default NavLoginRegister
