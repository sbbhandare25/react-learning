# React Fundamentals

#### React Course

#### Folder Structure

- node_modules
  Contains all dependencies required by the app. Main dependencies also listed in package.json

- public
  Contains static assets including index.html (page template)
  - index.html
    - title
    - fonts
    - css
    - favicon
    - id="root" - our entire app
- src
  In simplest form it's the brain of our app. This is where we will do all of our work. src/index.js is the JavaScript entry point.
- .gitignore
  Specifies which files source control (Git) should ignore

- package.json
  Every Node.js project has a package.json and it contains info about our project, for example list of dependencies and scripts

- package-lock.json
  A snapshot of the entire dependency tree

- README
  The markdown file where you can share more info about the project for example build instructions and summary

#### Remove Boilerplate

- remove src folder
- create src folder

  - create index.js inside src

- toggle sidebar CMD + B
- shortcuts settings/keyboard shortcuts

#### First Component

```js
function Greeting() {
  return <h2>My First Component</h2>
}

// arrow function also works
const Greeting = () => {
  return <h2>My First Component</h2>
}
```

- **starts with capital letter**
- **must return JSX (html)**
- **always close tag <Greeting/>**

##### Typical Component

```js
// imports or logic

const Greeting = () => {
  return <h2>My First Component</h2>
}
export default Greeting
```

##### Root Component (only one)

index.js

```js
import React from 'react'
import ReactDOM from 'react-dom/client'

function Greeting() {
  return <h2>My First Component</h2>
}
// Inject Greeting as root component to div with id "root" of index.html
const root = ReactDOM.createRoot(document.getElementById('root'))
// Render the Greeting component as root component
root.render(<Greeting />)
```

#### First Component in Detail

- capital letter
- must return something
- JSX syntax (return html)
  - Instead of explicitly calling createElement() func by ourself react does this under the hood upon returning the jsx to make our lives easier.

index.js

```js
const Greeting = () => {
  return React.createElement('h2', {}, 'hello world')
}
```

```js
function Greeting() {
  return (
    <div>
      <h2>hello world</h2>
    </div>
  )
}

const Greeting = () => {
  return React.createElement(
    'div',
    {},
    React.createElement('h2', {}, 'hello world')
  )
}
```

#### JSX Rules

- **return single element (one parent element)**

  - semantics section/article
  - **Fragment:** let's us **group elements without adding extra nodes**

```js
return <React.Fragment> actual elements to render </React.Fragment>

// shorthand

return <> actual elements to render </>
```

- **camelCase property naming convention (Ex. onclick = onClick, tabindex=tabIndex, for=htmlFor, class=className)**

```js
return (
  <div tabIndex={1}>
    <button onClick={myFunction}>click me</button>
    <label htmlFor='name'>Name</label>
    <input readOnly={true} id='name' />
  </div>
)
// in html
<div tabindex="1">
    <button onclick="myFunction()">click me</button>
    <label for='name'>Name</label>
    <input readonly id='name' />
</div>
```

- className instead of class

```js
return <div className='someValue'>hello</div>
```

