## Advanced Topics

#### The Need For State

Setup Challenge :

- create count variable & display value in the JSX
- add button and increase the value
- the reason for bug - we don't trigger re-render

```js
const ErrorExample = () => {
  let count = 0

  const handleClick = () => {
    count = count + 1
    console.log(count)
    // preserve value between renders trigger re-render
  }
  return (
    <div>
      <h2>{count}</h2>
      <button type='button' className='btn' onClick={handleClick}>
        increment
      </button>
    </div>
  )
}

export default ErrorExample
```

#### useState Basics

- useState hook
- returns an array with two elements: the current state value, and a function that we can use to update the state
- accepts default value as an argument
- state update triggers re-render

```js
import { useState } from 'react'

const UseStateBasics = () => {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      <h4>You clicked {count} times</h4>
      <button className='btn' onClick={handleClick}>
        Click me
      </button>
    </div>
  )
}

export default UseStateBasics
```

#### Initial Render and Re-Renders

In a React application, the `initial render` is the `first time` that the `component tree is rendered to the DOM`. It `happens` when the `application first loads`, `or` when the `root component is first rendered`. This is also known as `"mounting" the components`.

`Re-renders`, on the other hand, happen when the `component's state or props change`, and the `component needs to be updated in the DOM` to reflect these changes. React `uses a virtual DOM` to `optimize the process of updating the actual DOM`, so that `only the necessary changes are made`.

There are a few `ways` that you can `trigger a re-render` in a React component:

- By `changing the component's state or props`. When the component's state or props change, React will re-render the component to reflect these changes.

- When the `parent element re-renders`, even if the component's state or props have not changed.

#### General Rules of Hooks

- `starts with "use"` (both -`react` and `custom hooks`)
- `component` must be `uppercase`
- `invoke inside function/component body`
- `don't call hooks conditionally` (cover later)
- `set` functions `don't update state immediately` (cover later)

#### useState with Array

Setup Challenge :

- import data
- setup a state value
  - people - default value equal to data
- display list(people) in the browser
- create two functions
  - one that removes single item from the list
  - one that clears entire list

```js
const UseStateArray = () => {
  const [people, setPeople] = React.useState(data)
  const removeItem = (id) => {
    let newPeople = people.filter((person) => person.id !== id)
    setPeople(newPeople)
  }
  const clearItems = () => {
    setPeople([])
  }
  return <>Code</>
```

#### Automatic Batching

In React, `batching` refers to the `process of grouping multiple state updates into` a `single update`. This can be useful in certain cases because it allows React to optimize the rendering of your components by `minimizing the number of DOM updates` that it has to perform.

By `default`, React uses a technique called `"auto-batching"` to `group state updates that occur within the same event loop into a single update`. This means that if you `call the state update function multiple times in a short period of time`, React will only `perform a single re-render for all` of the updates.

`React 18 ensures` that `state updates invoked from any location will be batched by default`. This will `batch state updates, including native event handlers, asynchronous operations, timeouts, and intervals`.

#### Switch to Object instead of useState for each key of object.

```js
const UseStateObject = () => {
  const [person, setPerson] = useState({
    name: 'peter',
    age: 24,
    hobby: 'read books',
  })

  const displayPerson = () => {
    setPerson({ name: 'john', age: 28, hobby: 'scream at the computer' })
  }
  return <></>
}
```

#### Set Function "Gotcha"

Keep in mind that the `state update function setState does not immediately mutate the state. Instead, it schedules an update to the state and tells React that it needs to re-render the component`. The `actual state update will be performed as part of the next rendering cycle`. Be mindful when you need to set state value based on a different state value.

trivial example

```js
const UseStateGotcha = () => {
  const [value, setValue] = useState(0)
  const handleClick = () => {
    setValue(value + 1)
    //  be careful it's the old value
    console.log(value)
    //  so if you have any functionality
    // that relies on the latest value
    // it will be wrong !!!
  }
  return <></>
}
```

If you want to `update the state immediately` and synchronously, you can `pass a function to setState that receives the previous state as an argument and returns the new state`. For example:

```js
setState((prevState) => {
  return { ...prevState, value: newValue }
})
```

This can be `useful` if you need to update the state `based on the previous state`, or if you need to `update the state synchronously`.

```js
const handleClick = () => {
  setValue((currentState) => {
    // must return otherwise undefined
    // below is the latest/current state value
    const newState = currentState + 1
    return newState
  })
}
```

- setTimeout Example

