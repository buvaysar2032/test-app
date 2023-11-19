'use client'
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  $postAuthor,
  $postComments,
  $postImage,
  $posts,
  getPostAuthor,
  getPostComments,
  getPostImage,
  loadPosts
} from '@/context/posts';
import { getPostAuthorFx, getPostCommentsFx, getPostImageFx } from '@/api/posts';
import styles from './page.module.scss'

export default function ShowPost({ params }: { params: { postId: string } }) {
  const posts = useStore($posts)
  const post = posts.find((post) => post.id === +params.postId)
  const postImage = useStore($postImage)
  const postAuthor = useStore($postAuthor)
  const postComments = useStore($postComments)
  const postImageSpinner = useStore(getPostImageFx.pending)
  const postAuthorSpinner = useStore(getPostAuthorFx.pending)
  const postCommentsSpinner = useStore(getPostCommentsFx.pending)

  useEffect(() => {
    loadPosts()
    getPostAuthor({ postId: +params.postId })
    getPostComments({ postId: +params.postId })
    getPostImage({ postId: params.postId })
  }, [])

  return (
    <main>
      <section className={styles.show}>
        <div className="container">
          <div className={styles.show__inner}>
            {<Image src={postImageSpinner ? '' : postImage.url} alt={postImage.title} width={300} height={300} />}
            <h1>{post?.title}</h1>
            <p className={styles.show__inner__text}>{post?.body}</p>
            <div className={styles.show__controls}>
              <Link href={`/edit-post/${params.postId}`} className={`app-btn ${styles.main_table__edit}`}>
                Edit
              </Link>
              <Link href='/create-post' className={`app-btn ${styles.main_table__add}`}>
                Add new post
              </Link>
            </div>
            {postAuthorSpinner
            ? 'Loading...'
            : <div className={styles.show__author}>
                <h2>Author</h2>
                <span>Name: <strong>{postAuthor.name}</strong></span>
                <span>Username: <strong>{postAuthor.username}</strong></span>
                <span>Place: <strong>{postAuthor.address?.street}, {postAuthor.address?.city}</strong></span>
                <span>Site: <a href={`https://${postAuthor.website}`} target='_blank'>{postAuthor.website}</a></span>
            </div>}
            {postCommentsSpinner
            ? 'Loading...'
            : (
              <div className={styles.show__comments}>
                <h2>Comments</h2>
                <ul className={styles.show__comments__list}>
                  {postComments.map((comment) => (
                    <li className={styles.show__comments__list__item}>
                      <span className={styles.show__comments__list__item__title}>
                        <strong>
                          {comment.name}
                        </strong>
                      </span>
                      <p className={styles.show__comments__list__item__text}>
                        {comment.body}
                      </p>
                      <span className={styles.show__comments__list__item__email}>
                        {comment.email}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
