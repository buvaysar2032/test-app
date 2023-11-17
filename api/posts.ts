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
