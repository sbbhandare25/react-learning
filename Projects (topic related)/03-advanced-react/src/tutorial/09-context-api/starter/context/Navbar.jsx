import { createContext, useState } from 'react'
import NavLinks from './NavLinks'

export const NavbarContext = createContext()

const Navbar = () => {
  const [user, setUser] = useState('bob')
  const logout = () => setUser(null)

  return (
    <NavbarContext.Provider value={{ user, logout }}>
      <nav className='navbar'>
        <h5>CONTEXT API</h5>
        <NavLinks user={user} logout={logout} />
      </nav>
    </NavbarContext.Provider>
  )
}
export default Navbar
