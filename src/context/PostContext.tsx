import React, { ReactNode, useState } from 'react'
import { PostType } from '../types/PostType.d'

interface PostContextProps {
  posts: PostType[]
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>
}

const defaultContextValues: PostContextProps = {
  posts: [],
  setPosts: (value: any): void => {
    console.warn(JSON.stringify(value))
  },
}

const Context = React.createContext(defaultContextValues)

export const PostContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [posts, setPosts] = useState<PostType[]>([])

  const values = { posts, setPosts }

  return <Context.Provider value={values}> {children} </Context.Provider>
}

PostContextProvider.context = Context
export default PostContextProvider
