import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const startTestAttempt = createAsyncThunk(
  'testAttempt/start',
  async (examId) => ({
    examId,
    startTime: new Date()
  })
);

export const submitAnswer = createAsyncThunk(
  'testAttempt/submitAnswer',
  async ({ questionId, answer }) => ({
    questionId,
    answer
  })
);

export const markForReview = createAsyncThunk(
  'testAttempt/markForReview',
  async (questionId) => questionId
);

const initialState = {
  examId: null,
  startTime: null,
  currentQuestionIndex: 0,
  answers: {},
  markedForReview: [],
  isSubmitted: false,
  loading: false,
  error: null,
};

const testAttemptSlice = createSlice({
  name: 'testAttempt',
  initialState,
  reducers: {
    resetTestAttempt: (state) => {
      Object.assign(state, initialState);
    },
    moveToQuestion: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    toggleMarkForReview: (state, action) => {
      const questionId = action.payload;
      const index = state.markedForReview.indexOf(questionId);
      if (index !== -1) {
        state.markedForReview.splice(index, 1);
      } else {
        state.markedForReview.push(questionId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startTestAttempt.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startTestAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.examId = action.payload.examId;
        state.startTime = action.payload.startTime;
      })
      .addCase(startTestAttempt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answers[action.payload.questionId] = action.payload.answer;
      })
      .addCase(submitAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(markForReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markForReview.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.markedForReview.includes(action.payload)) {
          state.markedForReview.push(action.payload);
        }
      })
      .addCase(markForReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetTestAttempt, moveToQuestion, toggleMarkForReview } = testAttemptSlice.actions;
export default testAttemptSlice.reducer;
