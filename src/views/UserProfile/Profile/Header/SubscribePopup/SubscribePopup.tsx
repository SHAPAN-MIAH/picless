import React, { FunctionComponent, useContext, useEffect, useState } from 'react'

import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import UserAvatar from '../../../../../components/UserAvatar'
import SelectForm, { SelectOptionsType } from '../../../../../components/Common/SelectForm'

import { PlansType, SubscritionPlanOption } from '../../../../../types/PaymentTypes.d'

import styles from './SubscribePopup.module.css'
import PaymentService from '../../../../../services/PaymentService'
import useWallet from '../../../../../hooks/useWallet'
import ProviderProfileContext from '../../../../../context/ProviderProfileContext'

const SubscribePopup: FunctionComponent<{}> = () => {
  const { provider } = useContext(ProviderProfileContext.context)

  const SecurionPay = window.Securionpay

  const { defaultCard } = useWallet()

  const [imageProfile, setImageProfile] = useState(provider.profilePicture)
  const [selectedPlan, setSelectedPlan] = useState<SubscritionPlanOption>()
  const [planListOriginal, setPlanListOriginal] = useState<SubscritionPlanOption[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [planList, setPlanList] = useState<SelectOptionsType[]>([{ value: '0', name: 'Loading ...' }])

  useEffect(() => {
    if (provider) {
      setLoading(true)
      setImageProfile(provider.profilePicture)

      const { userName } = provider

      PaymentService.getPlanOptions(userName || '')
        .then((plans: SubscritionPlanOption[]) => {
          setPlanListOriginal(plans)
          plansOptionsList(plans)

          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }

    const script = document.createElement('script')
    script.setAttribute('id', 'mainScriptSecurionPay')
    script.src = 'https://securionpay.com/js/securionpay.js'
    script.async = true
    document.body.appendChild(script)
  }, [provider])

  const plansOptionsList = (plans: SubscritionPlanOption[]): void => {
    setPlanList(
      plans.map((data: any) => {
        return { value: data.id, name: `${data.intervalCount} ${data.interval}` }
      })
    )
  }

  const handlePlanOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const planSelected = planListOriginal.find((plan: any) => plan.id === e.target.value)

    if (planSelected) {
      setSelectedPlan(planSelected)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedPlan) {
      setLoading(true)

      console.log(defaultCard)
      const securionPayAmount = selectedPlan?.amount * 100

      SecurionPay.setPublicKey(process.env.REACT_APP_SECURIONPAY_PUBLIC_KEY)

      SecurionPay.verifyThreeDSecure(
        {
          amount: securionPayAmount,
          currency: selectedPlan.currency.toUpperCase(),
          card: defaultCard?.defaultCardId,
        },
        (token: any) => {
          if (token.error) {
            alert(JSON.stringify(token))
            setLoading(false)
          } else {
            if (token.threeDSecureInfo.liabilityShift === 'successful') {
              subscribeToUser(token)
            } else {
              setLoading(false)
              alert(JSON.stringify('Cancelled by user'))
            }
          }
        }
      )
    }
  }

  const subscribeToUser = (token: any) => {
    if (provider.id && provider.planId && selectedPlan) {
      PaymentService.suscribeToUser(selectedPlan?.id, provider.id, token.id, selectedPlan?.amount)
        .then((data: any) => {
          if (data.code === 0) {
            setLoading(false)

            window.location.reload()
          } else {
            setLoading(false)
            console.error(`Error ${data.code} => ${data.message}`)
          }
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }

  return (
    <>
      <div className={styles.mainPopup}>
        <div className={styles.headerTip}>
          <h6>Subscribe</h6>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <FormRowItem>
            <div className={styles.userInfoContainer}>
              <div className={styles.userInfoImage}>
                <UserAvatar size="SMALL" imageName={imageProfile} />
              </div>
              <div className={styles.userInfoName}>
                <p className="user-status-title">
                  <span className="bold">{provider.fullName}</span>
                </p>
                <p className="user-status-text small">
                  <a href="profile-timeline.html">@{provider.userName}</a>
                </p>
              </div>
            </div>
          </FormRowItem>

          <FormRowItem>
            <div className={styles.unlockContent}>
              <h4>UNLOCK ALL CONTENT</h4>
              <p>&#10003; Photos &#10003; Videos &#10003; Live TV &#10003; Chat </p>
            </div>
          </FormRowItem>

          <FormRowItem>
            <SelectForm
              id="subscription-price"
              name="subscription_price"
              placeholder="Subscrition time"
              options={planList}
              value={selectedPlan ? selectedPlan?.id : ''}
              onChange={handlePlanOptionChange}
            />
          </FormRowItem>

          <FormRowItem>
            <div className={styles.resumeContainer}>
              <p>
                <strong>Tax: </strong> $1.05 USD
              </p>
              <p>
                <strong>Total: </strong> ${selectedPlan?.amount} {selectedPlan?.currency}
              </p>
            </div>
          </FormRowItem>

          <FormRow>
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={loading}>
              Pay now
            </ButtonWithLoader>
          </FormRow>
        </form>
      </div>
    </>
  )
}

export default SubscribePopup
