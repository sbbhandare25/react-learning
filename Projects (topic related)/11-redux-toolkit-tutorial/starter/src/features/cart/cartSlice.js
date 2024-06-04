import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'
import axios from 'axios'

const url = 'https://www.course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
  isError: false,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    // name: parameter passed while calling getCartItems(name)
    // Default second param thunkAPI: Allows to access store, dispatch action and
    try {
      // "sai" if called like getCartItems("sai")
      // console.log(name)
      // Get store of whole app.
      // console.log(thunkAPI.getState())
      // Dispatch the reducer.
      // thunkAPI.dispatch(calculateTotals())

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
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
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
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload
        state.isLoading = false
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log('==========')
        console.log(action)
        state.isLoading = false
        state.isError = true
      })
  },
})

// console.log(cartSlice)

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions

export default cartSlice.reducer
