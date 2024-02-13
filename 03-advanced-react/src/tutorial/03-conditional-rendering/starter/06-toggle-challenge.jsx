import { useState } from 'react'

const Hii = () => {
  return <div className='alert alert-success'>Hii</div>
}

const Bye = () => {
  return <div className='alert alert-danger'>Bye</div>
}

const ToggleChallenge = () => {
  const [isHello, setIsHello] = useState(false)

  // const toggleIsHello = () => {
  //   setIsHello((prev) => !prev)
  // }

  return (
    <>
      <h2>toggle challenge</h2>
      <button
        type='button'
        className='btn'
        onClick={() => setIsHello(!isHello)}
      >
        Toggle
      </button>
      <h2>{isHello ? <Hii /> : <Bye />}</h2>
    </>
  )
}

export default ToggleChallenge
