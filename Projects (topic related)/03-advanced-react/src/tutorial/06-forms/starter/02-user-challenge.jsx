import { useState } from 'react'
import { data as info } from '../../../data'

const UserChallenge = () => {
  const [name, setName] = useState('')
  const [data, setData] = useState(info)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) return
    setData([...data, { id: Date.now(), name }])
    setName('')
  }

  const removePerson = (id) => {
    const newData = data.filter((person) => person.id !== id)
    setData(newData)
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <h4>Add User</h4>
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input
            type='text'
            className='form-input'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
      {/* render users below */}
      <div>
        {data.map(({ id, name }) => (
          <div key={id}>
            {name}{' '}
            <button
              type='button'
              className='btn'
              onClick={() => removePerson(id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default UserChallenge
