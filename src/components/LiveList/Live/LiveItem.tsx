import classNames from 'classnames'
import UserAvatar from 'components/UserAvatar'
import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { LiveType } from 'types/StreamingType'
import styles from '../LiveList.module.css'

type LiveItemProps = {
  live: LiveType
}

const LiveItem: FunctionComponent<LiveItemProps> = (props) => {
  const { live } = props

  return (
    <>
      <Link to={`/u/${live.userName}/live/${live.streamId}`}>
        <div className={classNames(styles.itemContainer)}>
          <UserAvatar imageName={live.avatarPicture} size="M" removeContainerStyle />
          <p>{live.userName}</p>
        </div>
      </Link>
    </>
  )
}

export default React.memo(LiveItem)
