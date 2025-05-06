import React from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ExamsByCategoryPage = () => {
  const { categoryId } = useParams();
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Exams By Category Page</Typography>
      <Typography>Displaying exams for category ID: {categoryId}</Typography>
      {/* TODO: Fetch and display exams for this category */}
    </Box>
  );
};

export default ExamsByCategoryPage;
