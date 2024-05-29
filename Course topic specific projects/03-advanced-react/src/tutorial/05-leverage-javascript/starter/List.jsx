import { people } from '../../../data'
import Person from './Person'

const List = () => {
  return (
    <div>
      {people.map((person) => (
        <Person key={person.id} {...person} />
      ))}
    </div>
  )
}
export default List
