import { useState } from 'react'

const UseStateBasics = () => {
  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <>
      <h1>Your count: {count}</h1>
      <button type='button' className='btn' onClick={handleClick}>
        Increment
      </button>
    </>
  )
}

export default UseStateBasics
