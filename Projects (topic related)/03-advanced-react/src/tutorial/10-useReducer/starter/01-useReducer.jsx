import React from 'react'
import { data, people } from '../../../data'
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './actions'
import reducer from './reducer'

const defaultState = {
  people: data,
}

const ReducerBasics = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState)

  const clearItems = () => {
    dispatch({ type: CLEAR_LIST })
  }
  const resetItems = () => {
    dispatch({ type: RESET_LIST })
  }
  const removeItem = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
  }
  return (
    <div>
      {state.people.map((person) => {
        const { id, name } = person
        return (
          <div key={id} className='item'>
            <h4>{name}</h4>
            <button onClick={() => removeItem(id)}>remove</button>
          </div>
        )
      })}
      {state.people.length ? (
        <button
          className='btn'
          style={{ marginTop: '2rem' }}
          onClick={clearItems}
        >
          clear
        </button>
      ) : (
        <button
          className='btn'
          style={{ marginTop: '2rem' }}
          onClick={resetItems}
        >
          reset
        </button>
      )}
    </div>
  )
}

export default ReducerBasics
