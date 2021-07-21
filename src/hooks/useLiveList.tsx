import { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import LivesContext from '../context/LivesContext'
import StreamService from '../services/StreamService'
import { ServiceLiveType } from 'types/StreamingType'

const useLiveList = () => {
  const { currentLives, setCurrentLives } = useContext(LivesContext.context)
  const [loading, setLoading] = useState<boolean>(false)

  const getLives = async (): Promise<void> => {
    setLoading(true)
    return StreamService.getLives()
      .then((p: ServiceLiveType): void => {
        if (p.code === '0') {
          setCurrentLives(p.data)
        } else {
          toast.error('Error loading lives')
        }
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getLives()
  }, [])

  return { getLives, currentLives, loading }
}

export default useLiveList
