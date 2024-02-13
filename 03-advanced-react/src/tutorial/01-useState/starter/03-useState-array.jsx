import { data } from '../../../data'
import { useState } from 'react'

const UseStateArray = () => {
  const [people, setPeople] = useState(data)

  const removeItem = (id) => {
    const newPeople = people.filter((person) => id !== person.id)
    setPeople(newPeople)
  }

  const clearAllItems = () => {
    setPeople([])
  }

  return (
    <div>
      {people.map(({ id, name }) => (
        <div key={id}>
          <h4>{name}</h4>
          <button
            type='button'
            onClick={() => {
              removeItem(id)
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type='button'
        style={{ marginTop: '2rem' }}
        className='btn'
        onClick={clearAllItems}
      >
        Clear items
      </button>
    </div>
  )
}

export default UseStateArray
