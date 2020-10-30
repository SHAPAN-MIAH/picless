import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import DatePickerForm from '../../../../components/Common/DatePickerForm/DatePickerForm'

import styles from './ScheduleMessage.module.css'

type ScheduleMessageProps = {
  startDate: (value: Date) => void
  endDate: (value: Date) => void
}

const ScheduleMessage: FunctionComponent<ScheduleMessageProps> = (props) => {
  const { t } = useTranslation()

  const { startDate, endDate } = props
  return (
    <div className={styles.container}>
      <DatePickerForm
        classNameFormInput={styles.datepicker}
        placeholderText={t('home.createPost.fields.scheduleStart')}
        customInputRef="startDateRef"
        selected={new Date()}
        minDate={new Date()}
        onChange={(date: any) => startDate(date)}
      />
      <DatePickerForm
        classNameFormInput={styles.datepicker}
        placeholderText={t('home.createPost.fields.scheduleEnd')}
        customInputRef="endDateRef"
        selected={new Date()}
        minDate={new Date()}
        onChange={(date: any) => endDate(date)}
      />
    </div>
  )
}

export default ScheduleMessage
