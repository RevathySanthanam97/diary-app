import { useContext, useState, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { auth } from '../utils/firebase';
import './Login.css'

const Login = () => {
    const [isAuthenticated, setAuthentication] = useContext(AuthContext);
    const [isButtonDisabled, setButtonState] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');
  
    async function login(event) {
      event.preventDefault();
      setButtonState(true);
  
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value;
  
      try {
        await auth.signInWithEmailAndPassword(email, password);
        setAuthentication(true);
      } catch (error) {
        let message = '';
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'There is no account associated with this email address.';
            break;
          case 'auth/wrong-password':
            message = 'Wrong password. Try again.';
            break;
          default:
            message = error.message;
        }
        passwordRef.current.value = '';
        setButtonState(false);
        console.log(message)
      }
    }
  
    if (isAuthenticated === null) return null;
    if (isAuthenticated === true) return <Redirect to='/' />;

    return (
        <div className="Login">
            <div className="Login__Container">
                <form onSubmit={login}>
                <div className="Login__Username"><input placeholder="Mail Id" type="email"  required
              ref={emailRef}></input></div>
                <div className="Login__Password"><input placeholder="Password" type="text" required
              ref={passwordRef}></input></div>
                <button disabled={isButtonDisabled}>Login</button>
                </form>
                <div className="Login__RegisterUser"><Link  to="/Register">New User? Register here</Link></div>
            </div>
        </div>
    )
}

export default Login
