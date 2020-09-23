# spacex_react-ssr
reacr-ssr


Demo: [Click to see DEMO](http://spacex12.herokuapp.com/)


## Getting Started

### Installing

First clone project and install dependencies

```sh
$ git clone https://github.com/amitamora/spacex_react-ssr.git
$ cd spacex_react-ssr
$ npm install
```

Run on local

```sh
$ npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000)



## Approach and Stack Details 
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- Created a Custom Webpack configuration for Dev and Prod Version 
- Created a custom Node-express server for server static Server side rendered HTML file to Client 
- Created a Store to server for initial Render
- Added API calls 
- Hydrated Client React with data recieved from API calls 
- Created a store for Client Side state management 
- Configured An Interceptor to Tranforms Http requests 
- Used Axios to make Http calls 
- Used LazyloadImage component to load images lazily
