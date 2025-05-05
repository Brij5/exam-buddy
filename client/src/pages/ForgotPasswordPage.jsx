import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Grid,
  Avatar
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset'; // Example Icon

const ForgotPasswordPage = () => {
  // TODO: Implement react-hook-form, yup validation, and API call

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Forgot password form submitted');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockResetIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot Password
      </Typography>
      <Typography component="p" variant="body1" sx={{ mt: 1, mb: 2, textAlign: 'center' }}>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>

      {/* Placeholder for potential API error/success messages */} 
      {/* <Alert severity="error" sx={{ mt: 2, width: '100%' }}>Error message</Alert> */}
      {/* <Alert severity="success" sx={{ mt: 2, width: '100%' }}>Success message</Alert> */}

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          // TODO: Integrate with react-hook-form Controller
          // error={!!errors.email}
          // helperText={errors.email?.message}
          // disabled={loading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          // disabled={loading}
        >
          {/* {loading ? <CircularProgress size={24} /> : 'Send Reset Link'} */}
          Send Reset Link
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Back to Sign In
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage; 