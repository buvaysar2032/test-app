'use client'
import { $posts, loadPosts } from '@/context/posts';
import { useStore } from 'effector-react/effector-react.mjs';
import styles from './page.module.scss'
import { useEffect } from 'react';

export default function EditPost({ params }: { params: { postId: string } }) {
  const posts = useStore($posts)
  const post = posts.find((post) => post.id == +params.postId)

  useEffect(() => {
    loadPosts()
  }, [])

  return (
    <main>
      <section className={styles.edit}>
        <div className="container">
          <input type="text" defaultValue={post?.title}/>
          <input type="text" defaultValue={post?.body}/>
        </div>
      </section>
    </main>
  )
}
