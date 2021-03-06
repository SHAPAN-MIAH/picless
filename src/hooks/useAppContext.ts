import { useCallback, useContext, useEffect } from 'react'
import ApplicationContext from '../context/ApplicationContext'

type UseAppContextProps = { changeTitle?: string }

const useAppContext = (props?: UseAppContextProps) => {
  const { title, setTitle } = useContext(ApplicationContext.context)

  const changeAppTitle = useCallback(
    (value: string) => {
      const appName = process.env.REACT_APP_WEBSITE_NAME || ''
      setTitle(`${value} - ${appName}`)
    },
    [setTitle]
  )

  useEffect(() => {
    if (props) {
      const { changeTitle = '' } = props
      if (changeTitle) changeAppTitle(changeTitle)
    }
  }, [changeAppTitle, props])

  return {
    title,
    setTitle: changeAppTitle,
  }
}

export default useAppContext
