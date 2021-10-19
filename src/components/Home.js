import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import Navbar from './Navbar';
import Dashboard from './Dashboard';

const Home = () => {
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);

    if (isAuthenticated === false) return <Redirect to='/' />
    return (
        <div className="Home">
            <Navbar/>
            <Dashboard/>
        </div>
    )
}

export default Home
