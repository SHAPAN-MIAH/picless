import React, { FunctionComponent } from 'react'

import { useTranslation } from 'react-i18next'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import SelectForm, { SelectOptionsType } from '../../../components/Common/SelectForm'

import { UserTimeLineType } from '../../../types/UserType.d'

type TimeLineEventProps = {
  item: UserTimeLineType
  years: SelectOptionsType[]
}

const TimeLineEvent: FunctionComponent<TimeLineEventProps> = (props) => {
  const { t } = useTranslation()

  const { item, years } = props

  return (
    <>
      <FormRow classNameRow="split">
        <FormItem>
          <TextInput
            type="text"
            id={`timeline-event-title-${item.id}`}
            classNameFormInput="small"
            name={`timeline_event_title_${item.id}`}
            placeholder={t('profileInfo.timeline.addNewTitleTimelineEventField')}
            value={item.title}
            readOnly
          />
        </FormItem>
        <FormRow classNameRow="split">
          <FormItem>
            <SelectForm
              id={`timeline-event-year-started-${item.id}`}
              name={`timeline_event_year_started-${item.id}`}
              placeholder={t('profileInfo.timeline.newYearStarted')}
              options={years}
              value={item.yearSarted}
              readOnly
            />
          </FormItem>
          <FormItem>
            <SelectForm
              id={`timeline-event-year-ended-${item.id}`}
              name={`timeline_event_year_ended-${item.id}`}
              placeholder={t('profileInfo.timeline.newYearEnded')}
              options={years}
              value={item.yearEnded}
              readOnly
            />
          </FormItem>
        </FormRow>
      </FormRow>
      <FormRow>
        <FormItem>
          <TextArea
            type="text"
            id={`timeline-event-description-${item.id}`}
            classNameFormInput="small full"
            name={`timeline_event_description_${item.id}`}
            placeholder={t('profileInfo.timeline.addNewDescriptionEventField')}
            value={item.description}
            readOnly
          />
        </FormItem>
      </FormRow>
    </>
  )
}

export default TimeLineEvent
