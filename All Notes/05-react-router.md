#### React Router

#### SPA

SPA stands for `Single-Page Application`, which is a `web application that dynamically updates its content without requiring a full page reload`. It `achieves this by loading the initial HTML, CSS, and JavaScript resources` and `then dynamically fetching data and updating the DOM as users interact with the application`.

`React Router` is a JavaScript library used in React applications `to handle routing and navigation`. It `provides a declarative way to define the routes of an application` and render different components based on the current URL. React Router allows developers to `create a seamless, client-side navigation experience within a SPA by mapping URLs to specific components and managing the history and URL changes`.

[React Router](https://reactrouter.com/en/main)

```sh
npm i react-router-dom@6.11.2
```

App.jsx

```js
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h2>home page</h2> || <HomeLayout />,
  },
  {
    path: '/about',
    element: (
      <div>
        <h2>about page</h2>
      </div>
    ) || <About />,
  },
])
const App = () => {
  return <RouterProvider router={router} />
}
export default App
```

#### Link Component

```js
import { Link } from 'react-router-dom'
const HomeLayout = () => {
  return (
    <div>
      <h1>HomeLayout</h1>
      <Link to='/about'>About</Link>
    </div>
  )
}

/// =========================
const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Link to='/'>Back Home</Link>
    </div>
  )
}
```

#### Nested Pages

App.jsx

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    // For wrong url. Errors bubble up.
    errorElement: <ErrorPage/>,
    children: [
      {
        // If path is only `/` by default
        // Show Landing comp as Outlet comp.
        index:true
        element: <Landing />,
      },
      {
        path: 'cocktail',
        element: <Cocktail />,
      },
      {
        path: 'newsletter',
        element: <Newsletter />,
      },
      {
        path: 'about',
        element: <About />,
        children: [
          {
            path: 'company',
            element: <h2>Our company</h2>
            // Add Outlet comp in About component
          }
        ]
      },
    ],
  },
]);
```

HomeLayout.jsx

```js
import { Outlet } from 'react-router-dom'
const HomeLayout = () => {
  return (
    <div>
      <nav>navbar</nav>
      {/* RENDER DYNAMIC COMPONENT */}
      <Outlet />
    </div>
  )
}
```

#### Error Page

- wrong url, add errorElement while defining route.

Error.jsx

```js
import { Link, useRouteError } from 'react-router-dom'

const Error = () => {
  // Get error details from router.
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return <ErrorPageFor404>
  }
  return <GenericErrorPage>
}
```

#### Fetch (Before initial render - useEffect approach)

```js
useEffect(() => {
  fetchSomething()
}, [])
```

#### Loader (Fetch before going to route) && Single page error && route param

`Each route` can `define` a `"loader" function to provide data to` the `route element before it renders`.

- `must return something` even "null" otherwise error
- `useLoaderData`: `Use this in comp` to `access data returned by loader`.

Landing.jsx

```js
import { useLoaderData } from 'react-router-dom'

export const loader = async () => {
  // Most likely it will return async API response.
  return 'something'
}

const Landing = () => {
  const data = useLoaderData()
  console.log(data)
  return (
    <>
      <h1>Landing: {data}</h1>
      <Link to={`/cocktail/${id}`}>details</Link>
    </>
  )
}
export default Landing
```

```js
import { loader as landingLoader } from './pages/Landing.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:<Error/>
    children: [
      {
        index: true,
        // DEFINE IMPORTED LOADER
        loader: landingLoader,
        element: <Landing />,
      },
      {
        index: true,
        // DEFINE LOADER HERE ITSELF.
        loader: () => {
          // do stuff here
        },
        element: <Landing />,
        // ERROR PAGE FOR THIS PAGE
        errorElement: <SinglePageError>,
      },
      {
        // SINGLE PAGE DETAILS USING 'ID' PARAM
        path: 'cocktail/:id',
        loader: singleCocktailLoader,
        element: <Cocktail />
      }
      // rest of the routes
    ],
  },
]);
```

#### Global Loading and Context

- `useNavigation`: Fetch `loading status of page` using `useNavigation().state  === 'loading` and show spinner.
- `useOutletContext`: Access the context provided on `Outlet` component in all children.

