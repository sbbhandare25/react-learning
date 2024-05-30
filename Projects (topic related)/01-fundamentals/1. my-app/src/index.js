import React from 'react'
import ReactDom from 'react-dom/client'

// BASIC COMPONENTS and with createElement
// const Greeting = () => {
//   return <h2>My First Component</h2>
// }

// const Greeting = () => {
//   return React.createElement('h2', {}, 'Hello World')
// }

// const Greeting = () => {
//   return (
//     <div>
//       <h2>My First Component</h2>
//     </div>
//   )
// }

// const Greeting = () => {
//   return React.createElement(
//     'div',
//     {},
//     React.createElement('h2', {}, 'My First Component')
//   )
// }

// NESTED COMPONENTS
const Greeting = () => {
  return (
    <>
      <Person />
      <Message />
    </>
  )
}
// Implicit return
const Person = () => <h2>Saiprasad Bhandare</h2>
// Return with curly
const Message = () => {
  return <p> This is the message</p>
}

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(<Greeting />)
