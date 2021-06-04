import { useCallback, useContext } from 'react'
import toast from 'react-hot-toast'
import PaymentService from 'services/PaymentService'
import PostsReducerContext from '../context/PostsReducerContext'
import PostService from '../services/PostService'
import { PostReactionType, ReactionCodeType, ServicePostType, ServiceReactionPostType } from '../types/PostType.d'
import useUser from './useUser'

const usePosts = () => {
  const { state, ACTIONS, dispatch } = useContext(PostsReducerContext.context)

  const { user } = useUser()

  const updateReactionByPost = useCallback((postId: number, reactionCode: ReactionCodeType, reactionId: number) => {
    const post = state.posts.find((p) => p.id === postId)
    let modified = false

    const postReactions: PostReactionType[] =
      post?.postReactions.map((r) => {
        if (r.reactionCode === reactionCode) {
          const quantity = r?.quantity || 0

          modified = true

          r.id = reactionId
          r.quantity = quantity >= 0 ? quantity + 1 : quantity

          return r
        }

        return r
      }) || []

    if (!modified) {
      const postReaction = {
        id: reactionId,
        lastUser: user.fullName,
        quantity: 1,
        reactionCode,
      }

      postReactions.push(postReaction)

      if (post) post.postReactions = postReactions
    }
  }, [])

  const removeReactionByPost = useCallback((postId: number, reactionCode: ReactionCodeType) => {
    const post = state.posts.find((p) => p.id === postId)
    let modified = false

    const postReactions: PostReactionType[] =
      post?.postReactions.map((r) => {
        if (r.reactionCode === reactionCode) {
          modified = true

          const quantity = r?.quantity || 0

          r.id = -1
          r.quantity = quantity > 0 ? quantity - 1 : quantity

          return r
        }
        return r
      }) || []

    if (!modified) {
      const postReaction = {
        id: -1,
        lastUser: user.fullName,
        quantity: 1,
        reactionCode,
      }
      postReactions.push(postReaction)

      if (post) post.postReactions = postReactions
    }
  }, [])

  const getPosts = async (): Promise<void> => {
    dispatch({ type: ACTIONS.LOADING })

    return PostService.getPosts(state.nextPage).then((p: ServicePostType): void => {
      if (p.code === '0') {
        if (state.nextPage === 0) {
          dispatch({
            type: ACTIONS.SET_TOTAL_PAGES,
            payload: p.pages,
          })
        }

        dispatch({
          type: ACTIONS.GET_POSTS,
          payload: p.posts,
        })

        dispatch({
          type: ACTIONS.CHANGE_PAGE,
        })
      } else {
        toast.error('Error loading posts')
      }
    })
  }

  const getPurchasedPosts = async (): Promise<void> => {
    dispatch({ type: ACTIONS.LOADING })

    return PostService.getPurchasedPosts(state.nextPage).then((p: ServicePostType): void => {
      if (p.code === '0') {
        if (state.nextPage === 0) {
          dispatch({
            type: ACTIONS.SET_TOTAL_PAGES,
            payload: p.pages,
          })
        }

        dispatch({
          type: ACTIONS.GET_POSTS,
          payload: p.posts,
        })

        dispatch({
          type: ACTIONS.CHANGE_PAGE,
        })
      } else {
        toast.error('Error loading posts')
      }
    })
  }

  const deletePost = async (postId: number) => {
    return PostService.deletePost(postId)
      .then((data: { code: number; message: string }) => {
        if (data.code !== 0) {
          throw new Error(data.message)
        }

        dispatch({ type: ACTIONS.DELETE_POSTS, payload: postId })
      })
      .catch((err) => {
        toast.error('Error deleting post')
        console.error(err.message)
      })
  }

  const addReaction = (postId: number, reactionCode = 'LIKE' as ReactionCodeType): Promise<number> => {
    return new Promise<number>((resolve) => {
      PostService.addReaction(postId, reactionCode).then((data: ServiceReactionPostType) => {
        if (data.code === '0') {
          updateReactionByPost(postId, reactionCode, data.reactionId)

          resolve(data.reactionId)
        } else {
          resolve(-1)
        }
      })
    })
  }

  const removeReaction = useCallback((postId: number, reactionCode = 'LIKE' as ReactionCodeType, reactionId: number) => {
    return new Promise<void>((resolve) => {
      return PostService.deleteReaction(reactionId).then(() => {
        removeReactionByPost(postId, reactionCode)
        resolve()
      })
    })
  }, [])

  const unlockPost = (postId: number) => {
    return new Promise<{ action: string; redirect?: string }>((resolve, reject) => {
      PaymentService.unlockContent(postId)
        .then((data: { code: number; message: string; path: string }) => {
          if (data.code !== 0) {
            throw new Error(data.message)
          }

          resolve({ action: data.message, redirect: data.path })
        })
        .catch((err) => {
          toast.error('Error unblocking post')
          console.error(err.message)

          reject()
        })
    })
  }

  return {
    loading: state.loading,
    posts: state.posts,
    hasMore: state.pages >= state.nextPage - 1,
    getPosts,
    getPurchasedPosts,
    deletePost,
    addReaction,
    removeReaction,
    unlockPost,
    cleanPost: () =>
      dispatch({
        type: ACTIONS.CLEAR,
      }),
  }
}

export default usePosts
