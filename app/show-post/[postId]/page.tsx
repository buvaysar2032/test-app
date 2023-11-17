'use client'
import { useStore } from 'effector-react';
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { $postImage, $posts, getPostImage, loadPosts } from '@/context/posts';
import { getPostImageFx } from '@/api/posts';
import styles from './page.module.scss'

export default function ShowPost({ params }: { params: { postId: string } }) {
  const posts = useStore($posts)
  const post = posts.find((post) => post.id === +params.postId)
  const postImage = useStore($postImage)
  const postImageSpinner = useStore(getPostImageFx.pending)

  useEffect(() => {
    loadPosts()
    getPostImage({ postId: params.postId })
  }, [])

  return (
    <main>
      <section className={styles.show}>
        <div className="container">
          <div className={styles.show__inner}>
            {<Image src={postImageSpinner ? '' : postImage.url} alt={postImage.title} width={300} height={300} />}
            <h1>{post?.title}</h1>
            <p>{post?.body}</p>
            <div className={styles.show__controls}>
              <Link href={`/edit-post/${params.postId}`} className={`app-btn ${styles.main_table__edit}`}>
                Edit
              </Link>
              <Link href='/create-post' className={`app-btn ${styles.main_table__add}`}>
                Add new post
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
