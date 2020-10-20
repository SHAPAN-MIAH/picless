import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import _ from 'lodash'

import { userInterestSelector } from '../../../redux/User/UserSelectors'

import { UserInterestType } from '../../../types/UserType.d'

import TextArea from '../../../components/Common/TextArea'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import Alert from '../../../components/Common/Alerts/Alerts'
import AddInterest from './AddInterest'

interface InterestProps {
  item: UserInterestType
}

const Interest: FunctionComponent<InterestProps> = (props) => {
  const { item } = props

  return (
    <>
      <FormItem>
        <TextArea
          type="text"
          id={`interest-${item.id}`}
          classNameFormInput="small full"
          name={`interest_${item.id}`}
          placeholder={item.name}
          defaultValue={item.description}
        />
      </FormItem>
    </>
  )
}

const InterestList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const interestList: UserInterestType[] = useSelector(userInterestSelector)

  const [addInterest, setAddInterest] = useState(false)

  const renderContent = () => {
    const interestSplitted = _.chunk(interestList, 2)

    return interestSplitted.map((row) => {
      return (
        <FormRow classNameRow="split">
          {row.map((interest) => {
            return <Interest item={interest} />
          })}
        </FormRow>
      )
    })
  }

  const showAddInterest = () => {
    setAddInterest(!addInterest)
  }

  return (
    <>
      <div className="widget-box">
        <p className="widget-box-title">{t('profileInfo.interestTitle')}</p>

        <div className="widget-box-content">
          {renderContent()}

          {interestList.length === 0 && (
            <FormRow>
              <Alert alertType="PRIMARY" message={t('profileInfo.interests.hasNoInterests')} style={{ width: '100%' }} />
            </FormRow>
          )}

          {addInterest && (
            <AddInterest
              onAdd={() => {
                setAddInterest(false)
              }}
            />
          )}

          {!addInterest && (
            <FormRow>
              <ButtonWithLoader
                type="button"
                className="small white"
                style={{ width: '128px' }}
                onClick={showAddInterest}
                showLoader={false}
              >
                {`+ ${t('profileInfo.interests.addNewInterest')}`}
              </ButtonWithLoader>
            </FormRow>
          )}
        </div>
      </div>
    </>
  )
}

export default InterestList
