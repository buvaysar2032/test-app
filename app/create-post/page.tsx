'use client'
import { useState } from 'react'
import styles from './page.module.scss'
import { createPost } from '@/context/posts'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setBody(e.target.value)

  const handleAddNewPost = () => {
    if (!title || !body) {
      return
    }

    createPost({ title, body })
  }

  return (
    <main>
      <section className={styles.create}>
        <div className="container">
            <div className={styles.create__inner}>
                <label>
                  <input type="text" placeholder='Title' required onChange={handleTitleChange} />
                </label>
                <label>
                  <input type="text" placeholder='Text' required onChange={handleTextChange} />
                </label>
                <button onClick={handleAddNewPost} className={`app-btn ${styles.create__add}`}>Add</button>
            </div>
        </div>
      </section>
    </main>
  )
}
