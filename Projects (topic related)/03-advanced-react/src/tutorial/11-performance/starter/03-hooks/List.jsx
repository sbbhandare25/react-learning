import { memo } from 'react'
import Item from './Person'

const List = ({ people, removePerson }) => {
  console.log('List render')
  return (
    <div>
      {people.map((person) => {
        return <Item key={person.id} removePerson={removePerson} {...person} />
      })}
    </div>
  )
}
export default memo(List)
