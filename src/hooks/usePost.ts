import { useCallback, useContext } from 'react'
import toast from 'react-hot-toast'
import PostContext from '../context/PostContext'
import PostService from '../services/PostService'
import { PostType, ServicePostType, ServiceReactionPostType } from '../types/PostType.d'

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

  const addReaction = useCallback((postId, reaction = 'LIKE'): Promise<number> => {
    return new Promise<number>((resolve) => {
      PostService.addReaction(postId, reaction).then((data: ServiceReactionPostType) => {
        if (data.code === '0') resolve(data.reactionId)
        return resolve(-1)
      })
    })
  }, [])

  const removeReaction = useCallback((reactionId: number) => {
    return new Promise<void>((resolve) => {
      return PostService.deleteReaction(reactionId).then((data: any) => {
        console.log(data)
        resolve()
      })
    })
  }, [])

  return {
    posts,
    getPosts,
    deletePost,
    addReaction,
    removeReaction,
  }
}

export default usePost
