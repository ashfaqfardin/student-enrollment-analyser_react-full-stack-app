import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ClassroomRequirement from './pages/classroom-requirements/ClassroomRequirement';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Router>
        <Routes>
        <Route path='/classroom-requirements' element={<ClassroomRequirement/>} />
        
          {/* <Route exact path="/class-size-distributions">
            <Home></Home>
          </Route>
          <Route path="/resource-summaries">
            <LogIn></LogIn>
          </Route>
          <Route path="/resource-utilization">
            <LogIn></LogIn>
          </Route>
          <Route path="/revenue-of-Schools">
            <LogIn></LogIn>
          </Route>
          <Route path="/revenue-of-SETS">
            <LogIn></LogIn>
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
