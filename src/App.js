import './App.css';
import { useState, useContext, useEffect, lazy, Suspense } from 'react';
import AuthContext from './contexts/AuthContext';
import {auth} from './utils/firebase';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Previous from './components/Previous';
const Login = lazy(() => import('./components/Login'));
const Register = lazy(() => import('./components/Register'));
const Home = lazy(() => import('./components/Home'));


function App() {


  const [isAuthenticated, setAuthentication] = useState(useContext(AuthContext));
  if (process.env.NODE_ENV === 'development') console.log('isAuthenticated:', isAuthenticated);

  useEffect(() => {
    // Things you should know: auth.onAuthStateChanged follows the observer pattern needs
    // to be unsubscribe on every run. The useEffect hook will check authentication state
    // after rerender. That means everytime the value from AuthContext is updated.
    const unsubscribe = auth.onAuthStateChanged(user => {
      user ?
        setAuthentication(true) :
        setAuthentication(false);
      unsubscribe();
    });
  }, []);

  function renderHome() {
    if (isAuthenticated === false) {
      return <Login />;
    } else if (isAuthenticated === true) {
      return <Home />;
    } else {
      return null;
    }
  }

  return (
    <div className="App">
    <AuthContext.Provider value={[isAuthenticated, setAuthentication]}>
       <Router>
          <Suspense fallback={null}>
            <Switch>
              <Route exact path='/'>{renderHome()}</Route>
              <Route exact path='/'><Login /></Route>
              <Route path='/register'><Register /></Route>
              <Route path='/home'><Home /></Route>
              <Route path='/previous'><Previous /></Route>
              <Route path='*'><Redirect to='/' /></Route>
            </Switch>
          </Suspense>
      </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