```js
const handleClick = () => {
  // Here even if you click button 100 times in 3 sec
  // The value will be 1 only as all 100 times it calls
  // setState(0 + 1) and not uses prev value to increment.
  // setTimeout(() => {
  // console.log('clicked the button');
  //   setValue(value + 1);
  // }, 3000);
  setTimeout(() => {
    console.log('clicked the button')
    setValue((currentState) => {
      return currentState + 1
    })
  }, 3000)
}
```

#### useEffect Basics

`useEffect` is a hook in React that allows you to `perform side effects` in function components.There is no need for urban dictionary - basically `any work outside of the component`. Some `examples` of `side effects` are: `subscriptions, fetching data, directly updating the DOM, event listeners, timers, etc.`

- useEffect hook
- accepts `two arguments (second optional)`
- `first` argument - `cb function`
- `second` argument - `dependency array`
- by `default runs on each render => useEffect(cb)` (initial and re-render)
- `cb can't return promise` (so can't make it async)
- if `dependency array empty` runs only on `initial render => useEffect(cb, [])`
- if `dependency array contains variable` runs `only when variable value changes => useEffect(cb, [variable])`

#### Multiple Effects

```js
const MultipleEffects = () => {
  const [value, setValue] = useState(0)
  const [secondValue, setSecondValue] = useState(0)

  useEffect(() => {
    console.log('hello from first useEffect')
  }, [value])

  useEffect(() => {
    console.log('hello from second useEffect')
  }, [secondValue])
  return <></>
}
```

#### Cleanup Function (Code to run while unmounting)

```js
useEffect(() => {
  return () => {
    // clean up fun to clear intervals, event listeners, subscriptions etc.
  }
}, [])
```

#### You Might Not Need an Effect

[You Might Not Need an Effect](https://beta.reactjs.org/learn/you-might-not-need-an-effect)

- will still utilize useEffect
- there is still plenty of code using useEffect

- fetching data replaced by libraries - react query, rtk query, swr or next.js

- Example:

```js
import { useHook } from 'library'

function Example() {
  const { data, error, isLoading } = useHook('url', fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

Data Fetching :

- usually three options
  - loading - waiting for data to arrive (display loading state)
  - error - there was an error (display error message)
  - success - received data (display data)

```js
const fetchUser = async () => {
  try {
    // Fetch user
    setUser(user)
  } catch (error) {
    setIsError(true)
    console.log(error)
  }
  // hide loading
  setIsLoading(false)
}
```

#### Fetch Errors "Gotcha" (optional)

Unlike for example Axios, by default, the `fetch() API` `does not consider` HTTP status codes in the `4xx` or `5xx` range to be `errors`. `Instead`, it `considers` these status codes to be `indicative of a successful request`

```js
try {
const resp = await fetch(url);
// console.log(resp);
if (!resp.ok) {
  setIsError(true);
  setIsLoading(false);
  return;
}
const user = await resp.json();
setUser(user);
}
```

#### Order Matters - Solution

- retrieve date returned from APIs/urls only when its available.

#### DON'T CALL HOOKS CONDITIONALLY

```js
const Example = () => {
  const [condition, setCondition] = useState(true)
  if (condition) {
    // won't work
    const [state, setState] = useState(false)
  }
  return <h2>example</h2>
}
```

#### Truthy and Falsy Values (optional)

- Falsy values:
  false
  0 (zero)
  "" (empty string)
  null
  undefined
  NaN (Not a Number)
- All other values truthy

#### Short Circuit Evaluation (optional)

Vanilla JS

In JavaScript, `short-circuit evaluation` is a `technique` that `allows` you to use `logical operators` (such as && and ||) to `perform conditional evaluations` in a concise way.

The `&&` operator (logical AND) `returns` the `first operand if` it is `"falsy"`, `or` the `second operand if` the `first` operand is `"truthy"`.

The `||` operator (logical OR) `returns` the `first operand if` it is `"truthy"`, `or` the `second operand if` the `first` operand is `"falsy"`.

#### Ternary Operator

```js
condition ? expression1 : expression2
```

If `condition is truthy`, the operator will `return expression1`. If condition is `falsy`, it will `return expression2`.

#### Project Structure - Extra Extensions

- code spell checker - works well with code and documents.
- glean - easy extract JSX into a new component

#### Controlled Inputs

- setup state values
- add value (= stateVal) and onChange(=setState) to each input
- setup onSubmit (access state values to do operation)
- htmlFor(label) === id(input)

```js
import { useState } from 'react'
const ControlledInputs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // do something
    console.log(name, email)
  }
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h4>controlled inputs</h4>
      <div className='form-row'>
        {/* htmlFor(label) === id(input) */}
        <label htmlFor='name' className='form-label'>
          name
        </label>
        <input
          type='text'
          className='form-input'
          // Set value and onChange to use state name
          value={name}
          onChange={(e) => setName(e.target.value)}
          id='name'
        />
      </div>
      <div className='form-row'>
        <label htmlFor='email' className='form-label'>
          Email
        </label>
        <input
          type='email'
          className='form-input'
          id='email'
          // Set value and onChange to use state email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-block'>
        submit
      </button>
    </form>
  )
}
export default ControlledInputs
```

#### Multiple Inputs

- inputs must have name attribute

```js
const MultipleInputs = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {}
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        {/* name */}
        <input
          type='text'
          className='form-input'
          id='name'
          name='name' // Set name = name
          value={user.name}
          onChange={handleChange}
        />
        {/* Same for email and password */}
        <button> submit </button>
      </form>
    </div>
  )
}
export default MultipleInputs
```

#### Other Inputs

1. For checkbox use `e.target.checked` instead of `value`
2. For select options i.e. List: use `e.target.value`

```js
const frameworks = ['react', 'angular', 'vue', 'svelte']
const OtherInputs = () => {
  const [shipping, setShipping] = useState(false)
  const [framework, setFramework] = useState('react')

  const handleShipping = (e) => {
    setShipping(e.target.checked)
  }
  const handleFramework = (e) => {
    setFramework(e.target.value)
  }
  return (
    <div>
      <form className='form'>
        <h4>Other Inputs</h4>
        {/* Checkbox */}
        <input
          type='checkbox'
          checked={shipping}
          id='shipping'
          name='shipping'
          onChange={handleShipping}
        />
        {/* List, select */}
        <select
          name='framework'
          id='framework'
          value={framework}
          onChange={handleFramework}
        >
          {frameworks.map((framework) => {
            return <option key={framework}>{framework}</option>
          })}
        </select>
        <button>submit</button>
      </form>
    </div>
  )
}
```

#### FormData API (Better approach compared to controlled form. Use if have more than 1 inputs)

```js
import Starter from './tutorial/06-forms/starter/05-form-data.jsx'
```

[JS Nuggets - FormData API](https://youtu.be/5-x4OUM-SP8)

- a great solution when you have bunch of inputs
- `inputs must have name attribute`

The `FormData interface` provides a way to `construct a set of key/value pairs representing form fields and their values`, which can be sent using the fetch() or XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data".

- `e.currentTarget:` In React, it `returns` the `DOM element` that `triggered the event`.
- `Object.fromEntries()`: `static method transforms` a `list of key-value pairs` into an `object`.

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42],
])
// Expected output: Object { foo: "bar", baz: 42 }
```

