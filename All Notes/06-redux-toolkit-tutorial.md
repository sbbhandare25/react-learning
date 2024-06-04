# Redux Toolkit

#### Docs

[Redux Toolkit Docs](https://redux-toolkit.js.org/introduction/getting-started)

#### Install Template

```sh
npx create-react-app my-app --template redux
```

- @latest

```sh
npx create-react-app@latest my-app --template redux
```

#### Existing App

```sh
npm install @reduxjs/toolkit react-redux
```

#### @reduxjs/toolkit

consists of few libraries

- redux (core library, state management)
- immer (allows to mutate state)
- redux-thunk (handles async actions)
- reselect (simplifies reducer functions)

#### Extras

- redux devtools
- combine reducers

#### react-redux

connects our app to redux

#### Setup Store

- create store.js

```js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```

#### Setup Provider

- index.js

```js
// import store and provider
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

#### Setup Cart Slice

- application feature
- create features folder/cart
- create cartSlice.js

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
})

console.log(cartSlice)

export default cartSlice.reducer
```

- store.js

```js
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})
```

#### Redux DevTools (extension)

#### Access store value

- create components/Navbar.js

```js
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart)

  return (
    <nav>
      <p>{amount}</p>
    </nav>
  )
}
export default Navbar
```

#### Setup Cart

- cartSlice.js

```js
import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
}
```

- create CartContainer.js and CartItem.js
- CartContainer.js

```js
import { useSelector } from 'react-redux'

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((state) => state.cart)

  if (amount < 1) {
    return <h4 className='empty-cart'>is currently empty</h4>
  }

  return (
    <section className='cart'>
      {/* cart items */}
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        total <span>${total}</span>
        <button className='btn clear-btn'>clear cart</button>
      </footer>
    </section>
  )
}
```

- CartItem.js

```js
const CartItem = ({ id, img, title, price, amount }) => {
  return <article className='cart-item'>item with all props.</article>
}
```

#### First Reducer

- cartSlice.js
- Immer library- Does heavy lifting of updating state automatically in reducers

```js
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      // Mutation state here itself using Immer library.
      state.cartItems = []
    },
    resetCart: (state) => {
      // Whatever we will return here will become new state.
      return initialState
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      console.log(action) // { payload: "our-value", type: "set-by-redux-by-default" }
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount += 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount -= 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
})

export const {
  clearCart,
  resetCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions
```

- create action (In older)

```js
const ACTION_TYPE = 'ACTION_TYPE'

const actionCreator = (payload) => {
  return { type: ACTION_TYPE, payload: payload }
}
```

- Use reducers in Cart.js:

```js
import { useDispatch } from 'react-redux'
import { clearCart, removeItem, increase, decrease, calculateTotals } from '../features/cart/cartSlice'

const CartItem = ({ id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  const handleClearCart = () = {
    dispatch(clearCart())
  }

  const handleRemoveItem = () = {
    dispatch(removeItem(id))
  }

  const handleIncrease = () = {
    dispatch(increase(id))
  }

  const handleDecrease = () = {
    dispatch(decrease(id))
  }

  return (
    <>
      <button onClick={handleClearCart}>clear cart</button>
      <button onClick={handleRemoveItem}>Remove Item</button>
      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
      <button onClick={handleDecrease}>Decrease</button>
    </>
  )
}

```

- Use reducers inApp.js

```js
import { useSelector, useDispatch } from 'react-redux'
import { calculateTotals } from './features/cart/cartSlice'

function App() {
  // Get cartItems from store.
  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  // Fetch latest amount and total if cartItems changes.
  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}
```

#### async functionality with createAsyncThunk (For getting status of store and showing loading etc)

- cartSlice.js
- action type
- callback function
- lifecycle actions
- thunkAPI: Allows to access store, dispatch action and return error from createAsyncThunk.

```js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    // name: parameter passed while calling getCartItems(name)
    // Default second param thunkAPI: Allows to access store, dispatch action and
    try {
      // "sai" if called like getCartItems("sai")
      console.log(name)
      // Get store of whole app.
      console.log(thunkAPI.getState())
      // Dispatch the reducer.
      thunkAPI.dispatch(calculateTotals())
      const resp = await axios(url)
      return resp.data
    } catch (error) {
      // Send error to `getCartItems.rejected` case.
      // Can access it in second param i.e. action.payload
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action)
        state.isLoading = false
      })
  },
})
```

- App.js

```js
function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return <>Component</>
}
```
