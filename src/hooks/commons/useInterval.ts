import { useEffect, useRef } from 'react'

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<any>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const tick = () => {
      savedCallback.current()
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [callback, delay])
}

export default useInterval