```js
import { Outlet, useNavigation, useOutletContext } from 'react-router-dom'

const HomeLayout = () => {
  // Fetch the status of page loading using useNavigation route.
  const navigation = useNavigation()
  const isPageLoading = navigation.state === 'loading'

  const value = 'some value'
  return (
    <>
      <Navbar />
      <section className='page'>
        {/* BASED ON LOADING STATE SHOW Outlet Component */}
        {isPageLoading ? (
          <div className='loading' />
        ) : (
          {/* THIS context WILL BE AVAILABLE TO ALL COMP THAT WILL BE SHOWN IN OUTLET */}
          {/* ACCESS THIS USING `useOutletContext` in child comp */}
          <Outlet context={{ name: 'sai' }} />
        )}
      </section>
    </>
  )
}

const ChildComponent = () => {
  const data = useOutletContext();
  console.log(data); /// name: 'sai'
  return <>Child<>
}
```

#### Access route params.

- Can access in `params field` of `parameter` in `loader function`.
- path: `cocktail/:id`

```js
export const loader = async ({ params }) => {
  // `id` is present in params of loader.
  const { id } = params
  const { data } = await axios.get(`${singleCocktailUrl}${id}`)
  return { id, data }
}

const Cocktail = () => {
  const { id, data } = useLoaderData()
  // if (!data) returns Error page.
  // So let's "DYNAMICALLY ROUTE" it to home page if data not available.
  if (!data) return <Navigate to='/' />
  return <>Component data</>
}
```

#### Default Behavior of form submission

```html
<form method="GET/POST" action=""></form>
```

The `method` attribute in an HTML form `specifies` the `HTTP method` to be `used when submitting the form data to the server`. The two `commonly used values` for the "method" attribute are:

`GET`: This is the `default method if` the `"method" attribute is not specified`. `When` the `form is submitted` with the GET method, the `form data is appended to the URL as a query string`. The `data becomes visible in the URL, which can be bookmarked and shared`. GET requests are generally used for retrieving data from the server and should not have any side effects on the server.

`POST`: When the form is submitted with the POST method, the `form data is included in the request payload rather than being appended to the URL`. POST requests are typically used when submitting sensitive or large amounts of data to the server, as the `data is not directly visible in the URL`. POST requests can have side effects on the server, such as updating or inserting data.

- `action` attribute

  The `"action" attribute` in an HTML form `specifies the URL or destination where the form data should be sent` when the form is submitted. It `defines the server-side script or endpoint` that will receive and process the form data.

If the `action attribute is not provided` in the HTML form, the `browser will send the form data to the current URL`, which means it will submit the form to the same page that the form is on. `This behavior` is `referred to as` a `"self-submitting" form.`

#### React Router - Action

`Route actions` are the `"writes" to route loader "reads"`. They provide a `way for apps to perform data mutations with simple HTML and HTTP semantics` while React Router abstracts away the complexity of asynchronous UI and revalidation. This gives you the simple mental model of HTML + HTTP (where the browser handles the asynchrony and revalidation) with the behavior and UX capabilities of modern SPAs.

- `useNavigation().state === 'submitting'`: To get status when form is submitting.

```js
import { Form } from 'react-router-dom'

// ROUTER's action function
export const action = async ({ request }) => {
  try {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    // Send req to server and depending on response success/error toast.
    return redirect('/') // Redirect to home page.
  } catch (error) {
    return error
  }
}

const Newsletter = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'

  // ROUTER's Form COMPONENT
  return (
    <Form className='form' method='POST'>
      {isSubmitting ? 'submitting...' : 'submit'}
    </Form>
  )
}
```

```js
import { action as newsletterAction } from './pages/Newsletter'
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: 'newsletter',
        // DEFINE ACTION PROPERTY.
        action: newsletterAction,
        element: <Newsletter />,
      },
    ],
  },
])
```

#### React Query - Setup

App.jsx

```js
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
...
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

```

```js
const searchCocktailsQuery = (searchTerm) => {
  return {
    // MULTIPLE QUERY KEY
    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => axios.get(url),
  }
}

// USE IN LOADER
export const loader =
  (queryClient) =>
  async ({ request }) => {
    // QUERY DATA LIKE THIS:
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
    return { searchTerm }
  }

// USE IN COMPONENT
const Landing = () => {
  // QUERY DATA LIKE THIS:
  const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm))
  return <CocktailList drinks={drinks} />
}
```
