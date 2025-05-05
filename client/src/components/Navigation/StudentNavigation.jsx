import React from 'react';
import { 
  Dashboard as DashboardIcon, 
  School as SchoolIcon, 
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import Navigation from './Navigation';

const StudentNavigation = ({ children }) => {
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'Exams',
      icon: <SchoolIcon />,
      path: '/exams'
    },
    {
      text: 'Progress',
      icon: <AssessmentIcon />,
      path: '/progress'
    }
  ];

  return (
    <Navigation menuItems={menuItems}>
      {children}
    </Navigation>
  );
};

export default StudentNavigation;
