import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './Components/SignIn';
import PuppyDb from './Components/PuppyDb';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
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
