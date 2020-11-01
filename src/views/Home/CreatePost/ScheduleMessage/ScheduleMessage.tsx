import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePickerForm from '../../../../components/Common/DatePickerForm/DatePickerForm'

import styles from './ScheduleMessage.module.css'

type ScheduleMessageProps = {
  onApplySchedule: (startDate: Date | null, endDate: Date | null) => void
}

const ScheduleMessage: FunctionComponent<ScheduleMessageProps> = (props) => {
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const { onApplySchedule } = props

  const onApply = () => {
    if (startDate && endDate) onApplySchedule(startDate, endDate)
  }

  return (
    <>
      <h6 style={{ marginLeft: '20px' }}>Schedule post</h6>
      <div className={styles.container}>
        <DatePickerForm
          classNameFormInput={styles.datepicker}
          placeholderText={t('home.createPost.fields.scheduleStart')}
          customInputRef="startDateRef"
          selected={startDate}
          minDate={new Date()}
          onChange={(date: any) => setStartDate(date)}
        />
        <DatePickerForm
          classNameFormInput={styles.datepicker}
          placeholderText={t('home.createPost.fields.scheduleEnd')}
          customInputRef="endDateRef"
          selected={endDate}
          minDate={new Date()}
          onChange={(date: any) => setEndDate(date)}
        />
        <button type="button" className="button small" style={{ width: '100px', marginTop: '6px' }} onClick={onApply}>
          Apply
        </button>
      </div>
    </>
  )
}

export default ScheduleMessage
