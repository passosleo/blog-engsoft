import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 950)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 950)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return isMobile
}
