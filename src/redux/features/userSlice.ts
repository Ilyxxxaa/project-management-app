import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';
import { SerializedError } from '@reduxjs/toolkit';
import { baseUrl } from '../../utils/constants/constants';

interface IUserResponse {
  _id: string;
  name: string;
  login: string;
}

interface IUserInfo {
  userId: string;
  token: string;
}

interface INewUserInfo extends IUserInfo {
  newUser: {
    name: string;
    login: string;
    password: string;
  };
}

export const getUserById = createAsyncThunk('user/getUserById', async (userInfo: IUserInfo) => {
  try {
    const data: IUserResponse = await request(`${baseUrl}/users/${userInfo.userId}`, 'GET', null, {
      authorization: `Bearer ${userInfo.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return data;
  } catch (error) {
    throw error;
  }
});

export const editUser = createAsyncThunk('user/editUser', async (userInfo: INewUserInfo) => {
  const body = JSON.stringify(userInfo.newUser);
  try {
    const data: IUserResponse = await request(
      `https://final-task-backend-production-415b.up.railway.app//users/${userInfo.userId}`,
      'PUT',
      body,
      {
        authorization: `Bearer ${userInfo.token}`,
        accept: 'application/json',
        'Content-Type': 'application/json',
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (userInfo: IUserInfo) => {
  try {
    await request(`${baseUrl}/users/${userInfo.userId}`, 'DELETE', null, {
      authorization: `Bearer ${userInfo.token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
  } catch (error) {
    throw error;
  }
});

interface IState {
  id: string | null;
  name: string | null;
  login: string | null;
  editStatus: {
    isSuccess: boolean;
    isLoading: boolean;
    error: SerializedError | null;
  };
  deleteStatus: {
    isLoading: boolean;
    error: SerializedError | null;
  };
}

const initialState: IState = {
  id: null,
  name: null,
  login: null,
  editStatus: {
    isSuccess: false,
    isLoading: false,
    error: null,
  },
  deleteStatus: {
    isLoading: false,
    error: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetEditStatus: (state) => {
      state.editStatus.isSuccess = false;
      state.editStatus.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.login = action.payload.login;
        state.name = action.payload.name;
        state.editStatus.error = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.editStatus.error = action.error;
        state.login = '';
        state.name = '';
      })
      .addCase(editUser.pending, (state) => {
        state.editStatus.isLoading = true;
        state.editStatus.error = null;
        state.editStatus.isSuccess = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.id = action.payload._id;
        state.login = action.payload.login;
        state.name = action.payload.name;
        state.editStatus.isSuccess = true;
        state.editStatus.isLoading = false;
        state.editStatus.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.editStatus.error = action.error;
        state.editStatus.isLoading = false;
        state.editStatus.isSuccess = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus.isLoading = true;
        state.deleteStatus.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.id = null;
        state.login = null;
        state.name = null;
        state.deleteStatus.isLoading = false;
        state.deleteStatus.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteStatus.error = action.error;
        state.deleteStatus.isLoading = false;
      });
  },
});

const { reducer } = userSlice;
export const { resetEditStatus } = userSlice.actions;
export default reducer;
