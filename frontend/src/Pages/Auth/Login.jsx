import {useState, useRef} from 'react';

export default function loginForm() {

    const loginInputRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
    };

    

    return (
        <div className="Login">
          <form onSubmit={handleSubmit} className="login__form">
            <h2 className="title" id='login'><img className= 'logo' src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg" alt="UCF Logo" />Login<img className= 'logo' src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg" alt="UCF Logo" /></h2>
            <div className="form--group">
              <label htmlFor="username" className="label">UserName:</label>
              <input 
                ref={loginInputRef} // Using ref for autofocus
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form--group">
              <label htmlFor="password" className="label">Password:</label>
              <input 
                type="password" 
                className="input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="submit--button" type="submit">Login</button>
            <p className='links'><a onClick={() => {}}>Do not have an account?</a></p>
            <p className='links'><a onClick={() => {}}>Forgot Password?</a></p>
          </form>
        </div>
      );
} 
