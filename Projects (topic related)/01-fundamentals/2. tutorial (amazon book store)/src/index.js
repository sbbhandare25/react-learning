import React from 'react'
import ReactDom from 'react-dom/client'
import { bookList } from './books'
import Book from './Book'
// MUST PROVIDE EXTENSION FOR CSS WHILE IMPORTING.
import './index.css'

const BookList = () => {
  const findBook = (id) => {
    const book = bookList.find((book) => book.id === id)
    console.log(book)
  }
  return (
    <>
      <h1>amazon best sellers</h1>
      <section className='booklist'>
        {bookList.map((book, index) => (
          <Book {...book} key={book.id} getBook={findBook} number={index} />
        ))}
      </section>
    </>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'))

root.render(<BookList />)
