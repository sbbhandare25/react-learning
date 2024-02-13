import logo from '../images/logo.svg'
import { pageLinks, socialLinks } from '../data'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='nav-logo' alt='backroads' />
          <button type='button' className='nav-toggle' id='nav-toggle'>
            <i className='fas fa-bars'></i>
          </button>
        </div>

        <ul className='nav-links' id='nav-links'>
          {pageLinks.map((pageLink) => (
            <li key={pageLink.id}>
              <a href={pageLink.href} className='nav-link'>
                {pageLink.text}
              </a>
            </li>
          ))}
        </ul>

        <ul className='nav-icons'>
          {socialLinks.map(({ id, href, icon }) => (
            <li key={id}>
              <a
                href={href}
                rel='noreferrer'
                target='_blank'
                className='nav-icon'
              >
                <i className={icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
