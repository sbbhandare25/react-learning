import { useState } from 'react'

const UseStateGotcha = () => {
  const [value, setValue] = useState(0)

  const handleClick = () => {
    setTimeout(() => {
      setValue((currentState) => currentState + 1)
    }, 3000)
  }
  return (
    <>
      <h1>{value}</h1>
      <button type='button' className='btn' onClick={handleClick}>
        increase
      </button>
    </>
  )
}

export default UseStateGotcha