- `e.currentTarget.reset()`: The method is a `built-in method in HTML` that can be `used to reset all form controls to their initial values`. When this method is called on a form element, it will `clear any user-entered data` and `reset` the values of all form elements to `their default values`.

```js
const UncontrolledInputs = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    // e.currentTarget points to element that has triggered the event. In our case it is our form.
    const formData = new FormData(e.currentTarget)
    // Get single input value.
    console.log(formData.get('name'))
    // Get all inputs value in array form.
    console.log([...formData.entries()]) // [['name', 'name-value'], ['email', 'email-value']]
    // Get all inputs value in object form.
    const newUser = Object.fromEntries(formData) // { name: 'name-val', email: 'email-val'}
    // Reset The form
    e.currentTarget.reset()
  }
  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        {/* name */}
        <input type='text' id='name' name='name' />
        {/* email */}
        <input type='email' id='email' name='email' />
        {/* password */}
        <input type='password' id='password' name='password' />
        {/* Submit btn */}
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}
```

#### useRef

- `DOES NOT TRIGGER RE-RENDER`
- `preserves` the `value between renders`
- `target DOM nodes/elements`

```js
const UseRefBasics = () => {
  const refContainer = useRef(null)
  const isMounted = useRef(false)

  useEffect(() => {
    // This doesn't trigger re-render in infinite loop as
    // useRef doesn't re-render.
    refContainer.current.focus()
  })

  useEffect(() => {
    // This enables us to not execute this section
    // in initial render. It executes console.log
    // only when comp is re-rendered.
    if (!isMounted.current) {
      isMounted.current = true
      return
    }
    console.log('re-render')
  }, [value])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(refContainer.current.value)
  }

  return <form onSubmit={handleSubmit}> Form </form>
}
```

