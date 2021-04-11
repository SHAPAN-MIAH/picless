import classNames from 'classnames'
import FormItem from 'components/Common/Form/FormItem'
import FormRow from 'components/Common/Form/FormRow'
import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePickerForm from '../../../../components/Common/DatePickerForm/DatePickerForm'

import styles from './ScheduleMessage.module.css'

interface ScheduleMessageProps extends React.BaseHTMLAttributes<HTMLDivElement> {
  onApplySchedule: (startDate: Date) => void
}

const ScheduleMessage: FunctionComponent<ScheduleMessageProps> = (props) => {
  const { onApplySchedule, className } = props
  const { t } = useTranslation()
  const [startDate, setStartDate] = useState(new Date())

  const onApply = () => {
    if (startDate) onApplySchedule(startDate)
  }

  return (
    <>
      <FormRow className={classNames(className)}>
        <FormItem>
          <div className={styles.container}>
            <DatePickerForm
              classNameFormInput={styles.datepicker}
              placeholderText={t('home.createPost.fields.scheduleStart')}
              customInputRef="startDateRef"
              selected={startDate}
              minDate={new Date()}
              timeInputLabel="Time:"
              showTimeInput
              dateFormat="dd/MM/yyyy h:mm aa"
              onChange={(date: Date) => setStartDate(date)}
            />

            <button type="button" className="button small" style={{ width: '100px', marginTop: '6px' }} onClick={onApply}>
              Apply
            </button>
          </div>
        </FormItem>
      </FormRow>
    </>
  )
}

export default ScheduleMessage
