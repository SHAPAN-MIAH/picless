import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StyledPopup from 'components/StyledPopup/StyledPopup'
import useWallet from 'hooks/useWallet'
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import ButtonWithLoader from '../../../../../components/Common/ButtonWithLoader'
import FormRow from '../../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../../components/Common/Form/FormRowItem'
import SelectForm, { SelectOptionsType } from '../../../../../components/Common/SelectForm'
import UserAvatar from '../../../../../components/UserAvatar'
import ProviderProfileContext from '../../../../../context/ProviderProfileContext'
import PaymentService from '../../../../../services/PaymentService'
import { ServiceSubscritionPlanOption, SubscritionPlanOption } from '../../../../../types/PaymentTypes'
import styles from './SubscribePopup.module.css'

const LoadingPlanOptionsDiv = styled.div`
  border: 1px #3e3f5e;
  height: 40px;
  text-align: center;
`

const PopupMessage: FunctionComponent<{}> = () => {
  return (
    <>
      <StyledPopup show trigger={<></>} onClose={() => {}}>
        <h4>asdfasfasfasdf</h4>
      </StyledPopup>
    </>
  )
}

const SubscribePopup: FunctionComponent<{ onClose: () => void }> = (props) => {
  const { onClose } = props
  const { provider } = useContext(ProviderProfileContext.context)
  const { getPlanOptions } = useWallet()

  const [imageProfile, setImageProfile] = useState(provider.profilePicture)
  const [selectedPlan, setSelectedPlan] = useState<SubscritionPlanOption>()
  const [planList, setPlanList] = useState<SelectOptionsType[]>([{ value: '0', name: 'Loading ...' }])
  const [tax, setTax] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const planListOriginal = useRef<SubscritionPlanOption[]>([])

  const controllerCancelable = new AbortController()
  const { signal } = controllerCancelable

  useEffect(() => {
    if (provider) {
      setLoading(true)
      setImageProfile(provider.profilePicture)

      const { userName } = provider

      getPlanOptions(userName || '', signal)
        .then((data: ServiceSubscritionPlanOption) => {
          if (data.code === '0') {
            planListOriginal.current = data.data

            plansOptionsList(data.data)

            setSelectedPlan(data.data[0])
            setTax(data.tax)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return () => {
      controllerCancelable.abort()
    }
  }, [provider])

  const plansOptionsList = (plans: SubscritionPlanOption[]): void => {
    setPlanList(
      plans.map((data: any) => {
        return { value: data.id, name: `${data.intervalCount} ${data.interval} - (${data.currency} ${data.amount})` }
      })
    )
  }

  const handlePlanOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const plans = planListOriginal.current
    const planSelected = plans.find((plan: any) => plan.id === parseInt(e.target.value, 10))

    if (planSelected) {
      setSelectedPlan(planSelected)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    subscribeToUser('', 0)
    setLoading(false)
  }

  const subscribeToUser = (token: any, amount: number) => {
    if (provider.id && provider.planId && selectedPlan) {
      toast.loading('Loading ...')
      PaymentService.suscribeToUser(selectedPlan?.planId, provider.id, 'securionpay', token.id, amount)
        .then((data: any) => {
          if (data.code === 0) {
            setLoading(false)

            onClose()
            window.location.reload()
          } else {
            setLoading(false)
            toast.error(data.message)
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
        <div
          className={styles.closePopup}
          onClick={() => {
            onClose()
          }}
        >
          <FontAwesomeIcon icon="times" color="white" size="1x" />
        </div>

        <div className={styles.headerTip}>
          <h6>Subscribe</h6>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <FormRowItem>
            <div className={styles.userInfoContainer}>
              <div className={styles.userInfoImage}>
                <UserAvatar size="M" imageName={imageProfile} removeContainerStyle />
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
            {loading && (
              <LoadingPlanOptionsDiv>
                <span>Loading...</span>
              </LoadingPlanOptionsDiv>
            )}
            {!loading && (
              <SelectForm
                id="subscription-price"
                name="subscription_price"
                placeholder="Subscrition time"
                options={planList}
                defaultValue={planList[0].value}
                onChange={handlePlanOptionChange}
              />
            )}
          </FormRowItem>

          <FormRowItem>
            <div className={styles.resumeContainer}>
              <p>
                <strong>Price: </strong> {selectedPlan?.amount} {selectedPlan?.currency.toLocaleUpperCase()}
              </p>
              <p>
                <strong>Tax: </strong> {(selectedPlan?.amount || 0) * tax} {selectedPlan?.currency.toLocaleUpperCase()}
              </p>
              <p>
                <strong>Total: </strong> {((selectedPlan?.amount || 0) * (tax + 1)).toFixed(2)}{' '}
                {selectedPlan?.currency.toLocaleUpperCase()}
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
