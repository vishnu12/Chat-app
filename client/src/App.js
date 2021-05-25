
import {Switch,Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <>
   <Switch>
     <Route exact path='/' component={Login} />
     <Route exact path='/:user/:room' component={Home}/>
   </Switch>
      
    </>
  );
}

export default App;
