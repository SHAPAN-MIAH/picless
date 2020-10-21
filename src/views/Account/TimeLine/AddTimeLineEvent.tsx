import React, { FunctionComponent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { userSelector } from '../../../redux/User/UserSelectors'
import { addTimelineEvent } from '../../../redux/User/UserThunks'

import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import TextInput from '../../../components/Common/TextInput'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import SelectForm, { SelectOptionsType } from '../../../components/Common/SelectForm'

import { UserType, UserTimeLineType } from '../../../types/UserType.d'

const AddTimeLineEvent: FunctionComponent<{ onAdd: () => void; years: SelectOptionsType[] }> = (props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const userData: UserType = useSelector(userSelector)

  const { onAdd, years } = props

  const [timelineEventTitle, setTimelineEventTitle] = useState('')
  const [timelineEventStarted, setTimelineEventStarted] = useState('0')
  const [timelineEventEnded, setTimelineEventEnded] = useState('0')
  const [timelineEventDescription, setTimelineEventDescription] = useState('')

  const onAddInterest = () => {
    const timelineEvent: UserTimeLineType = {
      userId: userData.id,
      title: timelineEventTitle,
      yearSarted: timelineEventStarted,
      yearEnded: timelineEventEnded,
      description: timelineEventDescription,
    }

    dispatch(addTimelineEvent(timelineEvent))
    onAdd()
  }

  return (
    <>
      <FormRow classNameRow="split">
        <FormItem>
          <TextInput
            type="text"
            id="tag-line"
            classNameFormInput="small"
            name="tag_line"
            placeholder={t('profileInfo.timeline.addNewTitleTimelineEventField')}
            defaultValue={timelineEventTitle}
            onChange={(e) => setTimelineEventTitle(e.target.value)}
          />
        </FormItem>
        <FormRow classNameRow="split">
          <FormItem>
            <SelectForm
              id="timeline-new-year-started"
              name="timeline_new_year_started"
              placeholder={t('profileInfo.timeline.newYearStarted')}
              options={years}
              defaultValue={timelineEventDescription}
              onChange={(e) => setTimelineEventStarted(e.target.value)}
            />
          </FormItem>
          <FormItem>
            <SelectForm
              id="timeline_new_year_started"
              name="timeline_new_year_started"
              placeholder={t('profileInfo.timeline.newYearEnded')}
              options={years}
              defaultValue={timelineEventEnded}
              onChange={(e) => setTimelineEventEnded(e.target.value)}
            />
          </FormItem>
        </FormRow>
      </FormRow>
      <FormRow>
        <FormItem>
          <TextArea
            type="text"
            id="timeline-1"
            classNameFormInput="small full"
            name="account_url_username"
            placeholder={t('profileInfo.timeline.addNewDescriptionEventField')}
            defaultValue={timelineEventDescription}
            onChange={(e) => setTimelineEventDescription(e.target.value)}
          />
        </FormItem>
      </FormRow>
      <FormRow classNameRow="split">
        <FormItem>
          <ButtonWithLoader type="button" className="small white" onClick={() => onAdd()} showLoader={false}>
            {`+ ${t('profileInfo.timeline.cancelNewTimeLineEvent')}`}
          </ButtonWithLoader>
        </FormItem>
        <FormItem>
          <ButtonWithLoader type="button" className="small secondary" onClick={onAddInterest} showLoader={false}>
            {`+ ${t('profileInfo.timeline.addNewTimeLineEvent')}`}
          </ButtonWithLoader>
        </FormItem>
      </FormRow>
    </>
  )
}

export default AddTimeLineEvent
