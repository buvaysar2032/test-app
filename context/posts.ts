import { createDomain, forward } from "effector"
import { createPostFx, deletePostFx, editPostFx, getPostAuthorFx, getPostCommentsFx, getPostImageFx, getPostsFx } from "@/api/posts"
import { IPost, IPostAuthor, IPostComments, IPostImage } from "@/types/posts"

const posts = createDomain()

export const loadPosts = posts.createEvent()
export const sortPosts = posts.createEvent<number>()
export const createPost = posts.createEvent<{ title: string, body: string }>()
export const getPostImage = posts.createEvent<{ postId: string }>()
export const deletePost = posts.createEvent<{ postId: number }>()
export const setPostId = posts.createEvent<number>()
export const setShowDeleteModal = posts.createEvent<boolean>()
export const getPostAuthor = posts.createEvent<{ postId: number }>()
export const getPostComments = posts.createEvent<{ postId: number }>()
export const setFilteredPosts = posts.createEvent<IPost[]>()
export const editPost = posts.createEvent<{ postId: number, title: string, body: string }>()

export const $posts = posts
  .createStore<IPost[]>([])
  .on(getPostsFx.done, (_, { result }) => result)
  .on(createPostFx.done, (state, { result }) => [...state, result])
  .on(deletePost, (state, { postId }) => state.filter((item) => item.id !== postId))
    .on(sortPosts, (state, order) =>
    order === 1 ? state.sort((a, b) => b.id - a.id) : state.sort((a, b) => a.id - b.id))

export const $filteredPosts = posts
  .createStore<IPost[]>([])
  .on(setFilteredPosts, (_, value) => value)


export const $postImage = posts
  .createStore<IPostImage>({} as IPostImage)
  .on(getPostImageFx.done, (_, { result }) => result)

export const $postId = posts
  .createStore<number>(0)
  .on(setPostId, (_, id) => id)

export const $showDeleteModal = posts
  .createStore<boolean>(false)
  .on(setShowDeleteModal, (_, value) => value)

export const $postAuthor = posts
  .createStore<IPostAuthor>({} as IPostAuthor)
  .on(getPostAuthorFx.done, (_, { result }) => result)

export const $postComments = posts
  .createStore<IPostComments[]>([])
  .on(getPostCommentsFx.done, (_, { result }) => result)

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

forward({
  from: deletePost,
  to: deletePostFx,
})

forward({
  from: getPostAuthor,
  to: getPostAuthorFx,
})

forward({
  from: getPostComments,
  to: getPostCommentsFx,
})

forward({
  from: editPost,
  to: editPostFx,
})
