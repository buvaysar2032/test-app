import { createEffect } from "effector-next"
import api from './axiosClient'

export const getPostsFx = createEffect(async () => {
  try {
    const { data } = await api.get('/posts')

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})

export const createPostFx = createEffect(async ({ title, body }: { title: string, body: string }) => {
  try {
    const { data } = await api.post('/posts', { title, body })

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})

export const getPostImageFx = createEffect(async ({ postId }: { postId: string }) => {
  try {
    const { data } = await api.get(`/photos/${postId}`)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})

export const deletePostFx = createEffect(async ({ postId }: { postId: number }) => {
  try {
    const { data } = await api.delete(`/posts/${postId}`)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})

export const getPostAuthorFx = createEffect(async ({ postId }: { postId: number }) => {
  try {
    const { data } = await api.get(`/users/${postId}`)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})

export const getPostCommentsFx = createEffect(async ({ postId }: { postId: number }) => {
  try {
    const { data } = await api.get(`/comments?postId=${postId}`)

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})

export const editPostFx = createEffect(async ({ postId, title, body }: {
  postId: number,
  title: string,
  body: string
}) => {
  try {
    const { data } = await api.patch(`/posts/${postId}`, { title, body })

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
})
