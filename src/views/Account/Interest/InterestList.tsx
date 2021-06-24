import _ from 'lodash'
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'
import FormItem from '../../../components/Common/Form/FormItem'
import FormRow from '../../../components/Common/Form/FormRow'
import TextArea from '../../../components/Common/TextArea'
import StyledPopup from '../../../components/StyledPopup/StyledPopup'
import useUser from '../../../hooks/useUser'
import { UserInterestType } from '../../../types/UserType'
import * as Utils from '../../../utils/Functions'
import AddOrEditInterest from './AddOrEditInterest'

interface InterestProps {
  item: UserInterestType
  onEdit: () => void
  onDelete: (interestId: number) => void
}

const InterestControlsDiv = styled.div`
  text-align: right;
`

const ButtonControlDiv = styled.a`
  padding: 10px;
  font-size: 14px;
`

const Interest: FunctionComponent<InterestProps> = (props) => {
  const { item, onEdit, onDelete } = props

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

            onDelete(item.id || -1)
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

  const { user, updateUser } = useUser()

  const [interestList, setInterestList] = useState<UserInterestType[]>([])

  const [addOrEditInterest, setAddOrEditInterest] = useState(false)
  const [interestEdit, setInterestEdit] = useState<number>(-1)

  useEffect(() => {
    setInterestList(user.userInterest || [])
  }, [user, setInterestList])

  const onDelete = useCallback(
    (interestId: number) => {
      const dataToSubmit = { userInterest: user.userInterest?.filter((i) => i.id !== interestId) }

      const toastOptions = {
        loading: 'Saving account information ...',
        success: 'The account information has been successfully saved',
        error: 'Error Saving the account information',
      }

      return updateUser(dataToSubmit, toastOptions)
    },
    [user.userInterest, updateUser]
  )

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
                    onDelete={onDelete}
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
        header={interestEdit && interestEdit !== -1 ? 'Edit Interest' : 'New Interest'}
        show={addOrEditInterest}
        size="M"
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
