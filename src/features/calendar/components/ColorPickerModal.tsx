import type { JSX } from 'react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
// import { SketchPicker } from 'react-color'
import { EVENT_COLORS } from '@/store/settingsStore'
import { useCalendarStore } from '@/store/calendarStore'
import styles from './AddCalendarModal.module.css'

interface ColorPickerModalProps {
  isOpen: boolean
  calendarId: string
  onClose: () => void
}

export function ColorPickerModal({ isOpen, calendarId, onClose }: ColorPickerModalProps): JSX.Element | null {
  const [color, setColor] = useState<string>(EVENT_COLORS[0])
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const updateCalendar = useCalendarStore((state) => state.updateCalendar)
  const [error, setError] = useState('')

  // const handleChange = (newColor: { hex: string }) => {
  //   setColor(newColor.hex)
  // }

  useEffect(() => {
    if (isOpen) {
      setColor(EVENT_COLORS[0])
      setError('')
    }
  }, [isOpen])

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    setFormSubmitted(true)
    setError('')

    // try {
    //   updateCalendar(calendarId, { color: color })
    //   handleClose()
    // } catch (err) {
    //   const errorMsg = err instanceof Error ? err.message : 'Failed to update calendar color'
    //   setError(errorMsg)
    // } finally {
    //   setFormSubmitted(false)
    // }
  }

  const handleClose = (): void => {
    // setColor(EVENT_COLORS[0])
    updateCalendar(calendarId, { color: color })
    setError('')
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle} id="modal-title">
            Calendar Color Picker
          </h3>
          <button className={styles.modalClose} onClick={handleClose} aria-label="Close">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Color</label>
            <div className={styles.colorGrid}>
              {EVENT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.colorOption} ${color === c ? styles.colorSelected : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  aria-label={`Select color ${c}`}
                />
              ))}
            </div>
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonSecondary}`}
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              {formSubmitted ? 'Setting...' : 'Set color'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

