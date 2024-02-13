import { useState, useEffect } from 'react'
const url = 'https://api.github.com/users'

const MultipleEffects = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(url)
        const result = await res.json()
        setUsers(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <section>
      <h3>github users</h3>
      <ul className='users'>
        {users.map((user) => {
          const { id, login, avatar_url, html_url } = user
          return (
            <li key={id}>
              <img src={avatar_url} alt={login} />
              <div>
                <h5>{login}</h5>
                <a href={html_url}>profile</a>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
export default MultipleEffects
