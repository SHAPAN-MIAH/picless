import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FunctionComponent, ReactNode } from 'react'
import Popup from 'reactjs-popup'
import styles from './StyledPopup.module.css'

type StyledPopupProps = {
  trigger: JSX.Element
  content: ReactNode
  show: boolean
  onClose: () => void
  header?: string
}

const StyledPopup: FunctionComponent<StyledPopupProps> = (props) => {
  const { show, onClose, trigger, header, content } = props

  return (
    <>
      <Popup
        open={show}
        modal
        contentStyle={{ width: '330px', borderRadius: '5px', minWidth: '' }}
        position="center center"
        trigger={trigger}
      >
        {(close: any) => {
          return (
            <>
              <div className={styles.mainPopup}>
                <div
                  className={styles.closePopup}
                  onClick={() => {
                    onClose()
                  }}
                >
                  <FontAwesomeIcon icon="times" color="white" size="1x" />
                </div>

                <div className={styles.headerTip}>{header && <h6>{header}</h6>}</div>
              </div>
              {content}
            </>
          )
        }}
      </Popup>
    </>
  )
}

export default StyledPopup
