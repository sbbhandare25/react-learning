import { useState, useEffect } from 'react'

const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const resp = await fetch(url)
      // console.log(resp);
      if (!resp.ok) {
        setIsError(true)
        setIsLoading(false)
        return
      }

      const data = await resp.json()
      setData(data)
    } catch (error) {
      setIsError(true)
      console.log(error)
    }
    // hide loading
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { isLoading, isError, data }
}

export default useFetchData
