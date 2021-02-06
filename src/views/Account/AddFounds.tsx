import React, { FunctionComponent, useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'

import useWallet from '../../hooks/useWallet'
import FormItem from '../../components/Common/Form/FormItem'

import FormRow from '../../components/Common/Form/FormRow'
import LayoutMain from '../LayoutMain/LayoutMain'
import AccountSidebar from './AccountSidebar/AccountSidebar'
import TextInput from '../../components/Common/TextInput'
import PaymentService from '../../services/PaymentService'

const AddFounds: FunctionComponent<{}> = () => {
  const [currentAmount, setCurrentAmount] = useState<number>(0)
  const SecurionPay = window.Securionpay

  const { addFounds, updateBalance } = useWallet()
  // const history = useHistory()

  useEffect(() => {
    const script = document.createElement('script')
    script.setAttribute('id', 'mainScriptSecurionPay')
    script.src = 'https://securionpay.com/js/securionpay.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  const onAddAmount = (amount: number) => {
    if (amount > 0) {
      const newValue = currentAmount + amount

      setCurrentAmount(newValue)
    } else if (amount < 0) alert('Error')
    else setCurrentAmount(amount)
  }

  const addCredits = () => {
    PaymentService.getDefaultCard().then((data: any) => {
      if (data.code === '0') {
        const newAmount = currentAmount * 100

        SecurionPay.setPublicKey(process.env.REACT_APP_SECURIONPAY_PUBLIC_KEY)

        SecurionPay.verifyThreeDSecure(
          {
            amount: newAmount,
            currency: 'USD',
            card: data.defaultCardId,
          },
          (token: any) => {
            if (token.error) {
              alert(JSON.stringify(token))
            } else {
              addFounds(newAmount, 'Add founds to wallet', token.id)
              updateBalance()
            }
          }
        )
      }
    })
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-3-9">
            <AccountSidebar />
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle">Wallet</p>

                  <h2 className="section-title">{`Add founds to wallet  `}</h2>
                </div>
              </div>

              <div className="grid-column">
                <div className="widget-box">
                  <p className="widget-box-title">Founds</p>

                  <div className="widget-box-content">
                    <form className="form">
                      <FormRow>
                        <FormItem>
                          <button
                            type="button"
                            className="button small secondary"
                            style={{ margin: '5px' }}
                            onClick={() => onAddAmount(5)}
                          >
                            EUR 5
                          </button>
                          <button
                            type="button"
                            className="button small secondary"
                            style={{ margin: '5px' }}
                            onClick={() => onAddAmount(10)}
                          >
                            EUR 10
                          </button>
                          <button
                            type="button"
                            className="button small  secondary"
                            style={{ margin: '5px' }}
                            onClick={() => onAddAmount(20)}
                          >
                            EUR 20
                          </button>
                          <button
                            type="button"
                            className="button secondary"
                            style={{ margin: '5px' }}
                            onClick={() => onAddAmount(50)}
                          >
                            EUR 50
                          </button>
                          <button
                            type="button"
                            className="button secondary"
                            style={{ margin: '5px' }}
                            onClick={() => onAddAmount(100)}
                          >
                            EUR 100
                          </button>
                        </FormItem>
                      </FormRow>

                      <FormRow>
                        <FormItem>
                          <button
                            type="button"
                            className="button primary"
                            style={{ margin: '5px' }}
                            onClick={() => onAddAmount(0)}
                          >
                            Reset
                          </button>
                        </FormItem>
                      </FormRow>

                      <FormRow>
                        <FormItem>
                          <TextInput
                            type="text"
                            id="expiration-month"
                            classNameFormInput="small"
                            name="expiration_month"
                            placeholder="Amount"
                            value={currentAmount || 0}
                            onChange={(e) => {
                              setCurrentAmount(parseFloat(e.target.value))
                            }}
                            required
                          />
                        </FormItem>
                      </FormRow>

                      <FormRow>
                        <FormItem>
                          <button type="button" className="button" style={{ margin: '5px' }} onClick={addCredits}>
                            Add Credit
                          </button>
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
    </>
  )
}

export default AddFounds
