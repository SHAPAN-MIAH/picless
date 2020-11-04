import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { userTimelineSelector } from '../../../redux/User/UserSelectors'

import FormRow from '../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import TimeLineEvent from './TimeLineEvent'
import AddTimeLineEvent from './AddTimeLineEvent'

import { UserTimeLineType } from '../../../types/UserType.d'
import { simpleKeyGenerator } from '../../../utils/Functions'

const TimeLineList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const [addTimeLine, setAddTimeLine] = useState(false)

  const userTimeLineList: UserTimeLineType[] = useSelector(userTimelineSelector)

  const renderContent = () => {
    if (userTimeLineList && userTimeLineList.length > 0) {
      return userTimeLineList.map((row) => {
        const temporaryKey = simpleKeyGenerator(5)

        return (
          <>
            <TimeLineEvent key={row.id || temporaryKey} item={row} years={years} />
            <div style={{ borderTop: '1px solid #eaeaf5', marginTop: '30px', marginBottom: '35px' }} />
          </>
        )
      })
    }

    return <></>
  }

  const loadYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    let startYear = 1980

    while (startYear <= currentYear + 1) {
      startYear += 1
      const year = startYear.toString()
      years.push({ value: year, name: year })
    }

    return years
  }

  const years = loadYears()

  return (
    <>
      {renderContent()}

      {addTimeLine && (
        <AddTimeLineEvent
          onAdd={() => {
            setAddTimeLine(false)
          }}
          years={years}
        />
      )}

      {!addTimeLine && (
        <FormRow>
          <ButtonWithLoader
            type="button"
            className="small white"
            style={{ width: '128px' }}
            onClick={() => {
              setAddTimeLine(!addTimeLine)
            }}
            showLoader={false}
          >
            {`+ ${t('profileInfo.timeline.addNewEvent')}`}
          </ButtonWithLoader>
        </FormRow>
      )}
    </>
  )
}

export default TimeLineList
