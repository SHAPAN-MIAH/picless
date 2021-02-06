import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import FormRow from '../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

import TimeLineEvent from './TimeLineEvent'
import AddTimeLineEvent from './AddTimeLineEvent'

import { UserTimeLineType, UserType } from '../../../types/UserType.d'
import { simpleKeyGenerator } from '../../../utils/Functions'
import useUser from '../../../hooks/useUser'

const TimeLineList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getUser } = useUser()

  const [addTimeLine, setAddTimeLine] = useState(false)
  const [timeLineList, setTimeLineList] = useState<UserTimeLineType[]>([])

  useEffect(() => {
    getUser().then((user: UserType) => {
      setTimeLineList(user.userTimeLine || [])
    })
  }, [getUser, setTimeLineList])

  const renderContent = () => {
    if (timeLineList && timeLineList.length > 0) {
      return timeLineList.map((row) => {
        const temporaryKey = simpleKeyGenerator(5)

        return (
          <div key={temporaryKey}>
            <TimeLineEvent item={row} />
            <div style={{ borderTop: '1px solid #eaeaf5', marginTop: '30px', marginBottom: '35px' }} />
          </div>
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
