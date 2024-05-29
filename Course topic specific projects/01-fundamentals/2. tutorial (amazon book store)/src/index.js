import React from 'react'
import ReactDom from 'react-dom/client'
// MUST PROVIDE EXTENSION FOR CSS WHILE IMPORTING.
import './index.css'

const BookList = () => {
  return (
    <section className='booklist'>
      <Book />
      <Book />
      <Book />
      <Book />
    </section>
  )
}

const Book = () => {
  return (
    <article className='book'>
      {/* This is public image which we can use directly from images folder.
      This can accessed publicly using url:	http://localhost:3000/images/good-energy.jpg */}
      <img src='./images/good-energy.jpg' alt='Good Energy' />
      <h2>Good Energy</h2>
      <h4>Casey Means</h4>
    </article>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(<BookList />)
