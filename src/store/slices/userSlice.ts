import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../types'

interface UserState {
  user: User | null
  isLoading: boolean
}

const initialState: UserState = {
  user: null,
  isLoading: true,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUser, setLoading } = userSlice.actions
export default userSlice.reducer