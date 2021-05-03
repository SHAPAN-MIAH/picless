<<<<<<< HEAD
import { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

import useInterval from './commons/useInterval'

import ApplicationContext from '../context/ApplicationContext'
import { ServiceNotificationType } from '../types/NotificationType'
import NotificationService from '../services/NotificationService'

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(ApplicationContext.context)

  const getNotifications = async (): Promise<void> => {
    return NotificationService.getNotifications().then((p: ServiceNotificationType): void => {
      if (p.code === '0') {
        setNotifications(p.data)
      } else {
        toast.error('Error loading notifications')
      }
    })
  }

  useEffect(() => {
    getNotifications()
  }, [])

  useInterval(() => {
    getNotifications()
  }, 300000)

  return { getNotifications, notifications }
}

export default useNotifications
=======
import { useContext, useEffect } from 'react'
import toast from 'react-hot-toast'

import useInterval from './commons/useInterval'

import ApplicationContext from '../context/ApplicationContext'
import { ServiceNotificationType } from '../types/NotificationType'
import NotificationService from '../services/NotificationService'

const useNotifications = () => {
  const { notifications, setNotifications } = useContext(ApplicationContext.context)

  const getNotifications = async (): Promise<void> => {
    return NotificationService.getNotifications().then((p: ServiceNotificationType): void => {
      if (p.code === '0') {
        setNotifications(p.data)
      } else {
        toast.error('Error loading notifications')
      }
    })
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return { getNotifications, notifications }
}

export default useNotifications
>>>>>>> stage-5
