import { useEffect, useState } from 'react'

const MultipleReturnsBasics = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [])
  return isLoading ? <h2>Loading...</h2> : <h2>Multiple Returns Basics</h2>
}
export default MultipleReturnsBasics
