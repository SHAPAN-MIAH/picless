import React, { FunctionComponent, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'

import { userSelector } from '../../../../redux/User/UserSelectors'

import ButtonWithLoader from '../../../../components/Common/ButtonWithLoader'
import FormRow from '../../../../components/Common/Form/FormRow'
import FormRowItem from '../../../../components/Common/Form/FormRowItem'
import UserAvatar from '../../../../components/UserAvatar'
import SelectForm, { SelectOptionsType } from '../../../../components/Common/SelectForm'

import { UserType } from '../../../../types/UserType.d'
import { PlansType, SubscritionPlanOption } from '../../../../types/PaymentTypes.d'

import styles from './SubscribePopup.module.css'
import PaymentService from '../../../../services/PaymentService'

const SubscribePopup: FunctionComponent<{}> = () => {
  const userData: UserType = useSelector(userSelector)

  const [imageProfile, setImageProfile] = useState(userData.profilePicture)
  const [selectedPlan, setSelectedPlan] = useState<SubscritionPlanOption>()
  const [planListOriginal, setPlanListOriginal] = useState<SubscritionPlanOption[]>([])

  const [planList, setPlanList] = useState<SelectOptionsType[]>([{ value: '0', name: 'Loading ...' }])

  useEffect(() => {
    setImageProfile(userData.profilePicture)

    PaymentService.getPlanOptions((userData.planId = '')).then((plans: SubscritionPlanOption[]) => {
      setPlanListOriginal(plans)
      plansOptionsList(plans)
    })
  }, [])

  const plansOptionsList = (plans: SubscritionPlanOption[]): void => {
    setPlanList(
      plans.map((data: PlansType) => {
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

  const handleSubmit = () => {}

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
                  <span className="bold">{userData.fullName}</span>
                </p>
                <p className="user-status-text small">
                  <a href="profile-timeline.html">@{userData.userName}</a>
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
            <ButtonWithLoader type="submit" className="button small secondary" showLoader={false}>
              Pay now
            </ButtonWithLoader>
          </FormRow>
        </form>
      </div>
    </>
  )
}

export default SubscribePopup
