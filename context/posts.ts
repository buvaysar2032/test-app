import { createDomain, forward } from "effector"
import { createPostFx, getPostImageFx, getPostsFx } from "@/api/posts"
import { IPost, IPostImage } from "@/types/posts"

const posts = createDomain()

export const loadPosts = posts.createEvent()
export const filterPosts = posts.createEvent<string>()
export const sortPosts = posts.createEvent<number>()
export const createPost = posts.createEvent<{ title: string, body: string }>()
export const getPostImage = posts.createEvent<{ postId: string }>()

export const $posts = posts
  .createStore<IPost[]>([])
  .on(getPostsFx.done, (_, { result }) => result)
  .on(createPostFx.done, (state, { result }) => [...state, result])
  .on(filterPosts, (state, value) => state
    .filter((post) =>
    post.title
        .toLowerCase()
        .match(value.toLowerCase()) ||
    post.body
        .toLowerCase()
        .match(value.toLowerCase())))
    .on(sortPosts, (state, order) =>
    order === 1 ? state.sort((a, b) => b.id - a.id) : state.sort((a, b) => a.id - b.id))


export const $postImage = posts
.createStore<IPostImage>({} as IPostImage)
.on(getPostImageFx.done, (_, { result }) => result)

forward({
  from: loadPosts,
  to: getPostsFx,
})

forward({
  from: createPost,
  to: createPostFx,
})

forward({
  from: getPostImage,
  to: getPostImageFx,
})
