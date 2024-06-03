import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './actions'
import { data } from '../../../data'

const reducer = (state, { type, payload }) => {
  if (type === CLEAR_LIST) {
    return { ...state, people: [] }
  }
  if (type === RESET_LIST) {
    return { ...state, people: data }
  }
  if (type === REMOVE_ITEM) {
    if (!payload?.id) throw new Error(`Payload doesn't have "id"`)

    return {
      ...state,
      people: state.people.filter((person) => person.id !== payload.id),
    }
  }
  // If action type is invalid return state as is.
  throw new Error(`Invalid action type= ${type}`)
}

export default reducer
