import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromChildren, createRoutesFromElements, HashRouter, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import About from './components/About/About.jsx'
import Home from './components/Home/Home.jsx'
import Contact from './components/Contact/contact.jsx'
import User from './components/User/User.jsx'
import Github,{ githubInfoLoader } from './components/Github/Github.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children:[{
//       path: "",
//       element: <Home />
//     },{
//       path: "about",
//       element: <About />
//     },
//   {
//     path:'contact',
//     element: <Contact />
//   }]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/react-router/' element= {<Layout />}>
      <Route path='/react-router/' element ={<Home />} />
      <Route path='/react-router/about' element ={<About />} />
      <Route path='/react-router/contact' element ={<Contact />} />
      <Route path='/react-router/user/:userid' element ={<User />} />
      <Route 
      loader={githubInfoLoader}
      path='/react-router/github'
       element ={<Github />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode> 
     <RouterProvider router={router}/>
  </StrictMode>,
)
