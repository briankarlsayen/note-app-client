import './App.css'
import Home from './containers/Home'
import Item from './containers/Item'
import Login from './containers/Login'
import Register from './containers/Register'
import {Routes, Route, Navigate} from 'react-router-dom';
import Main from './components/Main'
import NotFound from './containers/Error/NotFound'
import ForgotPassword from './containers/ForgotPassword'
import ChangePassword from './containers/ChangePassword'

function App() {
  const logged = localStorage.getItem('token')
  return (
    <div className="note-app">
      <Routes>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id" element={<ChangePassword />} />
        <Route path="/app/login" element={<Login />} />
        <Route path="/app/register" element={<Register />} />
        <Route path="/app/*" element={<Main />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={ !logged ? <Navigate to='/app/login' replace /> : <Navigate to='/app/notes' replace /> } />
        <Route path="*" element={<Navigate to='/404' replace />} />
      </Routes>
    </div>
  )
}

export default App
