import './index.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from '../src/auth/Login'
import Register from '../src/auth/Register'
import Contact from '../src/pages/Contact'
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login /> } />
        <Route path='/register' element={<Register /> } />
        <Route path='/contact' element={<Contact /> } />
      </Routes>
    </Router>
    
  )
}

export default App 