#### Custom Hooks

- `same rules` as `regular hooks`
- `simplify component` (less code)
- `re-use functionality`

useToggle.js

```js
const useToggle = (defaultValue) => {
  const [show, setShow] = useState(defaultValue)
  const toggle = () => {
    setShow(!show)
  }
  return { show, toggle }
}
```

- Challenge: `custom fetch hook`

- hint : hook should `return isLoading,isError,user and take url` as parameter

```js
const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  // change state value
  const [data, setData] = useState(null)

  useEffect(() => {
    // change name
    const fetchData = async () => {
      try {
        const resp = await fetch(url)

        if (!resp.ok) {
          setIsError(true)
          setIsLoading(false)
          return
        }
        // change to response
        const response = await resp.json()
        setData(response)
      } catch (error) {
        setIsError(true)
        // console.log(error);
      }
      // hide loading
      setIsLoading(false)
    }
    // invoke fetch data
    fetchData()
  }, [])

  return { isLoading, isError, data }
}
```

#### Context API

- Solves prop drilling issue
- `createContext()` returns:

  - `Provider`: To `add/provide` values
  - `Consumer`: To `get/consume` values. (`Replaced by useContext` hook)

- Ex. Component nest order. NavBar > NavLink > UserContainer. Now pass value from NavBar to UserContainer directly.

NavBar:

```js
export const NavbarContext = createContext()
// Custom Hook
export const useAppContext = () => useContext(NavbarContext)

const Navbar = () => {
  return (
    <NavbarContext.Provider value={dataForGrandChild}>
      {/* dataForGrandChild available only for components present here */}
      <NavLink /> and other stuff/component that need dataForGrandChild
    </NavbarContext.Provider>
  )
}
```

NavLink: Normal component w/o prop drilling

UserContainer:

```js
const UserContainer = () => {
  const dataForGrandChild = useAppContext(NavbarContext)
}
```

#### Setup Global Context

- in src create context.jsx
- setup a global context - GlobalContext
- setup a component (AppContext) with one state value
- return GlobalContext.Provider from AppContext
- wrap then entire application (main.jsx) - children prop "gotcha"
- setup a custom hook
- access in App.jsx
- log result

context.jsx

```js
// Create global context
const GlobalContext = createContext()
// Create custom hook to access global context
export const useGlobalContext = () => useContext(GlobalContext)

// Use `children prop` to `render App` component
// and `allow access` of `context` to `whole app`.
const AppContext = ({ children }) => {
  return (
    <GlobalContext.Provider value={CONTEXT_DATA}>
      {children}
    </GlobalContext.Provider>
  )
}
```

main.jsx

```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContext>
    <App />
  </AppContext>
)
```

app.jsx

```js
function App() {
  const CONTEXT_DATA = useGlobalContext()
}
```

#### useReducer

Challenge:

- create component that shows list of persons.
- Has functionality to clear, reset, remove person.

actions.js

```js
export const CLEAR_LIST = 'CLEAR_LIST'
export const RESET_LIST = 'RESET_LIST'
export const REMOVE_ITEM = 'REMOVE_ITEM'
```

reducer.js

```js
import { CLEAR_LIST, RESET_LIST, REMOVE_ITEM } from './actions' // & import data

// State = existing state
// Second param can contain anything. But general senses is to have `type` & `payload`.
// Type - type of action to perform
// Payload - additional param needed to perform action.
// Returns: Whatever returned by this fun is updated state.
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
```

app.jsx

```js
// Import actions and reducer and other required.
// Define default state for useReducer hook.
const defaultState = { people: data }

const Component = () => {
  // Define default state val and reducer fun.
  // Returns current state and dispatch to call reducer fun.
  const [state, dispatch] = useReducer(reducer, defaultState)
  // Clear Items.
  const clearItems = () => dispatch({ type: CLEAR_LIST })
  // Reset Items.
  const resetItems = () => dispatch({ type: RESET_LIST })
  // Remove Item with id as payload.
  const removeItem = (id) => dispatch({ type: REMOVE_ITEM, payload: { id } })
  // Return jsx
  return <div>Component</div>
}
```

#### Performance

#### Lower State / Push The State Down

When Component Re-Renders :

- When the `component's state or props change`, `React` will `re-render` the `component` to reflect these changes.
- When the `parent element re-renders`, `even if child` the `component's state or props not changed` it is `re-rendered`
- `Move` that `jsx` that's `causing` the `other components re-render` to as `lower state`.

