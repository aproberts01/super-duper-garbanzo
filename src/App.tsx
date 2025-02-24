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
        <Route path="/super-duper-garbanzo" element={<SignIn/>}/>
        <Route path="/super-duper-garbanzo/search" element={<PuppyDb/>}/>
      </Routes>
    </Router>
  )
}

export default App
