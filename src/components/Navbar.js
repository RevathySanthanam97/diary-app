import { useContext} from 'react';
import AuthContext from '../contexts/AuthContext';
import { useHistory, BrowserRouter as Router} from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "./Navbar.css";
const Navbar = () => {

    const [isAuthenticated, setAuthentication] = useContext(AuthContext);
    const history = useHistory();
    const handlePrevClick = () => history.push('/previous');
    const handleHomeClick = () => history.push('/home');

    function signOutUser(){
        firebase.auth().signOut().then(function() {
            setAuthentication(false)
            console.log("Signout")
          }).catch(function(error) {
            console.log("Signout" + error)
          });
    }
    
    return (
                <div className="Navbar">
                  <Router>
                    <div className="Navbar__Home" onClick={handleHomeClick}>Home</div>
                    <div onClick={handlePrevClick} className="Navbar__Stories">Previous Stories</div>
                    <div className="Navbar__Logout" onClick={signOutUser}>Logout</div>
                  </Router> 
                </div>
    )
}

export default Navbar
