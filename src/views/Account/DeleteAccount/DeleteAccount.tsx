import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

const DeleteAccount: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  return (
    <div className="account-hub-content">
      <div className="section-header">
        <div className="section-header-info">
          <h2 className="section-title">{t('accountInfo.deleteAccount')}</h2>
        </div>
      </div>

      <div className="grid-column">
        <div className="widget-box">
          <div className="widget-box-content">
            <ButtonWithLoader
              type="button"
              className="small"
              onClick={() => alert('Are you sure you want to do this?')}
              showLoader={false}
              style={{ backgroundColor: 'tomato' }}
            >
              {t('accountInfo.deleteAccount')}
            </ButtonWithLoader>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
