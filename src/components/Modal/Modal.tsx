import React from 'react'
import Modal from 'react-modal'
import styles from './Modal.module.css'
const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '320px',
    height: '250px',
  }
}

interface ModalProps {
  isOpen: boolean,
  onAfterOpen?: () => void,
  onRequestClose: () => void,
  style?: Record<string, unknown>,
  contentLabel: string,
  children: JSX.Element | JSX.Element[]
}
Modal.setAppElement('#root')


const CustomModal = ({
  isOpen,
  onAfterOpen,
  onRequestClose,
  children,
  contentLabel
}: ModalProps) => {
  return (
    <Modal
    isOpen={isOpen}
    onAfterClose={onRequestClose}
    onAfterOpen={onAfterOpen}
    style={customStyles}
    contentLabel={contentLabel}
    >
      <div className={styles.Modal}>
        {children}
      </div>
    </Modal>
  )
}


export default CustomModal