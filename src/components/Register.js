import {useState, useContext, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { auth } from '../utils/firebase';
import './Register.css';

const Register = () => {
    const [isAuthenticated, setAuthentication] = useContext(AuthContext);
    const [isButtonDisabled, setButtonState] = useState(false);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
  
    async function signup(event) {
        event.preventDefault();
        setButtonState(true);
    
        const name = nameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value;
    
        try {
          const { user } = await auth.createUserWithEmailAndPassword(email, password);
          user.updateProfile({ displayName: name });
          await auth.signInWithEmailAndPassword(email, password); // Force auth.currentUser to update
          setAuthentication(true);
          console.log('Your account has been successfully created.');
        } catch (error) {
          passwordRef.current.value = '';
          setButtonState(false);
          console.log(error.message);
        }
      }
  
    if (isAuthenticated === null) return null;
    if (isAuthenticated === true) return <Redirect to='/home' />
    return (
        <div className="Register">
            <div className="Register__Container">
            <form onSubmit={signup}>
                <div className="Register__Username"><input placeholder="Name" type="text" required
        ref={nameRef}></input></div>
                <div className="Register__Username"><input placeholder="Mail Id" type="email" required
        ref={emailRef}></input></div>
                <div className="Register__Password"><input placeholder="Password" type="text" required
        ref={passwordRef}></input></div>
                <button disabled={isButtonDisabled}>Create Account</button>
                <div className="Register__RegisterUser"><Link to="/login">Already Registered? Login here</Link></div>
            </form>
            </div>
        </div>
    )
}

export default Register
