import React, { ReactNode, useState } from 'react'
import { MediaType, PostType } from '../types/PostType.d'
import { UserProfileType } from '../types/UserType.d'

interface ProviderProfileContextProps {
  provider: UserProfileType
  setProvider: React.Dispatch<React.SetStateAction<UserProfileType>>
  isSubscribed: boolean
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>
  posts: PostType[]
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>
  photos: MediaType[]
  setPhotos: React.Dispatch<React.SetStateAction<MediaType[]>>
  videos: MediaType[]
  setVideos: React.Dispatch<React.SetStateAction<MediaType[]>>
  cleanProfile: () => void
}

const defaultContextValues: ProviderProfileContextProps = {
  provider: {} as UserProfileType,
  setProvider: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  isSubscribed: false,
  setIsSubscribed: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  posts: [],
  setPosts: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  photos: [],
  setPhotos: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  videos: [],
  setVideos: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
  cleanProfile: () => {
    console.log('A')
  },
}

const Context = React.createContext(defaultContextValues)

export const ProviderProfileContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [provider, setProvider] = useState<UserProfileType>({} as UserProfileType)
  const [posts, setPosts] = useState<PostType[]>([])
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)
  const [photos, setPhotos] = useState<MediaType[]>([])
  const [videos, setVideos] = useState<MediaType[]>([])

  const cleanProfile = () => {
    setProvider(defaultContextValues.provider)
    setPosts(defaultContextValues.posts)
    setIsSubscribed(defaultContextValues.isSubscribed)
    setPhotos(defaultContextValues.photos)
    setVideos(defaultContextValues.videos)
  }

  const values = {
    provider,
    setProvider,
    posts,
    setPosts,
    photos,
    setPhotos,
    videos,
    setVideos,
    isSubscribed,
    setIsSubscribed,
    cleanProfile,
  }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

ProviderProfileContextProvider.context = Context
export default ProviderProfileContextProvider