#### React.memo()

React.memo is a `higher-order component (HOC)` in React that `allows` you to `memoize a component`. This `means` that `if` the input `props to` the `component` have `not changed`, the memoized component will `return` the `same result from` the `previous render`, `instead of re-rendering`. This can help improve performance by avoiding unnecessary render cycles.

The React.memo function `takes a functional component as` its `argument` and `returns a new component` that `has the same behavior`, but `with` the `added optimization of checking` if the `props have changed`. If the `props have not changed`, the memoized component will `return the cached result from the previous render`.

```js
const MyComponent = React.memo(function MyComponent(props) {
  /* render logic */
})
```

- **Note:** `From parent component` if you are `passing function as props to child` component remember that `every time parent component is re-rendered` the `function prop will be created from scratch` and `JS` will `consider that prop changed so child component will be re-rendered even if you use memo`.

#### UseCallback

The useCallback hook is a `hook` in React that `allows` you to `memoize function`. It `takes two arguments`: the `first` is the `function` you want `to memoize`, and the `second` is an `array of dependencies`. The hook will `returns` a `memoized version of the function that only changes` if one of the values in the `dependency array changes.`

By memoizing the function, you can avoid unnecessary re-renders and improve the performance of your React application. The `function will only be re-created if one of its dependencies changes`, `otherwise` the `same instance of the function` will be `returned`. This can be useful in situations where you have an expensive function that you only want to recompute when its dependencies change.

**NOTE:** If `dependency array is empty` then `function` is `created only in initial rendering` just `like useEffect`.

```js
function MyComponent() {
  const [data, setData] = useState([])

  // This function will only be re-created if the `data` prop changes
  const handleClick = useCallback(() => {
    console.log(data)
  }, [data])

  return <button onClick={handleClick}>Click me</button>
}
```

#### useCallback - Common Use Case

- In create react app for useEffect if dependency array is empty it throws warning. We can solve this using useCallback.

```js
const FetchData = () => {
  // Create fetch data only once using useCallback(cb, []).
  const fetchData = useCallback(async () => {
    // Code of fetch data
  }, [])

  useEffect(() => {
    fetchData()
    // Even if we add fetchData as dependency as its rendered/created only once
    // it won't cause an issue of infinite loop.
  }, [fetchData])
  // rest of the logic
}
```

#### useMemo

The useMemo hook is a `hook` in React that `allows you to memoize a value`. It takes `two arguments`: the `first` is a `function that returns the value you want to memoize`, and the `second` is an `array of dependencies`. The `hook` will `return memoized value that will only change if` one of the `values in the dependency array changes`.

`By memoizing a value`, you can `avoid unnecessary calculations` and improve the performance of your React application. The `value` will only be `recalculated if one of its dependencies changes`, otherwise the same instance of the value will be returned. This can be `useful in situations where you have an expensive calculation` that you only want to `recompute when its dependencies change`.

```js
function MyComponent({ data }) {
  const processedData = useMemo(() => {
    // Consider this as expensive operation.
    return data.map((item) => item.toUpperCase())
  }, [data])

  return <div>{processedData}</div>
}
```

#### useTransition

- useTransition is a React `Hook` that lets you `update the state without blocking the UI`.
- Returns `[isPending(status), startTransition(function)]`
- `startTransition` takes cb which is expensive operation. Ex `startTransition(cb)`

```js
const LatestReact = () => {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  // useTransition.
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    setText(e.target.value)

    // Start CPU intensive operation processing in background .
    startTransition(() => {
      const newItems = Array.from({ length: 5000 }, (_, index) => {
        return (
          <div key={index}>
            <img src='/vite.svg' alt='' />
          </div>
        )
      })
      setItems(newItems)
    })
  }
  return (
    <section>
      <input onChange={handleChange} />
      <h4>Items Below</h4>
      {isPending ? 'Loading...' : <div>{items}</div>}
    </section>
  )
}
```

#### Suspense API

The Suspense API is a `feature in React` that `allows you to manage the loading state of your components`. It `provides way to "suspend" rendering of a component until some data has been fetched`, and `display a fallback UI in the meantime`. This `makes it easier to handle asynchronous data loading` and provide a smooth user experience in your React application.

```js
import React, { lazy, Suspense } from 'react'

const DataComponent = lazy(() => import('./DataComponent'))

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent />
    </Suspense>
  )
}
```
