
import { useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

const stop = (e) => e.stopPropagation()

const controlClass =
  "grid h-12 w-12 place-items-center border border-white/30 text-white transition hover:border-red-500 hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"

const Lightbox = ({ items, index, onClose, onNavigate }) => {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const touchStartX = useRef(null)

  const total = items.length
  const current = items[index]

  const go = (step) => onNavigate((index + step + total) % total)

  // Lock body scroll while open, restore on close, focus the close button
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Keyboard controls (Escape, arrows, focus trap)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose()
        return
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault()
        if (e.repeat || total < 2) return // one navigation per key press
        const step = e.key === "ArrowLeft" ? -1 : 1
        onNavigate((index + step + total) % total)
        return
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll("button")
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [index, total, onClose, onNavigate])

  if (!current) return null

  const onTouchEnd = (e) => {
    if (touchStartX.current === null || total < 2) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) > 50) go(dx > 0 ? -1 : 1)
  }

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-100 flex flex-col bg-[#05050f]/95"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 md:px-8">
        <p className="font-monst text-sm font-bold uppercase tracking-widest text-white">
          {index + 1}
          <span className="text-gray-500"> / {total}</span>
        </p>

        <button
          ref={closeRef}
          type="button"
          aria-label="Close image viewer"
          onClick={(e) => {
            stop(e)
            onClose()
          }}
          className={controlClass}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* Image area */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24"
        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
        onTouchEnd={onTouchEnd}
      >
        {total > 1 && (
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              stop(e)
              go(-1)
            }}
            className={`${controlClass} absolute left-3 top-1/2 z-10 -translate-y-1/2 bg-[#05050f]/60 md:left-8`}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        <img
          key={current.id}
          src={current.src}
          alt={current.alt}
          onClick={stop}
          className="max-h-full max-w-full object-contain"
        />

        {total > 1 && (
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              stop(e)
              go(1)
            }}
            className={`${controlClass} absolute right-3 top-1/2 z-10 -translate-y-1/2 bg-[#05050f]/60 md:right-8`}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>

      {/* Caption */}
      <p
        aria-live="polite"
        onClick={stop}
        className="font-roboto mx-auto max-w-2xl px-6 py-5 text-center text-sm leading-relaxed text-gray-300"
      >
        {current.alt}
      </p>
    </div>
  )
}

export default Lightbox