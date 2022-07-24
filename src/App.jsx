import './App.css'
import Home from './containers/Home'
import Item from './containers/Item'
import Login from './containers/Login'
import Register from './containers/Register'
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar'
import Test from './components/Test'
import Main from './components/Main'
function App() {
  const logged = localStorage.getItem('token')
  return (
    <div className="App">
      <Routes>
        <Route path="/app/login" element={<Login />} />
        <Route path="/app/register" element={<Register />} />
        <Route path="/app/*" element={<Main />} />
        <Route path="/404" element={<NotFound />} />

        <Route path="/" element={ !logged ? <Navigate to='/app/login' replace /> : <Navigate to='/app/notes' replace /> } />
        {/* <Route path="/" element={ logged ? <Navigate to='/app/login' replace /> : <Navigate to='/app/notes' replace /> } */}
        {/* <Route path="/" element={<Navigate to='/app/login' replace />} /> */}
        <Route path="*" element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  )
}

const NotFound = () => {
  return(
    <div>
      <h1>Page not found</h1>
    </div>
  )
}

export default App
