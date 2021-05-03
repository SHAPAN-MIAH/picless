import { useContext } from 'react'
import ApplicationContext from '../context/ApplicationContext'

const useMenu = () => {
  const { showMenu, setShowMenu } = useContext(ApplicationContext.context)

  return {
    showMenu,
    setShowMenu,
  }
}

export default useMenu
