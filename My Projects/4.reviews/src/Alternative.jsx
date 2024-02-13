import { useState } from 'react'
import people from './data'
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa'

const App = () => {
  const [index, setIndex] = useState(0)
  const { id, name, job, image, text } = people[index]

  const checkNumber = (number) => {
    if (number > people.length - 1) return 0
    else if (number < 0) return people.length - 1
    else return number
  }

  const nextPerson = () => {
    setIndex((currentIndex) => checkNumber(currentIndex + 1))
  }
  const previousPerson = () => {
    setIndex((currentIndex) => checkNumber(currentIndex - 1))
  }
  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length)
    if (randomNumber === index) {
      randomNumber++
    }
    setIndex(checkNumber(randomNumber))
  }

  return (
    <main>
      <article className='review'>
        <div className='img-container'>
          <img src={image} alt={name} className='person-img' />
          <span className='quote-icon'>
            <FaQuoteRight />
          </span>
        </div>
        <h4 className='author'>{name}</h4>
        <p className='job'>{job}</p>
        <p className='info'>{text}</p>
        <div className='btn-container'>
          <button className='prev-btn' onClick={previousPerson}>
            <FaChevronLeft />
          </button>
          <button className='next-btn' onClick={nextPerson}>
            <FaChevronRight />
          </button>
        </div>
        <button className='btn btn-hipster' onClick={randomPerson}>
          surprise me
        </button>
      </article>
    </main>
  )
}
export default App
