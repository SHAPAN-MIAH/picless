import { useState } from 'react'

const useGlobalLoader = () => {
  const [loading, setLoading] = useState(true)

  return {
    loading,
    setLoading,
  }
}
export default useGlobalLoader
