import classNames from 'classnames'
import CheckboxForm from 'components/Common/CheckboxForm'
import FormItem from 'components/Common/Form/FormItem'
import FormRow from 'components/Common/Form/FormRow'
import FormRowItem from 'components/Common/Form/FormRowItem'
import TextInput from 'components/Common/TextInput'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import DatePickerForm from '../../../../components/Common/DatePickerForm/DatePickerForm'

const TooltipContainerDiv = styled.div`
  padding: 10px;
`

interface MonetizedProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  onApplyMonetize: (amount: number) => void
  name?: string
  defaultAmount?: number
}

const Monetized: FunctionComponent<MonetizedProps> = (props) => {
  const { onApplyMonetize, name = 'monetized-amount', defaultAmount } = props

  const [amount, setAmount] = useState<number>(defaultAmount || 0)
  const [monetize, setMonetize] = useState<boolean>(true)

  const onApply = (close: () => void) => {
    if (monetize && amount > 0) {
      close()
      onApplyMonetize(amount)
    }
  }

  useEffect(() => {
    if (defaultAmount) {
      setAmount(defaultAmount)
    }
  }, [defaultAmount])

  return (
    <>
      <Popup
        trigger={
          <div className="quick-post-footer-action">
            <svg className="menu-item-link-icon icon-revenue">
              <use xlinkHref="#svg-revenue" />
            </svg>
          </div>
        }
        position="bottom center"
        closeOnDocumentClick
        contentStyle={{ zIndex: 999999 }}
      >
        {(close: any) => {
          return (
            <>
              <TooltipContainerDiv>
                <FormRowItem>
                  <CheckboxForm
                    id="enabled-display-adult-content"
                    name="monetize"
                    title="Monetize"
                    checked={monetize}
                    onChange={(value: boolean) => {
                      setMonetize(value)
                    }}
                  />
                </FormRowItem>

                <FormRowItem>
                  <TextInput
                    type="text"
                    name={name}
                    value={amount}
                    classNameFormInput="small active"
                    placeholder="Enter amount"
                    onChange={(e: any) => setAmount(e.target.value)}
                  />
                </FormRowItem>
                <FormRowItem>
                  <button
                    type="button"
                    className="button small primary"
                    onClick={() => {
                      onApply(close)
                    }}
                  >
                    Apply
                  </button>
                </FormRowItem>
              </TooltipContainerDiv>
            </>
          )
        }}
      </Popup>
    </>
  )
}

export default Monetized
