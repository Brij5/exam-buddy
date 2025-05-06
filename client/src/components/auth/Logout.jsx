import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/slices/authSlice'; // Adjust if your logout action has a different name

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutUser());
    navigate('/login', { replace: true });
  }, [dispatch, navigate]);

  // Render nothing, or a loading spinner if logout is async and you want to show feedback
  return null; 
};

export default Logout;
