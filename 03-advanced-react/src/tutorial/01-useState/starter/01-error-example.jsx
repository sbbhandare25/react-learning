const ErrorExample = () => {
  let count = 0

  const increment = () => {
    count++
    console.log(count)
  }

  return (
    <>
      <h2>useState error example</h2>
      <h3>Count: {count}</h3>
      <button type='button' onClick={increment}>
        Increment
      </button>
    </>
  )
}

export default ErrorExample
