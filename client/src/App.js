import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ClassroomRequirement from './pages/classroom-requirements/ClassroomRequirement';
import ClassDistribution from './pages/classroom-distribution/ClassDistribution';
import ResourceSummeries from './pages/resource-summeries/ResourceSummeries';
import ResourceUtilization from './pages/resource-utilization/ResourceUtilization';
import RevenueOfSchools from './pages/revenue-of-engineering/RevenueOfSchools';
import RevenueOfSets from './pages/revenue-of-school/RevenueOfSets';
import EnrollmentBreakdown from './pages/enrolment-breakdown/EnrollmentBreakdown';
import AvailableResourceSummeries from './pages/available-resource-summery/AvailableResourceSummeries';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <Router>
        <Routes>
        <Route path='/classroom-requirements' element={<ClassroomRequirement/>} />
        <Route path='/class-size-distributions' element={<ClassDistribution/>} />
        <Route path='/resource-summaries' element={<ResourceSummeries/>} />
        <Route path='/available-resource-summaries' element={<AvailableResourceSummeries/>} />
        <Route path='/resource-utilization' element={<ResourceUtilization/>} />
        <Route path='/no-of-enrollment-per-school-breakdown' element={<EnrollmentBreakdown/>} />
        <Route path='/revenue-of-Schools' element={<RevenueOfSchools/>} />
        <Route path='/revenue-of-SETS' element={<RevenueOfSets/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
