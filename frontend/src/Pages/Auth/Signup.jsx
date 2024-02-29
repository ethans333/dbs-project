const signupForm = (
    <div className="signup">
      <form onSubmit={handleSubmit} className="signup__form">
        <h2 className="title"><img className= 'logo' src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg" alt="UCF Logo" />Create Account<img className= 'logo' src="https://ewh.ieee.org/r3/orlando/images/hp/UCF.jpg" alt="UCF Logo" /></h2>
        <div className="form--group">
          <label htmlFor="email" className="label">Email:</label>
          <input 
            ref={signupInputRef} // Using ref for autofocus
            type="email"
            className="input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form--group">
          <label htmlFor="username" className="label">UserName:</label>
          <input 
            type="text" 
            className="input" 
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
        <div className="form--group">
          <label htmlFor="confirmPassword" className="label">Confirm Password:</label>
          <input 
            type="password" 
            className="input" 
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
        </div>
        <button className="submit--button" type="submit">SignUp</button>
        <p className='links'><a onClick={toggleView}>Already have an account?</a></p>
      </form>
    </div>
  );