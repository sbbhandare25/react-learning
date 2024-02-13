import { useEffect, useState } from 'react'

const RandomComponent = () => {
  useEffect(() => {
    console.log('inside use effect')
    const someFunc = () => {
      // Some logic
    }

    window.addEventListener('scroll', someFunc)

    return () => window.removeEventListener('scroll', someFunc)
  }, [])
  return <h4>Random Component</h4>
}

const CleanupFunction = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <h2>cleanup function</h2>
      <button type='button' className='btn' onClick={() => setToggle(!toggle)}>
        toggle
      </button>
      {toggle && <RandomComponent />}
    </>
  )
}

export default CleanupFunction
