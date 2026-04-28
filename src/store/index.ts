import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import spiritReducer from './slices/spiritSlice'
import quitReducer from './slices/quitSlice'
import achievementReducer from './slices/achievementSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    spirit: spiritReducer,
    quit: quitReducer,
    achievement: achievementReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch