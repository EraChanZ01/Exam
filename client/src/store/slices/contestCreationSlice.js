import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadContestFiles } from '../../api/rest/restController';
import { rejectedReducer } from '../../utils/store';

const CONTEST_SAVING_SLICE_NAME = 'contestCreation';

const initialState = {
  contests: {},
};

export const saveContestFiles = createAsyncThunk(
  `${CONTEST_SAVING_SLICE_NAME}/saveContestFiles`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await uploadContestFiles(payload);
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

const reducers = {
  saveContestToStore: (state, { payload: { type, info } }) => {
    state.contests = {
      ...state.contests,
      ...{ [type]: info },
    };
  },
  clearContestStore: () => initialState,
};

const contestSavingSlice = createSlice({
  name: CONTEST_SAVING_SLICE_NAME,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(saveContestFiles.pending, state => {
      state.isFetching = true;
    });
    builder.addCase(saveContestFiles.fulfilled, (state, { payload }) => {
      const objectState = {}
      Object.keys(state.contests).forEach((key) => {
        objectState[key] = {
          ...state.contests[key],
          files: payload
        }
      }
      )
      state.contests = {
        ...objectState
      }
      state.isFetching = false;
    });
    builder.addCase(saveContestFiles.rejected, rejectedReducer);
  }
});

const { actions, reducer } = contestSavingSlice;

export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
