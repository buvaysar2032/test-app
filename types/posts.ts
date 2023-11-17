export interface IPost {
    title: string
    body: string
    id: number
    userId: number
}

export interface IPostImage {
  albumId: number
  id: string
  thumbnailUrl: string
  title: string
  url: string
}
