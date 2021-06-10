
import { Container } from '@material-ui/core';
import './App.css';
import Home from './layouts/Home/Home';
import Navi from './layouts/Navi/Navi';

function App() {
  return (
    <div className="App">
      <Navi className="navi"/>
      <Container>
        <Home/>
      </Container>
      
  </div>
  );
}

export default App;
