import Link from 'next/link';
import { IPost } from '@/types/posts';
import { setPostId } from '@/context/posts';
import styles from '@/app/page.module.scss';

const PostsTableItem = ({ post, handleDeletePost }: { post: IPost, handleDeletePost: VoidFunction }) => {
  const deletePost = () => {
    handleDeletePost()
    setPostId(post.id)
  }

  return (
    <tr>
    <td>{post.title}</td>
    <td>
      <span>{post.body}</span>
      <div className={styles.main_table__controls}>
        <Link href={`/edit-post/${post.id}`} className={`app-btn ${styles.main_table__edit}`}>Edit</Link>
        <Link href={`/show-post/${post.id}`} className={`app-btn ${styles.main_table__show}`}>Show</Link>
        <button
          className={`app-btn ${styles.main_table__delete}`}
          onClick={deletePost}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
  );
};

export default PostsTableItem;
