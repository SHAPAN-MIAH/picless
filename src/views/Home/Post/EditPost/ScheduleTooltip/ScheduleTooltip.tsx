import classNames from 'classnames'
import CheckboxForm from 'components/Common/CheckboxForm'
import DatePickerForm from 'components/Common/DatePickerForm/DatePickerForm'
import FormItem from 'components/Common/Form/FormItem'
import FormRow from 'components/Common/Form/FormRow'
import FormRowItem from 'components/Common/Form/FormRowItem'
import TextInput from 'components/Common/TextInput'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Popup from 'reactjs-popup'
import styled from 'styled-components'

const TooltipContainerDiv = styled.div`
  padding: 10px;
`

interface ScheduleTooltipProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  onApplySchedule: (value: Date) => void
  name: string
  scheduleDate?: Date
}

const ScheduleTooltip: FunctionComponent<ScheduleTooltipProps> = (props) => {
  const { onApplySchedule, name, scheduleDate } = props

  const { t } = useTranslation()

  const [schedule, setSchedule] = useState<Date>()

  const onApply = (close: () => void) => {
    if (schedule) {
      close()
      onApplySchedule(schedule)
    }
  }

  useEffect(() => {
    if (scheduleDate) {
      setSchedule(scheduleDate)
    }
  }, [])

  return (
    <>
      <Popup
        trigger={
          <div className="quick-post-footer-action">
            <svg className="menu-item-link-icon icon-events">
              <use xlinkHref="#svg-events" />
            </svg>
          </div>
        }
        position="bottom center"
        closeOnDocumentClick
        contentStyle={{ zIndex: 9999 }}
      >
        {(close: any) => {
          return (
            <>
              <TooltipContainerDiv>
                <FormRowItem>
                  <DatePickerForm
                    // classNameFormInput={styles.datepicker}
                    placeholderText={t('home.createPost.fields.scheduleStart')}
                    customInputRef="startDateRef"
                    selected={schedule}
                    minDate={new Date()}
                    timeInputLabel="Time:"
                    showTimeInput
                    dateFormat="dd/MM/yyyy h:mm aa"
                    name={name}
                    onChange={(date: Date) => setSchedule(date)}
                  />
                </FormRowItem>
                <FormRowItem>
                  <button
                    type="button"
                    className="button small primary"
                    onClick={() => {
                      onApply(close)
                    }}
                  >
                    Apply
                  </button>
                </FormRowItem>
              </TooltipContainerDiv>
            </>
          )
        }}
      </Popup>
    </>
  )
}

export default ScheduleTooltip
