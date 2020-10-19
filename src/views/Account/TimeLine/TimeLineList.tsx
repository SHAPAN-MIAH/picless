import React, { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UserTimeLineType } from '../../../types/UserType.d'

// import TextArea from '../../../components/Common/TextArea'
// import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import Alert from '../../../components/Common/Alerts/Alerts'
// import AddInterest from './AddInterest'

// interface InterestProps {
//   item: UserInterestType
// }

// const Interest: FunctionComponent<InterestProps> = (props) => {
//   const { item } = props

//   return (
//     <>
//       <FormItem>
//         <TextArea
//           type="text"
//           id={`interest-${item.id}`}
//           classNameFormInput="small full"
//           name={`interest_${item.id}`}
//           placeholder={item.name}
//           defaultValue={item.description}
//         />
//       </FormItem>
//     </>
//   )
// }

const TimeLineList: FunctionComponent<{ list: UserTimeLineType[] }> = (props) => {
  const { t } = useTranslation()

  const [addTimeLine, setAddTimeLine] = useState(false)

  const { list } = props

  // let interests: any[] = []
  const content: any[] = []

  // list.map((item, index): void => {
  //   // interests.push(<Interest item={item} />)
  //   // if ((index + 1) % 2 === 0) {
  //   //   content.push(<FormRow classNameRow="split">{interests}</FormRow>)
  //   //   interests = []
  //   // }
  // })

  const showAddTimeLine = () => {
    // setAddTimeLine(!addInterest)
  }

  return (
    <>
      <div className="widget-box">
        <p className="widget-box-title">{t('profileInfo.interestTitle')}</p>

        <div className="widget-box-content">
          {content}

          {list.length === 0 && (
            <FormRow>
              <Alert alertType="PRIMARY" message={t('profileInfo.interests.hasNoInterests')} style={{ width: '100%' }} />
            </FormRow>
          )}

          {/* {addTimeLine && (
            <AddInterest
              onAdd={() => {
                setAddInterest(false)
              }}
            />
          )} */}

          {!addTimeLine && (
            <FormRow>
              <ButtonWithLoader
                type="button"
                className="small white"
                style={{ width: '128px' }}
                onClick={showAddTimeLine}
                showLoader={false}
              >
                {`+ ${t('profileInfo.timeline.addNewEvent')}`}
              </ButtonWithLoader>
            </FormRow>
          )}
        </div>
      </div>
    </>
  )
}

export default TimeLineList
