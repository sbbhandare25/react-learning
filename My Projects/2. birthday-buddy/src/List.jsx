import Person from './Person'

const List = ({ people }) => {
  return (
    <section>
      {people.map((person) => (
        <Person key={person.id} {...person} />
      ))}
    </section>
  )
}
export default List
