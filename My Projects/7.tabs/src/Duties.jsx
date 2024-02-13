import { FaAngleDoubleRight } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'

const Duties = ({ duties }) => {
  return (
    <div>
      {duties.map((duty) => (
        <div key={uuidv4()} className='job-desc'>
          <FaAngleDoubleRight className='job-icon' />
          <p>{duty}</p>
        </div>
      ))}
    </div>
  )
}
export default Duties
