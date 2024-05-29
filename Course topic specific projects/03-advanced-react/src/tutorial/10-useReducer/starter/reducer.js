import { data } from '../../../data'
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './actions'

const reducer = (state, { type, payload }) => {
  if (type === CLEAR_LIST) {
    return { ...state, people: [] }
  } else if (type === RESET_LIST) {
    return { ...state, people: data }
  } else if (type === REMOVE_ITEM) {
    const newPeople = state.people.filter((person) => person.id !== payload.id)
    return { ...state, people: newPeople }
  }
  throw new Error(`No matching action type - ${action.type}`)
}

export default reducer
