import React, { FunctionComponent } from 'react'
import DatePickerForm from '../../../../components/Common/DatePickerForm/DatePickerForm'

import styles from './ScheduleMessage.module.css'

type ScheduleMessageProps = {
  startDate: (value: Date) => void
  endDate: (value: Date) => void
}

const ScheduleMessage: FunctionComponent<ScheduleMessageProps> = (props) => {
  const { startDate, endDate } = props
  return (
    <div className={styles.container}>
      <DatePickerForm
        classNameFormInput={styles.datepicker}
        placeholderText="Start"
        customInputRef="startDateRef"
        selected={new Date()}
        minDate={new Date()}
        onChange={(date: any) => startDate(date)}
      />
      <DatePickerForm
        classNameFormInput={styles.datepicker}
        placeholderText="End"
        customInputRef="endDateRef"
        selected={new Date()}
        minDate={new Date()}
        onChange={(date: any) => endDate(date)}
      />
    </div>
  )
}

export default ScheduleMessage
