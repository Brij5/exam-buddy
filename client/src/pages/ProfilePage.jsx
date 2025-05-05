import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Re-use or import Message component if needed
const Message = ({ variant = 'info', children }) => (
  <div style={{ padding: '10px', margin: '10px 0', border: '1px solid', borderColor: variant === 'danger' ? 'red' : 'blue', color: variant === 'danger' ? 'red' : 'blue' }}>
    {children}
  </div>
);

const ProfilePage = () => {
  const navigate = useNavigate();

  // Get user info from Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  // Could add states for updating profile later
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   if (userInfo) {
  //     setName(userInfo.name);
  //     setEmail(userInfo.email);
  //   }
  // }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: Implement profile update logic (dispatch update action)
    alert('Profile update functionality not yet implemented.');
  };

  return (
    <div>
      <h1>User Profile</h1>
      {/* Display user info if available */} 
      {userInfo ? (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              value={userInfo.name || ''} // Display current name
              readOnly // Make read-only for now, enable when update logic is added
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={userInfo.email || ''} // Display current email
              readOnly // Make read-only for now
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Add password fields for update later */}
          {/* <div>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password (leave blank to keep current)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div> */}
          <button type="submit">Update Profile (Not Implemented)</button>
        </form>
      ) : (
        // This part might not be reached due to the useEffect redirect,
        // but good practice to handle the case where userInfo is momentarily null.
        <Message variant="info">Loading profile...</Message>
      )}
      {/* Add message display for update success/error later */}
      {/* {message && <Message variant="danger">{message}</Message>} */}
    </div>
  );
};

export default ProfilePage;
