import { useState } from 'react'

const ShortCircuitOverview = () => {
  const [text, setText] = useState('')
  const [name, setName] = useState('susan')
  const codeExample = text || 'hello world'
  return (
    <div>
      {/* {if(someCondition){"won't work"}} */}

      <h4>Falsy OR : {text || 'hello world'}</h4>
      <h4>Falsy AND {text && 'hello world'}</h4>
      <h4>Truthy OR {name || 'hello world'}</h4>
      <h4>Truthy AND {name && 'hello world'}</h4>
      {codeExample}
    </div>
  )
}
export default ShortCircuitOverview
