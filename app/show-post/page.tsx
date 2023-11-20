'use client'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react'
import { 
  $posts,
  // filterPosts, 
  loadPosts, 
  sortPosts 
} from '@/context/posts'
import { getPostsFx } from '@/api/posts'
import skeletonStyles from './page.module.scss'
import styles from './page.module.scss'

export default function Home() {
  const posts = useStore($posts)
  const spinner = useStore(getPostsFx.pending)
  const searchInputRef = useRef() as MutableRefObject<HTMLInputElement>
  const searchListRef = useRef() as MutableRefObject<HTMLUListElement>
  const [searchInputValue, setSearchInputValue] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const propsForMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  useEffect(() => {
    loadPosts()
    sortPosts(0)
  }, [])

  useEffect(() => {
    if (!searchInputValue) {
      loadPosts()
      return
    }

    // filterPosts(searchInputValue)
  }, [searchInputValue])

  const handleSearchPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  const handleSortTable = () => {
    const newOrder = sortOrder === 1 ? 0 : 1
    setSortOrder(newOrder)
    sortPosts(newOrder)
  }

  return (
    <main>
      <section className={styles.main_table}>
        <div className="container">
          <Link href='/create-post' className={`app-btn ${styles.main_table__add}`}>Add new post</Link>
          <div className={styles.main_table__search}>
            <input
              type="text"
              className={styles.main_table__search__input}
              placeholder='Search post'
              ref={searchInputRef}
              onChange={handleSearchPosts}
              value={searchInputValue}
            />
            <ul  className={styles.main_table__search__list} ref={searchListRef}/>
          </div>
          {spinner && (
          <motion.ul className={skeletonStyles.skeleton} {...propsForMotion}>
            {Array.from(new Array(1)).map((_, i) => (
              <li key={i} className={skeletonStyles.skeleton__item}>
                <div className={skeletonStyles.skeleton__item__light} />
              </li>
            ))}
          </motion.ul>
        )}
          {!spinner && <motion.table {...propsForMotion}>
            <thead>
              <tr onClick={handleSortTable}>
                <th>
                  Title
                </th>
                <th>
                  Text
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <span>{post.body}</span>
                    <div className={styles.main_table__controls}>
                      <Link href={`/edit-post/${post.id}`} className={`app-btn ${styles.main_table__edit}`}>Edit</Link>
                      <button className={`app-btn ${styles.main_table__delete}`}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>}
        </div>
      </section>
    </main>
  )
}
