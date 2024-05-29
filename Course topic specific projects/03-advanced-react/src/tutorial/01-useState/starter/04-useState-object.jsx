import { useState } from 'react'

const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: 'peter',
    age: 21,
    hobby: 'read books',
  })

  const displayPerson = () => {
    setPerson({
      name: 'john',
      age: 30,
      hobby: 'scream at the computer',
    })
  }

  return (
    <>
      <h3>{person.name}</h3>
      <h3>{person.age}</h3>
      <h4>Enjoys: {person.hobby}</h4>
      <button type='button' className='btn' onClick={displayPerson}>
        show john
      </button>
    </>
  )
}

export default UseStateObject