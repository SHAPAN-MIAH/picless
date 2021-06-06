import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Alert from 'components/Common/Alerts/Alerts'
import StyledPopup from 'components/StyledPopup/StyledPopup'
import useAuth from 'hooks/useAuth'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import UserService from 'services/UserService'
import styled from 'styled-components'

import ButtonWithLoader from '../../../components/Common/ButtonWithLoader'

const TextContainerP = styled.p`
  margin: 10px;
  padding: 10px;
`

const DeleteAccount: FunctionComponent<{}> = () => {
  const { t } = useTranslation()
  const { signOut } = useAuth()

  const onDeleteAccount = () => {
    UserService.deleteAccount().then(() => {
      signOut()
    })
  }

  return (
    <div className="account-hub-content">
      <div className="section-header">
        <div className="section-header-info">
          <h2 className="section-title">{t('accountInfo.deleteAccount')}</h2>
        </div>
      </div>

      <div className="grid-column">
        <div className="widget-box">
          <div className="widget-box-content">
            <TextContainerP>Once you delete your account, there is no going back. Please be certain.</TextContainerP>
            <StyledPopup
              header="Are you sure you want to do this?"
              size="S"
              trigger={
                <ButtonWithLoader type="button" className="small" showLoader={false} style={{ backgroundColor: 'tomato' }}>
                  {t('accountInfo.deleteAccount')}
                </ButtonWithLoader>
              }
            >
              <Alert alertType="DANGER" style={{ width: '100%' }}>
                <FontAwesomeIcon icon="exclamation-triangle" /> This is extremely important.
              </Alert>

              <TextContainerP>
                We will delete all of your account, along with all of your posts, photos, videos, lives, etc.
              </TextContainerP>

              <ButtonWithLoader
                type="button"
                className="small"
                onClick={onDeleteAccount}
                showLoader={false}
                style={{ backgroundColor: 'tomato' }}
              >
                Delete
              </ButtonWithLoader>
            </StyledPopup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteAccount
