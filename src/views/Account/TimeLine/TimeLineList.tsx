import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormRow from '../../../components/Common/Form/FormRow'
import StyledPopup from '../../../components/StyledPopup/StyledPopup'
import useUser from '../../../hooks/useUser'
import { UserTimeLineType } from '../../../types/UserType.d'
import { simpleKeyGenerator } from '../../../utils/Functions'
import AddOrEditTimeLineEvent from './AddOrEditTimeLineEvent'
import TimeLineEvent from './TimeLineEvent'

const TimeLineList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { user, updateUser } = useUser()

  const [addOrEditTimeLine, setAddOrEditTimeLine] = useState(false)
  const [timeLineList, setTimeLineList] = useState<UserTimeLineType[]>([])
  const [timeLineEdit, setTimeLineEdit] = useState<number>(-1)

  useEffect(() => {
    setTimeLineList(user.userTimeLine || [])
  }, [user, setTimeLineList])

  const onDelete = useCallback((interestId: number) => {
    const dataToSubmit = { userTimeLine: user.userTimeLine?.filter((i) => i.id !== interestId) }

    const toastOptions = {
      loading: 'Saving account information ...',
      success: 'The account information has been successfully saved',
      error: 'Error Saving the account information',
    }

    return updateUser(dataToSubmit, toastOptions)
  }, [])

  const renderContent = () => {
    if (timeLineList && timeLineList.length > 0) {
      return timeLineList.map((row) => {
        const temporaryKey = simpleKeyGenerator(5)

        return (
          <div key={temporaryKey}>
            <TimeLineEvent
              item={row}
              onEdit={() => {
                setTimeLineEdit(row.id || -1)
                showAddOrEditTimeLine()
              }}
              onDelete={onDelete}
            />
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

  const showAddOrEditTimeLine = () => {
    setAddOrEditTimeLine(!addOrEditTimeLine)
  }

  return (
    <>
      {renderContent()}

      <StyledPopup
        header={timeLineEdit && timeLineEdit !== -1 ? 'Edit Event' : 'New Event'}
        size="M"
        show={addOrEditTimeLine}
        trigger={
          <FormRow>
            <ButtonWithLoader
              type="button"
              className="small white"
              style={{ width: '128px' }}
              onClick={showAddOrEditTimeLine}
              showLoader={false}
            >
              {`+ ${t('profileInfo.timeline.addNewEvent')}`}
            </ButtonWithLoader>
          </FormRow>
        }
        onClose={() => {
          showAddOrEditTimeLine()
          setTimeLineEdit(-1)
        }}
      >
        <AddOrEditTimeLineEvent
          years={years}
          onAdd={() => {
            setAddOrEditTimeLine(false)
            setTimeLineEdit(-1)
          }}
          edit={timeLineEdit}
        />
      </StyledPopup>
    </>
  )
}

export default TimeLineList
