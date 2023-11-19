'use client'
import { useRef, MutableRefObject, useEffect } from 'react';
import { $posts, editPost, loadPosts } from '@/context/posts';
import { useStore } from 'effector-react';
import styles from './page.module.scss'

export default function EditPost({ params }: { params: { postId: string } }) {
  const posts = useStore($posts)
  const post = posts.find((post) => post.id == +params.postId)
  const titleRef = useRef() as MutableRefObject<HTMLTextAreaElement>
  const bodyRef = useRef() as MutableRefObject<HTMLTextAreaElement>

  useEffect(() => {
    loadPosts()
  }, [])

  const handleEditPost = () => {
    if (!titleRef.current.value || !bodyRef.current.value) {
      return
    }

    editPost({
      postId: +params.postId,
      title: titleRef.current.value,
      body: bodyRef.current.value
    })
  }

  return (
    <main>
      <section className={styles.edit}>
        <div className="container">
          <div className={styles.edit__inner}>
            <label>
              <textarea placeholder='Title' defaultValue={post?.title} ref={titleRef} />
            </label>
            <label>
              <textarea placeholder='Text' defaultValue={post?.body} ref={bodyRef} />
            </label>
            <button onClick={handleEditPost} className={`app-btn ${styles.create__add}`}>Save</button>
          </div>
        </div>
      </section>
    </main>
  )
}
