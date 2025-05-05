import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import NavigationMenu from "../components/common/NavigationMenu";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  Paper,
  Chip,
  IconButton,
  Snackbar,
  AlertTitle
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { fetchCategories } from '../store/slices/examSlice'; // Import the thunk

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { categories, loading: EXAMS_LOADING, error: EXAMS_ERROR } = useSelector((state) => state.exams);
  // const { loading: PROGRESS_LOADING, error: PROGRESS_ERROR, recentAttempts, overallProgress } = useSelector((state) => state.progress); // Commented out - Progress slice not yet implemented
  // Placeholder data until progress slice is implemented
  const PROGRESS_LOADING = false;
  const PROGRESS_ERROR = null;
  const recentAttempts = [];
  const overallProgress = { accuracy: 0, studyTime: 0, weakAreas: [] };

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/home',
    },
    {
      text: 'Profile',
      icon: <PersonIcon />,
      path: '/profile',
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
    },
  ];

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Navigation menuItems={menuItems} />
      <Typography variant="h4" gutterBottom>
        Welcome, {userInfo ? userInfo.name : 'User'}!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Track your progress, manage your studies, and explore available exams.
      </Typography>

      {/* Quick Stats Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Overall Progress
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h4">
                {overallProgress?.accuracy || 0}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={overallProgress?.accuracy || 0}
              sx={{ height: 10, borderRadius: 5, mt: 2 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Performance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingDownIcon sx={{ color: 'warning.main', mr: 1 }} />
              <Typography variant="h4">
                {recentAttempts?.length || 0} Attempts
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={recentAttempts?.length ? (recentAttempts[0].accuracy || 0) : 0}
              sx={{ height: 10, borderRadius: 5, mt: 2 }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Study Time
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="h4">
                {overallProgress?.studyTime || 0} Hours
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={overallProgress?.studyTime ? (overallProgress.studyTime / 100 * 100) : 0}
              sx={{ height: 10, borderRadius: 5, mt: 2 }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Recent Test Attempts */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Test Attempts
        </Typography>
        <List>
          {recentAttempts?.map((attempt, index) => (
            <React.Fragment key={attempt._id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete">
                    <NotificationsIcon />
                  </IconButton>
                }
              >
                <ListItemIcon>
                  {attempt.accuracy >= 85 ? (
                    <CheckCircleIcon sx={{ color: 'success.main' }} />
                  ) : attempt.accuracy >= 70 ? (
                    <CheckCircleIcon sx={{ color: 'warning.main' }} />
                  ) : (
                    <ErrorOutlineIcon sx={{ color: 'error.main' }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={attempt.examName}
                  secondary={`Completed on ${new Date(attempt.completedAt).toLocaleDateString()}`}
                />
                <Typography variant="body2" color={attempt.accuracy >= 85 ? 'success.main' : attempt.accuracy >= 70 ? 'warning.main' : 'error.main'}>
                  {attempt.accuracy}%
                </Typography>
              </ListItem>
              {index < recentAttempts.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      {/* Study Recommendations */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Study Recommendations
        </Typography>
        <List>
          {overallProgress?.weakAreas?.map((area, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <AssignmentIcon sx={{ color: 'warning.main' }} />
              </ListItemIcon>
              <ListItemText
                primary={area.topic}
                secondary={`Improve ${area.accuracy}% accuracy`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Available Exam Categories */}
      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6">Available Exam Categories</Typography>
        {EXAMS_LOADING && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
        {EXAMS_ERROR && <Alert severity="error" sx={{ mt: 2 }}>{`Failed to load categories: ${EXAMS_ERROR}`}</Alert>}
        {!EXAMS_LOADING && !EXAMS_ERROR && categories && categories.length > 0 && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category._id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea component={RouterLink} to={`/exams/category/${category._id}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {category.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        {!EXAMS_LOADING && !EXAMS_ERROR && (!categories || categories.length === 0) && (
          <Typography sx={{ mt: 2 }}>No exam categories available at the moment.</Typography>
        )}
      </Paper>

      {/* Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          <AlertTitle>Reminder</AlertTitle>
          You have new study recommendations based on your recent performance.
        </Alert>
      </Snackbar>
    </Box>
  );
};

const EnhancedDashboardPage = () => {
  return (
    <NavigationMenu>
      <DashboardPage />
    </NavigationMenu>
  );
};
export default EnhancedDashboardPage;
