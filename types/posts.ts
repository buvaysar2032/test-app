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

export interface IPostAuthor {
  id: 1
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface IPostComments {
  postId: number
  id: number
  name: string
  email: string
  body: string
}
