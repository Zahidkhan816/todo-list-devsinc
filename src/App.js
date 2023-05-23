import './App.css';
import Navbar from './Components/Navbar';
import NewtodoList from './Components/NewtodoList';
import { Routes, Route } from "react-router-dom";
import Completed from './Components/Completed';
import UnCompleted from './Components/UnCompleted';
function App() {
  return (
    <div>
      <Navbar />
     <Routes>
     <Route path="/" element={<NewtodoList/>}/> 
     <Route path="/Complted" element={<Completed/>}/>
     <Route path="UnComplted" element={<UnCompleted/>}/>
     </Routes>
    </div>
  );
}

export default App;
