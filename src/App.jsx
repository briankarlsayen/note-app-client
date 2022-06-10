import './App.css'
import Home from './containers/Home'
import Item from './containers/Item'
import {Routes, Route, Navigate} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/app/item/:id" element={<Item/>} />
        <Route path="/app/*" element={<Home/>} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/" element={<Navigate to='/app' replace />} />
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
