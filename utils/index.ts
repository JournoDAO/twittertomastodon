import { useEffect, useState, } from 'react'

export const useIsMounted = () => {
  const [ isMounted, setIsMounted, ] = useState(false,)

  useEffect(() => {
    setIsMounted(true,)

    return (): void => {
      setIsMounted(false,)
    }
  }, [],)

  return {
    isMounted,
  }
}
