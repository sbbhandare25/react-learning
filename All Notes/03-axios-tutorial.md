# Axios Tutorial

#### Docs

[Axios Docs](https://axios-http.com/docs/intro)

#### First Request

- axios.get(url)
- axios.post(url)
- axios.patch/put(url)
- axios.delete(url)
- default get axios(url)
- returns a promise
- response data located in data property
- error in error.response

```js
const fetchData = async () => {
  try {
    // axios.get(), axios.post(),axios.put(), axios.delete()
    const { data } = await axios(url)
    console.log(data)
  } catch (error) {
    console.log(error.response)
  }
}
```

#### Headers

- second argument
- axios.get(url,{})

- third argument in requests with data
- axios.post(url,{data},{})

```js
axios(url, {
  headers: {
    Accept: 'application/json',
  },
})
```

#### Post Request

- send data to the server
- axios.post(url, { data })
- more options (auth header) - axios.post(url, { data },{})

```js
axios.post(url, { data }, { headers: {} })
```

#### Global Defaults

```js
// In latest axios version common property returns "undefined"
// axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.baseURL = 'https://api.example.com'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
```

#### Custom Instance

```js
const authFetch = axios.create({
  baseURL: 'https://www.course-api.com',
  headers: {
    Accept: 'application/json',
  },
})

await authFetch.get('/users', { headers: {} })
```

#### Interceptors

- global and custom

```js
authFetch.interceptors.request.use(
  (request) => {
    // request.headers.common['Accept'] = `application/json`;
    request.headers['Accept'] = `application/json`

    console.log('request sent')
    // must return request
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

authFetch.interceptors.response.use(
  (response) => {
    console.log('got response')
    return response
  },
  (error) => {
    console.log(error.response)
    if (error.response.status === 404) {
      // do something
      console.log('NOT FOUND')
    }
    return Promise.reject(error)
  }
)
```
