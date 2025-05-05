import CustomButton from "../components/CustomButton";
import React, { useState, useEffect } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import StudentNavigation from '../components/Navigation/StudentNavigation';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

// Type definition for Exam object
const Exam = {
  id: '',
  name: '',
  description: '',
  duration: '',
  totalQuestions: 0,
  completed: false
};

const DashboardScreen = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize with sample exams
    const sampleExams = [
      {
        id: 1,
        name: 'Mathematics Test',
        description: 'Basic mathematics concepts',
        duration: '60 minutes',
        totalQuestions: 50,
        completed: false
      },
      {
        id: 2,
        name: 'Science Quiz',
        description: 'General science knowledge',
        duration: '45 minutes',
        totalQuestions: 30,
        completed: true
      }
    ];
    setExams(sampleExams);
  }, []);

  const handleStartExam = (examId) => {
    navigate(`/mock-test/${examId}`);
  };

  return (
    <StudentNavigation>
      <StyledPaper>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Exams
        </Typography>
        <List>
          {exams.map((exam) => (
            <ListItem
              key={exam.id}
              button="true"
              onClick={() => handleStartExam(exam.id)}
            >
              <ListItemText
                primary={exam.name}
                secondary={`${exam.description} - ${exam.duration} (${exam.totalQuestions} questions)`}
              />
              {exam.completed && (
                <Typography color="primary" variant="body2">
                  Completed
                </Typography>
              )}
            </ListItem>
          ))}
        </List>
      </StyledPaper>
    </StudentNavigation>
  );
};

export default DashboardScreen;
