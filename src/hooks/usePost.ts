import { useCallback, useContext } from 'react'
import toast from 'react-hot-toast'
import PostContext from '../context/PostContext'
import PostService from '../services/PostService'
import { PostType, ServicePostType } from '../types/PostType'

const usePost = () => {
  const { posts, setPosts } = useContext(PostContext.context)

  const getPosts = useCallback(
    async (page?: number): Promise<void> => {
      return PostService.getPosts(page).then((p: ServicePostType): void => {
        if (p.code === '0') {
          setPosts([...posts, ...p.posts])
        } else {
          toast.error('Error loading posts')
        }
      })
    },
    [posts]
  )

  const deletePost = useCallback(async (postId: number) => {
    PostService.deletePost(postId)
      .then((data: { code: number; message: string }) => {
        if (data.code !== 0) {
          throw new Error(data.message)
        }
        const newPosts = posts.filter((post: PostType) => post.id !== postId)

        setPosts(newPosts)
      })
      .catch((err) => {
        toast.error('Error deleting post')
        console.error(err.message)
      })
  }, [])

  return {
    posts,
    getPosts,
    deletePost,
  }
}

export default usePost
