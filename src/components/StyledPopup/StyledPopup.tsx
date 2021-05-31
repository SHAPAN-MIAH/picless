import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, ReactNode } from 'react'
import { isMobile } from 'react-device-detect'
import Popup from 'reactjs-popup'
import { PopupProps } from 'reactjs-popup/dist/types'
import styled from 'styled-components'
import styles from './StyledPopup.module.css'

type SizeType = 'S' | 'M'

type StyledPopupProps = {
  trigger?: JSX.Element
  children: ReactNode
  show?: boolean
  onClose?: () => void
  header?: string
  size?: SizeType
}

const ContainerMobileDiv = styled.div`
  max-height: calc(100vh - 210px);
  position: relative;
  overflow: auto;
`

const StyledPopup: FunctionComponent<StyledPopupProps> = React.memo((props) => {
  const { show, onClose, trigger, header, children, size = 'S' } = props

  const contentStyle = {
    width: '330px',
    borderRadius: '5px',
    minWidth: '',
  }

  const popUpAttributes: PopupProps = {
    modal: true,
    nested: true,
    position: 'center center',
    children,
  }

  if (!isMobile) {
    switch (size) {
      case 'M':
        contentStyle.width = '430px'
        break
      default:
        break
    }
  }

  if (show) {
    popUpAttributes.open = show
  } else if (trigger) {
    popUpAttributes.trigger = trigger
  }

  return (
    <>
      <Popup contentStyle={contentStyle} {...popUpAttributes}>
        {(close: () => void) => (
          <>
            <div className={styles.mainPopup}>
              <div
                className={styles.closePopup}
                onClick={() => {
                  if (onClose) {
                    onClose()
                  }
                  close()
                }}
              >
                <FontAwesomeIcon icon="times" color="white" size="1x" />
              </div>

              <div className={styles.headerTip}>{header && <h6>{header}</h6>}</div>
            </div>
            {isMobile && <ContainerMobileDiv>{children}</ContainerMobileDiv>}
            {!isMobile && <>{children}</>}
          </>
        )}
      </Popup>
    </>
  )
})

export default StyledPopup
