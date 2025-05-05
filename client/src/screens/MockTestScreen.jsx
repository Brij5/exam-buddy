import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MockTestScreen = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Initialize state first
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [showResults, setShowResults] = React.useState(false);

  // Sample exam data
  const exams = {
    '1': {
      id: 1,
      name: 'Mathematics Test',
      description: 'Basic mathematics concepts',
      duration: '60 minutes',
      totalQuestions: 50,
      questions: [
        {
          id: 1,
          text: 'What is 2 + 2?',
          options: ['2', '3', '4', '5'],
          correctAnswer: '4'
        },
        {
          id: 2,
          text: 'What is the capital of India?',
          options: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'],
          correctAnswer: 'Delhi'
        }
      ]
    },
    '2': {
      id: 2,
      name: 'Science Quiz',
      description: 'General science knowledge',
      duration: '45 minutes',
      totalQuestions: 30,
      questions: [
        {
          id: 1,
          text: 'What is the chemical symbol for water?',
          options: ['H2O', 'CO2', 'O2', 'N2'],
          correctAnswer: 'H2O'
        }
      ]
    }
  };

  const exam = exams[examId];
  if (!exam) {
    return (
      <StyledPaper>
        <Typography color="error">Exam not found</Typography>
      </StyledPaper>
    );
  }

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitTest = () => {
    setShowResults(true);
  };

  const currentQuestionData = exam.questions[currentQuestion];

  return (
    <StyledPaper>
      <Typography variant="h4" component="h1" gutterBottom>
        {exam.name}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="body1">
          Question {currentQuestion + 1} of {exam.questions.length}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {currentQuestionData.text}
        </Typography>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <RadioGroup
            value={selectedAnswers[currentQuestionData.id] || ''}
            onChange={(e) => handleAnswerChange(currentQuestionData.id, e.target.value)}
          >
            {currentQuestionData.options.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          variant="outlined"
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        {currentQuestion < exam.questions.length - 1 ? (
          <Button variant="contained" onClick={handleNextQuestion}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmitTest}>
            Submit Test
          </Button>
        )}
      </Box>

      {showResults && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Test Results</Typography>
          <Typography>
            Score: {Object.entries(selectedAnswers).filter(([_, answer]) =>
              exam.questions.find(q => q.id === _)?.correctAnswer === answer
            ).length} / {exam.questions.length}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 2 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      )}
    </StyledPaper>
  );
};

export default MockTestScreen;
