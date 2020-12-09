import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import _ from 'lodash'

import { userInterestSelector } from '../../../redux/User/UserSelectors'

import * as Utils from '../../../utils/Functions'

import TextArea from '../../../components/Common/TextArea'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import AddInterest from './AddInterest'

import { UserInterestType } from '../../../types/UserType.d'

interface InterestProps {
  item: UserInterestType
}

const Interest: FunctionComponent<InterestProps> = (props) => {
  const { item } = props

  return (
    <FormItem>
      <TextArea
        type="text"
        id={`interest-${item.id}`}
        classNameFormInput="small full"
        name={`interest_${item.id}`}
        placeholder={item.name}
        value={item.description || ''}
        readOnly
      />
    </FormItem>
  )
}

const InterestList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const interestList: UserInterestType[] = useSelector(userInterestSelector)

  const [addInterest, setAddInterest] = useState(false)

  const renderContent = () => {
    if (interestList && interestList.length > 0) {
      const interestSplitted = _.chunk(interestList, 2)
      return interestSplitted.map((row) => {
        const key = Utils.simpleKeyGenerator(5)

        return (
          <div key={key}>
            <FormRow classNameRow="split">
              {row.map((interest) => {
                const intKey = Utils.simpleKeyGenerator(5)
                return <Interest key={intKey} item={interest} />
              })}
            </FormRow>
            <div style={{ borderTop: '1px solid #eaeaf5', marginTop: '15px', marginBottom: '15px' }} />
          </div>
        )
      })
    }

    return <></>
  }

  const showAddInterest = () => {
    setAddInterest(!addInterest)
  }

  return (
    <>
      {renderContent()}

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
    </>
  )
}

export default InterestList
