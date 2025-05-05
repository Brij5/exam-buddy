import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/slices/authSlice'; // Import the register thunk

// Basic Loading/Error components (consider moving to components/common)
// Re-declare here for now, ideally import from a shared location
const Loader = () => <div>Loading...</div>;
const Message = ({ variant = 'info', children }) => (
  <div style={{ padding: '10px', margin: '10px 0', border: '1px solid', borderColor: variant === 'danger' ? 'red' : (variant === 'success' ? 'green' : 'blue'), color: variant === 'danger' ? 'red' : (variant === 'success' ? 'green' : 'blue') }}>
    {children}
  </div>
);

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formMessage, setFormMessage] = useState(''); // For password mismatch, etc.
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Track success

  const dispatch = useDispatch();
  const _navigate = useNavigate();

  // Select auth state from Redux store
  const auth = useSelector((state) => state.auth);
  const { loading, error } = auth; // Don't need userInfo for registration flow

  // Clear registration success message if user starts typing again
  useEffect(() => {
    setRegistrationSuccess(false);
  }, [name, email, password, confirmPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setFormMessage(''); // Clear previous form messages
    setRegistrationSuccess(false); // Reset success state
    if (password !== confirmPassword) {
      setFormMessage('Passwords do not match');
      return;
    }

    try {
      // Dispatch register thunk and wait for result (unwrap)
      // Unwrapping gives the fulfilled payload or throws the rejected payload
      await dispatch(register({ name, email, password })).unwrap();
      setRegistrationSuccess(true); // Set success state
      setFormMessage('Registration successful! Please check your email to verify your account.');
      // Optionally redirect after a delay or clear the form
      // _navigate('/login'); // Keep commented out for now
    } catch (rejectedValue) {
      // Error is handled by the extraReducer setting state.error
      // We don't need to setFormMessage here unless we want duplicate errors
      console.error('Registration failed:', rejectedValue);
    }

    // TODO: Implement registration logic using Redux/service call
    // console.log('Register attempt with:', { name, email, password });
    // alert('Registration functionality not yet implemented.'); // Remove old alert
  };

  return (
    <div>
      <h1>Register</h1>
      {/* Display form-specific messages (e.g., password mismatch) */}
      {formMessage && <Message variant={registrationSuccess ? 'success' : 'danger'}>{formMessage}</Message>}
      {/* Display Redux error message if API call fails */}
      {error && !registrationSuccess && <Message variant="danger">{error}</Message>}
      {/* Display loader while registering */}
      {loading && <Loader />}

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength="8"
          />
        </div>
        <button type="submit" disabled={loading}> {/* Disable button while loading */} 
          Register
        </button>
      </form>
      <div>
        Already have an account? <Link to="/login">Login Here</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
