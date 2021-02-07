import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'

import useWallet from '../../../hooks/useWallet'

import CheckboxForm from '../../../components/Common/CheckboxForm'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'

const OverviewHeader: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const { currentBalance } = useWallet()

  return (
    <>
      <div className="earning-stat-box full" style={{ justifyContent: 'left' }}>
        <div className="earning-stat-box-info">
          <div className="earning-stat-box-icon-wrap stat-balance">
            <svg className="earning-stat-box-icon icon-wallet">
              <use xlinkHref="#svg-wallet" />
            </svg>
          </div>

          <p className="earning-stat-box-title">
            {currentBalance} <span className="currency">EUR</span>
          </p>

          <p className="earning-stat-box-text">Account Balance</p>
        </div>
      </div>
      <FormRow style={{}}>
        <FormItem>
          <CheckboxForm
            id="notification-comments"
            title={t('Wallet primary method')}
            description={t('Make wallet primary method for rebills')}
            checked
            onChange={(value: boolean) => {}}
          />
        </FormItem>
      </FormRow>
    </>
  )
}

export default OverviewHeader
