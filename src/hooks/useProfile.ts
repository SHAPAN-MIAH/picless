import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import _ from 'lodash'

import { matchPath, useParams } from 'react-router-dom'
import ProviderProfileContext from '../context/ProviderProfileContext'
import UserService from '../services/UserService'
import PostService from '../services/PostService'
import useRouter from './useRouter'

import { ServiceUserProfileType } from '../types/UserType.d'
import { MediaType, PostType, ServicePostType, ServiceMediaTypes } from '../types/PostType.d'

export enum Tabs {
  POSTS = 'posts',
  PHOTOS = 'photos',
  VIDEOS = 'videos',
  ABOUT = 'about',
}

const defaultTab = Tabs.POSTS

const useProfile = (props?: { disableMount: boolean }) => {
  const { provider, setProvider } = useContext(ProviderProfileContext.context)
  const router = useRouter()

  const { disableMount = false } = props || {}

  const { username, tab } = useParams<{ username: string; tab: string }>()

  const [loading, setLoading] = useState<boolean>(false)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  useEffect(() => {
    const controllerCancelable = new AbortController()
    const { signal } = controllerCancelable

    if (!disableMount) {
      if (!provider || provider.userName !== username)
        UserService.getUserProfileByUserName(username, signal)
          .then((data: ServiceUserProfileType) => {
            if (data.code !== '0') {
              if (data.code === '1') {
                router.push('/user/not-exist')
              } else {
                router.push('/error')
              }
            } else {
              setLoading(false)

              setProvider(data.user)

              setIsSubscribed(data.isSuscribe)

              if (!tab) {
                router.push(`/user/${username}/${defaultTab}`)
              }
            }
          })
          .catch((err) => {
            console.error(err)
            toast.error('Error loading profile')
          })
    }
    return () => {
      if (!disableMount) controllerCancelable.abort()
    }
  }, [username])

  const getPosts = async (): Promise<PostType[]> => {
    return PostService.getPosts().then((p: ServicePostType) => {
      if (p.code === '0') return _.reverse(p.posts)

      toast.error('Error loading posts')
      return []
    })
  }

  const getPhotos = async (page?: number): Promise<MediaType[]> => {
    return PostService.getMedia('photos', page).then((data: ServiceMediaTypes): MediaType[] => {
      if (data.code === '0') return data.mediaFiles

      toast.error('Error loading photos')
      return []
    })
  }

  const getVideos = async (page?: number): Promise<MediaType[]> => {
    return PostService.getMedia('videos', page).then((data: ServiceMediaTypes): MediaType[] => {
      if (data.code === '0') return data.mediaFiles

      toast.error('Error loading videos')
      return []
    })
  }

  return {
    loading,
    provider,
    setProvider,
    isSubscribed,
    getPosts,
    getPhotos,
    getVideos,
  }
}

export default useProfile
