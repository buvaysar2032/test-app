'use client'
import { useStore } from 'effector-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import {
  $filteredPosts,
  $posts,
  $showDeleteModal,
  loadPosts,
  setFilteredPosts,
  setShowDeleteModal,
  sortPosts } from '@/context/posts'
import { getPostsFx } from '@/api/posts'
import skeletonStyles from './page.module.scss'
import DeletePostModal from '@/components/DeletePostModal/DeletePostModal'
import { addOverflowHiddenToBody, removeOverflowHiddenFromBody } from '@/utils/common'
import PostsTableItem from '@/components/PostsTableItem/PostsTableItem'
import styles from './page.module.scss'

export default function Home() {
  const posts = useStore($posts)
  const filteredPosts = useStore($filteredPosts)
  const spinner = useStore(getPostsFx.pending)
  const searchInputRef = useRef() as MutableRefObject<HTMLInputElement>
  const searchListRef = useRef() as MutableRefObject<HTMLUListElement>
  const [searchInputValue, setSearchInputValue] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const showDeleteModal = useStore($showDeleteModal)
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

    const postsBySearch = posts.filter((post) =>
      post.title
        .toLowerCase()
        .match(searchInputValue.toLowerCase()) ||
      post.body
        .toLowerCase()
        .match(searchInputValue.toLowerCase()))

    setFilteredPosts(postsBySearch)
  }, [searchInputValue])

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    removeOverflowHiddenFromBody()
  }

  useEffect(() => {
    const overlay = document.querySelector(
      '.overlay'
    ) as HTMLDivElement
    overlay.addEventListener('click', handleCloseDeleteModal)

    return () => overlay.removeEventListener('click', handleCloseDeleteModal)
  }, [])

  const handleSearchPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }


  const handleSortTable = () => {
    const newOrder = sortOrder === 1 ? 0 : 1
    setSortOrder(newOrder)
    sortPosts(newOrder)
  }

  const handleDeletePost = () => {
    addOverflowHiddenToBody()
    setShowDeleteModal(true)
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
              {(searchInputValue.length ? filteredPosts : posts).map((post) => (
                <PostsTableItem post={post} handleDeletePost={handleDeletePost} key={post.id} />
              ))}
            </tbody>
          </motion.table>}
        </div>
      </section>
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DeletePostModal handleCloseDeleteModal={handleCloseDeleteModal} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`overlay ${showDeleteModal ? 'overlay-active' : ''}`} />
    </main>
  )
}
