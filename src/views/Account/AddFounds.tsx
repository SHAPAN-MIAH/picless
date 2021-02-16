import React, { FunctionComponent, useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'

import useWallet from '../../hooks/useWallet'
import FormItem from '../../components/Common/Form/FormItem'

import FormRow from '../../components/Common/Form/FormRow'

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
    const newAmount = currentAmount * 100

    PaymentService.addCreditToWallet(newAmount, 'USD', 'Add founds to wallet', '').then((data: any) => {
      if (data.code === 0 && data.message === 'succeeded') {
        updateBalance()
      } else if (data.code === '0' && data.message !== '') {
        alert('redirect' + data.path)
      } else if (data.code === '1' && data.message === '') {
        alert('error')
      }
    })
  }

  return (
    <>
      <div className="account-hub-content">
        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">Add Founds</p>

            <div className="widget-box-content">
              <form>
                <div style={{ display: 'flex', flexFlow: 'row' }}>
                  <button
                    type="button"
                    className="button medium secondary"
                    style={{ margin: '5px' }}
                    onClick={() => onAddAmount(10)}
                  >
                    $ 10
                  </button>
                  <button
                    type="button"
                    className="button medium secondary"
                    style={{ margin: '5px' }}
                    onClick={() => onAddAmount(20)}
                  >
                    $ 20
                  </button>
                  <button
                    type="button"
                    className="button medium secondary"
                    style={{ margin: '5px' }}
                    onClick={() => onAddAmount(50)}
                  >
                    $ 50
                  </button>
                  <button
                    type="button"
                    className="button medium secondary"
                    style={{ margin: '5px' }}
                    onClick={() => onAddAmount(100)}
                  >
                    $ 100
                  </button>
                </div>

                <FormRow style={{ marginTop: '20px' }}>
                  <FormItem>
                    <TextInput
                      type="text"
                      id="expiration-month"
                      classNameFormInput="small active"
                      name="expiration_month"
                      placeholder="Total"
                      value={currentAmount || 0}
                      onChange={(e) => {
                        setCurrentAmount(parseFloat(e.target.value))
                      }}
                      required
                    />
                  </FormItem>
                </FormRow>

                <div style={{ display: 'flex', flexFlow: 'row', marginTop: '20px' }}>
                  <button type="button" className="button primary" style={{ margin: '5px' }} onClick={() => onAddAmount(0)}>
                    Reset
                  </button>

                  <button type="button" className="button" style={{ margin: '5px' }} onClick={addCredits}>
                    Add Credit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddFounds
