import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const TestResultPage = () => {
  const { attemptId } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Test Result Page</Typography>
      <Typography>Displaying results for attempt ID: {attemptId}</Typography>
      {/* TODO: Fetch and display detailed test results */}
    </Box>
  );
};

export default TestResultPage;
