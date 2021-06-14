
import { Container } from '@material-ui/core';
import './App.css';
import Home from './layouts/Home/Home';
import Navi from './layouts/Navi/Navi';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import JobAdvertisementDetails from './layouts/JobAdvertisementDetails/JobAdvertisementDetails';
import JobAdvertisementWithFilters from './layouts/JobAdvertisementWithFilters/JobAdvertisementWithFilters';
import JobAdvertisementLayout from './layouts/JobAdvertisementLayout/JobAdvertisementLayout';
import Login from './layouts/Login/Login'
import Register from './layouts/Register/Register'
import ResumesLayout from './layouts/ResumesLayout/ResumesLayout'
import ResumeWithFilters from './layouts/ResumesWithFilters/ResumesWithFilters'
import AddJobAdvertisement from './layouts/AddJobAdvertisement/AddJobAdvertisement';
import ResumeDetailsForEmployers from './layouts/ResumeDetailsForEmployers/ResumeDetailsForEmployers'
import UserResumes from './layouts/UserResumes/UserResumes';
function App() {
  return (
    <div className="App">
      
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <>
            <Navi className="navi"/>
              <Container>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/jobadvertisements" component={JobAdvertisementLayout}/>
                <Route exact path="/jobadvertisementwithfilters" component={JobAdvertisementWithFilters}/>
                <Route exact path="/jobadvertisementdetail/:id" component={JobAdvertisementDetails}/>
                <Route exact path="/addjobadvertisement" component={AddJobAdvertisement}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/resumes" component={ResumesLayout}/>
                <Route exact path="/resumeswithfilters" component={ResumeWithFilters}/>
                <Route exact path="/resumedetailsforemployers/:id" component={ResumeDetailsForEmployers}/>
                <Route exact path="/userresumes" component={UserResumes}/>
              </Container>
          </>

        </Switch>
      </Router>
  </div>
  
  );
}

export default App;
