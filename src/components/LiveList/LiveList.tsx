import React, { FunctionComponent } from 'react'
import SimpleBar from 'simplebar-react'
import classNames from 'classnames'
import styles from './LiveList.module.css'
import UserAvatar from 'components/UserAvatar'
import LiveItem from './Live/LiveItem'
import useLiveList from 'hooks/useLiveList'
import useInterval from 'hooks/commons/useInterval'
import Loader from 'react-loader-spinner'

type LiveListProps = {}

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
    <Loader type="TailSpin" color="#615dfa" height={50} width={50} visible />
  </div>
)

const LiveList: FunctionComponent<LiveListProps> = () => {
  const { getLives, currentLives, loading } = useLiveList()

  useInterval(() => {
    getLives()
  }, 300000)

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {currentLives.length > 0 && (
            <SimpleBar className={classNames(styles.mainContainer)} autoHide>
              {currentLives.map((live) => (
                <LiveItem key={live.id} live={live} />
              ))}
            </SimpleBar>
          )}
        </>
      )}
    </>
  )
}

export default React.memo(LiveList)
