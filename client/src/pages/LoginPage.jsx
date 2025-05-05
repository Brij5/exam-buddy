import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/authSlice';
import { Container, Typography, Alert, CircularProgress, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { loading, error, userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      const role = userInfo.role;
      const redirectPath = role === 'Admin' 
        ? '/admin/dashboard'
        : role === 'ExamManager'
          ? '/exam-manager/dashboard'
          : '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create credentials object
    const credentials = {
      email: email,
      password: password
    };
    
    dispatch(login(credentials));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign In to Exam Buddy
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <CircularProgress />
          ) : (
            <Container maxWidth="md" sx={{ py: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Sign in to Exam Buddy
                </Typography>
                <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Sign In
                  </Typography>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <form onSubmit={submitHandler}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                      autoFocus
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      margin="normal"
                      required
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                      <Link href="/register" variant="body2">
                        Don't have an account? Sign Up
                      </Link>
                    </Box>
                  </form>
                </Paper>
              </Box>
            </Container>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
