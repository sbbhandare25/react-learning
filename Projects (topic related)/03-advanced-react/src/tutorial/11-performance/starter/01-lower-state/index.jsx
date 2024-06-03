import { useState } from 'react'
import { data } from '../../../../data'
import List from './List'
import Count from './Count'

const LowerState = () => {
  const [people, setPeople] = useState(data)
  return (
    <section>
      <Count />
      <List people={people} />
    </section>
  )
}
export default LowerState
