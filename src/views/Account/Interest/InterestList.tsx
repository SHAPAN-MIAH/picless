import StyledPopup from 'components/StyledPopup/StyledPopup'
import _ from 'lodash'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import useUser from '../../../hooks/useUser'
import { UserInterestType, UserType } from '../../../types/UserType.d'
import * as Utils from '../../../utils/Functions'
import AddOrEditInterest from './AddOrEditInterest'

interface InterestProps {
  item: UserInterestType
  onEdit: () => void
}

const InterestControlsDiv = styled.div`
  text-align: right;
`

const ButtonControlDiv = styled.a`
  padding: 10px;
`

const Interest: FunctionComponent<InterestProps> = (props) => {
  const { item, onEdit } = props

  return (
    <FormItem>
      <TextArea
        type="text"
        id={`interest-${item.id}`}
        classNameFormInput="small full"
        name={`interest_${item.id}`}
        placeholder={item.name}
        value={item.description || ''}
        style={{ marginBottom: '0', height: '88%' }}
        readOnly
      />
      <InterestControlsDiv>
        <ButtonControlDiv
          href=""
          onClick={(e) => {
            e.preventDefault()

            onEdit()
          }}
        >
          edit
        </ButtonControlDiv>
        <ButtonControlDiv
          href=""
          onClick={(e) => {
            e.preventDefault()

            onEdit()
          }}
        >
          delete
        </ButtonControlDiv>
      </InterestControlsDiv>
    </FormItem>
  )
}

const InterestList: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getUser } = useUser()

  const [interestList, setInterestList] = useState<UserInterestType[]>([])

  const [addOrEditInterest, setAddOrEditInterest] = useState(false)
  const [interestEdit, setInterestEdit] = useState<number>(-1)

  useEffect(() => {
    getUser().then((user: UserType) => {
      setInterestList(user.userInterest || [])
    })
  }, [getUser, setInterestList])

  const renderContent = () => {
    if (interestList && interestList.length > 0) {
      const interestSplitted = _.chunk(interestList, 2)
      return interestSplitted.map((row) => {
        const key = Utils.simpleKeyGenerator(5)

        return (
          <div key={key}>
            <FormRow classNameRow="split">
              {row.map((interest) => {
                const intKey = Utils.simpleKeyGenerator(5)
                return (
                  <Interest
                    key={intKey}
                    item={interest}
                    onEdit={() => {
                      setInterestEdit(interest.id || -1)
                      showAddOrEditInterest()
                    }}
                  />
                )
              })}
            </FormRow>
            <div style={{ borderTop: '1px solid #eaeaf5', marginTop: '15px', marginBottom: '15px' }} />
          </div>
        )
      })
    }

    return <></>
  }

  const showAddOrEditInterest = () => {
    setAddOrEditInterest(!addOrEditInterest)
  }

  return (
    <>
      {renderContent()}

      <StyledPopup
        header="New Interest"
        show={addOrEditInterest}
        trigger={
          <FormRow>
            <ButtonWithLoader
              type="button"
              className="small white"
              style={{ width: '128px' }}
              onClick={showAddOrEditInterest}
              showLoader={false}
            >
              {`+ ${t('profileInfo.interests.addNewInterest')}`}
            </ButtonWithLoader>
          </FormRow>
        }
        onClose={() => {
          showAddOrEditInterest()
          setInterestEdit(-1)
        }}
      >
        <AddOrEditInterest
          onAdd={() => {
            setAddOrEditInterest(false)
            setInterestEdit(-1)
          }}
          edit={interestEdit}
        />
      </StyledPopup>
    </>
  )
}

export default InterestList
