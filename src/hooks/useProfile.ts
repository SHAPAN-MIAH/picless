import _ from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import ProviderProfileContext from '../context/ProviderProfileContext'
import PostService from '../services/PostService'
import UserService from '../services/UserService'
import { ServiceMediaTypes, ServicePostType } from '../types/PostType.d'
import { ServiceUserProfileType } from '../types/UserType.d'
import useRouter from './useRouter'

export enum Tabs {
  POSTS = 'posts',
  PHOTOS = 'photos',
  VIDEOS = 'videos',
  ABOUT = 'about',
}

const defaultTab = Tabs.ABOUT

const useProfile = (props?: { disableMount: boolean }) => {
  const {
    provider,
    posts,
    photos,
    videos,
    isSubscribed,
    setProvider,
    setPosts,
    setPhotos,
    setVideos,
    setIsSubscribed,
    cleanProfile,
  } = useContext(ProviderProfileContext.context)

  const router = useRouter()
  const { disableMount = false } = props || {}

  const { username, tab } = useParams<{ username: string; tab: string }>()

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const controllerCancelable = new AbortController()
    const { signal } = controllerCancelable

    if (!disableMount) {
      if (!provider || provider.userName !== username) setLoading(true)
      UserService.getUserProfileByUserName(username, signal)
        .then((data: ServiceUserProfileType) => {
          if (data.code !== '0') {
            if (data.code === '1') {
              router.push('/u/not-exist')
            } else {
              router.push('/error')
            }
          } else {
            setLoading(false)

            setProvider(data.user)

            setIsSubscribed(data.isSuscribe)
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

  const getPosts = async (): Promise<void> => {
    return PostService.getPosts().then((p: ServicePostType): void => {
      if (p.code === '0') {
        setPosts(_.reverse(p.posts || []))
      } else {
        toast.error('Error loading posts')
      }
    })
  }

  const getPhotos = async (page?: number): Promise<void> => {
    return PostService.getMedia('photos', page, provider.id || 0).then((data: ServiceMediaTypes): void => {
      if (data.code === '0') {
        setPhotos(data.mediaFiles || [])
      } else {
        toast.error('Error loading photos')
      }
    })
  }

  const getVideos = async (page?: number): Promise<void> => {
    return PostService.getMedia('videos', page, provider.id || 0)
      .then((data: ServiceMediaTypes): void => {
        if (data.code === '0') {
          setVideos(data.mediaFiles || [])
        } else {
          toast.error('Error loading videos')
        }
      })
      .catch((err) => {
        console.error('Error ')
        toast.error('Error loading videos')
      })
  }

  return {
    loading,
    provider,
    posts,
    photos,
    videos,
    isSubscribed,
    getPosts,
    getPhotos,
    getVideos,
    setProvider,
    cleanProfile,
  }
}

export default useProfile
