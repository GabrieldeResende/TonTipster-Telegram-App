import React, { useEffect, useRef } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <div
        ref={modalRef}
        className='bg-slate-900 rounded-lg shadow-lg w-11/12 max-w-md p-6 relative'
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-gray-600 hover:text-gray-900'
        >
          &times;
        </button>

        {title && <h2 className='text-lg font-semibold mb-4'>{title}</h2>}
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  )
}

export default Modal
