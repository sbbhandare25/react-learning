import { useState } from 'react'
import { data } from '../../../data'

const UseStateArray = () => {
  const [people, setPeople] = useState(data)

  const handleOnClick = (key) => {
    const newPeople = people.filter((item) => item.id !== key)
    console.log(newPeople)
    setPeople(newPeople)
  }
  return (
    <div>
      {people.map((item) => (
        <div key={item.id}>
          <h4>{item.name}</h4>
          <button type='button' onClick={() => handleOnClick(item.id)}>
            Remove
          </button>
        </div>
      ))}
      <button
        type='button'
        className='btn'
        style={{ marginTop: '2rem' }}
        onClick={() => setPeople([])}
      >
        Clear Items
      </button>
    </div>
  )
}

export default UseStateArray
