import { $postId, deletePost, setShowDeleteModal } from '@/context/posts';
import { useStore } from 'effector-react/compat';
import styles from '@/styles/deletePostModal/index.module.scss'

const DeletePostModal = ({ handleCloseDeleteModal }: { handleCloseDeleteModal: VoidFunction }) => {
  const postId = useStore($postId)

  const handleDeletePost = () => {
    deletePost({ postId })
    setShowDeleteModal(false)
  }

  return (
    <div className={styles.delete_modal}>
      <p className={styles.delete_modal__text}>
        Are you sure you want to delete the post?
      </p>
      <div className={styles.delete_modal__controls}>
        <button
          className={`app-btn ${styles.delete_modal__controls__delete}`}
          onClick={handleDeletePost}
        >
          Confirm
        </button>
        <button
          className={`app-btn ${styles.delete_modal__controls__cancel}`}
          onClick={handleCloseDeleteModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePostModal;
