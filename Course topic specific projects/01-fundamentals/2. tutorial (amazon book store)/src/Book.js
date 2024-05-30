const Book = ({ title, author, img, getBook, id, number }) => {
  return (
    <article className='book'>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <button onClick={() => getBook(id)}>display</button>
      <h4>{author}</h4>
      <span className='number'>{`#${number + 1}`}</span>
    </article>
  )
}

export default Book
