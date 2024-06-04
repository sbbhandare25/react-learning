import { useDispatch, useSelector } from 'react-redux'
import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { calculateTotals, getCartItems } from './features/cart/cartSlice'

function App() {
  const { cartItems, isLoading, isError } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='loading'>
        <h1>Error...</h1>
      </div>
    )
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
