import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import SignIn from './Components/SignIn';
import PuppyDb from './Components/PuppyDb';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn/>}/>
        <Route path="/db" element={<PuppyDb/>}/>
      </Routes>
    </Router>
  )
}

export default App