- **close every element(Event for elements that don't have closing tag eg img, input)**

```js
return <img />
// or
return <input />
```

- **formatting**
  - **opening tag in the same line as return** or **()**

```js
function Greeting() {
  return (
    <>
      <div className='someValue'>
        <h3>hello people</h3>
        <ul>
          <li>
            <a href='#'>hello world</a>
          </li>
        </ul>
      </div>
      <h2>hello world</h2>
      <input type='text' name='' id='' />
    </>
  )
}
```

#### Nest Components

```js
function Greeting() {
  return (
    <div>
      <Person />
      <Message />
    </div>
  )
}

const Person = () => <h2>john doe</h2>
const Message = () => {
  return <p>this is my message</p>
}
```

#### Book List

- setup structure

```js
import React from 'react'
import ReactDOM from 'react-dom/client'

function BookList() {
  return (
    <section>
      <Book />
      <Book />
      <Book />
      <Book />
    </section>
  )
}

const Book = () => {
  return (
    <article className='book'>
      <Image />
      <Title />
      <Author />
    </article>
  )
}

const Image = () => (
  <img
    src='https://images-na.ssl-images-amazon.com/images/I/71m+Qtq+HrL._AC_UL900_SR900,600_.jpg'
    alt='Interesting Facts For Curious Minds'
  />
)
const Title = () => {
  return <h2>Interesting Facts For Curious Minds</h2>
}
const Author = () => <h4>Jordan Moore </h4>

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<BookList />)
```

#### CSS

- create index.css in src
- import file **(Must with extension css)** and add classes

````js
import './index.css'

#### Images ways to add:

- external images (hosted on different server) - just need an url
- local images (public folder) - less performant
- local images (src folder) - better solution for assets, since under the hood they get optimized.

#### Local Images (Public Folder)

- create images folder in public
- copy/paste image
- replace url in the src - './images/imageName.extension'
- './' because assets are on the same server

```js
const Image = () => (
  <img src='./images/book-1.jpg' alt='Interesting Facts For Curious Minds' />
)
````

- whatever assets we place in public - instantly available in domain(localhost)/asset i.e. like http://localhost:3000/images/good-energy.jpg

#### JSX - CSS (inline styles)

- **style** prop
- **{}** in JSX means going back to **JS Land**
- **value** is an **object with key/value pairs - capitalized and with ''**

```js
const Author = () => (
  <h4 style={{ color: '#617d98', fontSize: '0.75rem', marginTop: '0.5rem' }}>
    Jordan Moore
  </h4>
)
```

- alternative option

```js
// FOR THE MOST PART, MULTIPLE APPROACHES AVAILABLE !!!
// AS LONG AS THE RESULT IS THE SAME, REALLY COMES DOWN TO PREFERENCE !!!!
const Author = () => {
  const inlineHeadingStyles = {
    color: '#617d98',
    fontSize: '0.75rem',
    marginTop: '0.5rem',
  }
  return <h4 style={inlineHeadingStyles}>Jordan Moore </h4>
}
```

- **Priority order:** inline > Id selector > Classes, pseudo-classes and attributes
- **external libraries use inline css**, so if you want to make some changes **reference the library docs and elements tab**

#### JSX - Javascript

- **{} in JSX** means going back to **JS Land**
- **value inside** must be an **expression i.e. return value, can't be a statement**

```js
const author = 'Jordan Moore'
const Book = () => {
  const title = 'Interesting Facts For Curious Mindssssss'
  return (
    <article className='book'>
      <img
        src='./images/book-1.jpg'
        alt='Interesting Facts For Curious Minds'
      />
      {/* CORRECT (EXPRESSION) */}
      <h2>{title}</h2>
      <h4>{author.toUpperCase()} </h4>
      <p>{6 + 6}</p>
      {/* WRONG (STATEMENT) */}
      {/* <p>{let x = 6}</p> */}
    </article>
  )
}
```

#### Props - Initial Setup (single parameter of component)

- props object, convention to call param as `props`
- pass as key/value pairs
- if the prop exists it will return value, otherwise no value

```js
const Book = (props) => {
  console.log(props)
  return (
    <article className='book'>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <h4>{author} </h4>
      {console.log(props)}
    </article>
  )
}
```

#### Children Prop (\<Book>This is 'children' prop\</Book>")

- everything we render between component tags
- special prop, has to be "children"
- can place anywhere in JSX

```js
function BookList() {
  return <Book>Children prop content</Book>
}
const Book = ({ children }) => {
  return <article>{children}</article>
}
```

#### Map and Key Prop

- map: creates a new array from calling a function for every array element.
- typically it's going to be id (Must be unique, typically we name it id)
- Set key on the item we are returning while iterating over data.
- you will see index as id,but it's not advised if the list is changing

```js
const books = [
  { author: 'Jordan Moore', id: 1 },
  { author: 'James Clear', id: 2 },
]

function BookList() {
  return (
    <section>
      {books.map(({ author, id }) => (
        <Book book={book} key={id} /> // Pass entire object
      ))}
    </section>
  )
}
```

#### My Personal Preference(utilize spread operator (...))

```js
function BookList() {
  return (
    <section>
      {books.map(({ author, id }) => (
        <Book {...book} key={book.id} /> // use spread operator
      ))}
    </section>
  )
}
```

#### Events - Fundamentals

- Vanilla JS

```js
const btn = document.getElementById('btn')
btn.addEventListener('click', function (e) {
  // access event object
  // do something when event fires
})
```

- similar approach
- element, event, function
- again camelCase
- [React Events](https://reactjs.org/docs/events.html)
- no need to memorize them(idea is the same)
- most common
  - onClick (click events)
  - onSubmit (submit form )
  - onChange (input change )

```js
const EventExamples = () => {
  const handleButtonClick = () => {
    alert('handle button click')
  }
  return (
    <section>
      <button onClick={handleButtonClick}>click me</button>
    </section>
  )
}
```

#### Event Object and Form Submission

- **e.preventDefault():** Used to not use default behavior of Forms which is to collect the values and send it to some URL.
- Use `e.target` to get values of element that triggered the event.

```js
const EventExamples = () => {
  const handleFormInput = (e) => {
    console.log(e)
    // e.target - element
    console.log(`Input Name : ${e.target.name}`)
    console.log(`Input Value : ${e.target.value}`)
    // console.log('handle form input');
  }
  const handleButtonClick = () => {
    alert('handle button click')
  }
  const handleFormSubmission = (e) => {
    e.preventDefault()
    console.log('form submitted')
  }
  return (
    <section>
      {/* add onSubmit Event Handler */}
      <form onSubmit={handleFormSubmission}>
        <h2>Typical Form</h2>
        <input
          type='text'
          name='example'
          onChange={handleFormInput}
          style={{ margin: '1rem 0' }}
        />
        {/* add button with type='submit' */}
        <button type='submit'>submit form</button>
      </form>
      <button onClick={handleButtonClick}>click me</button>
    </section>
  )
}
```

- alternative approach by using `onClick on button` submit instead of `onSubmit on form` using anonymous function.

```js
<button
  type='submit'
  onClick={(e) => {
    e.preventDefault()
  }}
>
  submit form
</button>
```

- components are independent by default. Each event of particular component references that component only and not other component.

#### Prop Drilling

- react data flow - can only pass props down
- alternatives Context API, redux, other state libraries
- Pass props of parent to child is not prop drilling. But passing it to grandchild and child don't use props but only grandchild then its prop drilling.

#### More Complex Example

```js
const BookList = () => {
  const getBook = (id) => {
    const book = books.find((book) => book.id === id)
    console.log(book)
  }

  return (
    <section className='booklist'>
      {books.map((book) => {
        /* Pass getBook fun as props */
        return <Book {...book} key={book.id} getBook={getBook} />
      })}
    </section>
  )
}

const Book = ({ img, title, author, getBook, id }) => {
  return (
    <article className='book'>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      {/* this is not going to work */}
      <button onClick={getBook(id)}>display title</button>
      <h4>{author}</h4>
    </article>
  )
}
```

- two fixes
- setup normal wrapper || or wrap in the anonymous arrow function

```js
const Book = ({ img, title, author, getBook, id }) => {
  /* Wrapper fun */
  const getSingleBook = () => {
    getBook(id)
  }
  return (
    <article className='book'>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      {/* Wrapper fun */}
      <button onClick={getSingleBook}>display title</button>
      {/* Or anonymous Wrapper fun */}
      <button onClick={() => getBook(id)}>display title</button>
      <h4>{author}</h4>
    </article>
  )
}
```

#### Import and Export Statements

- setup two files in src books.js and Book.js
- cut bookList array from index.js and add to books.js
- cut Book component from index.js and add to Book.js

- two flavors named and default exports
  - with named exports names MUST match
  - with default exports,can rename but only one per file

#### Local Images (src folder) (import img1 from './images/book-1.jpg')

- better performance because images optimized by react when creating prod build.
- import all three images in the books.js
- set image property equal to import
- and yes each image requires new import

```js
import img1 from './images/book-1.jpg'

export const books = [
  {
    author: 'Jordan Moore',
    img: img1,
    id: 1,
  },
]
```

#### Build Production Application

- stop the dev server "ctrl + c"
- run "npm run build"
- build folder gets created
- Deploy the folder if want to

#### Strict mode, reportWebVitals

- **StrictMode:** Tool for `highlighting potential problems` in an application.Activates `additional checks and warnings` for its descendants.Runs only in Development, does `not impact` the `production build`. `RENDERS TWICE !!!`
- **reportWebVitals**: Enables measuring performance of app. To log performance do `reportWebVitals(console.log))`

```js
// import report web vitals
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
// StrictMode
// StrictMode is a Possible to remove.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

#### Vite Docs

(Vite)[https://vitejs.dev/]

#### Vite Install

```sh
npm create vite@latest app-name -- --template react
npm install
npm run dev
```

- http://localhost:5173/

#### Vite Setup

- need to use `.jsx extension`
- `public` folder for public files.
- `src/assets` folder for local files.
- Start file is `main.jsx`
- to spin up dev server - `npm run dev`
- rest the same - imports/exports, deployment, assets, etc...
