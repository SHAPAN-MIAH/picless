import React, { ReactNode, useState } from 'react'
import { UserProfileType } from '../types/UserType.d'
import { MediaType, PostType } from '../types/PostType.d'

interface ProviderProfileContextProps {
  provider: UserProfileType
  setProvider: React.Dispatch<React.SetStateAction<UserProfileType>>
  posts: PostType[]
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>
  photos: MediaType[]
  setPhotos: React.Dispatch<React.SetStateAction<MediaType[]>>
  videos: MediaType[]
  setVideos: React.Dispatch<React.SetStateAction<MediaType[]>>
}

const defaultContextValues: ProviderProfileContextProps = {
  provider: {} as UserProfileType,
  setProvider: (value: any): void => {
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
}

const Context = React.createContext(defaultContextValues)

export const ProviderProfileContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [provider, setProvider] = useState<UserProfileType>({} as UserProfileType)
  const [posts, setPosts] = useState<PostType[]>([])
  const [photos, setPhotos] = useState<MediaType[]>([])
  const [videos, setVideos] = useState<MediaType[]>([])

  const values = { provider, setProvider, posts, setPosts, photos, setPhotos, videos, setVideos }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

ProviderProfileContextProvider.context = Context
export default ProviderProfileContextProvider
