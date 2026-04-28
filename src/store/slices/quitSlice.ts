import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { QuitRecord, CompletedTasks } from '../../types'

interface QuitState {
  todayRecord: QuitRecord | null
  totalDays: number
  cigarettesAvoided: number
  moneySaved: number
  records: QuitRecord[]
}

const initialState: QuitState = {
  todayRecord: null,
  totalDays: 0,
  cigarettesAvoided: 0,
  moneySaved: 0,
  records: [],
}

export const quitSlice = createSlice({
  name: 'quit',
  initialState,
  reducers: {
    setTodayRecord: (state, action: PayloadAction<QuitRecord | null>) => {
      state.todayRecord = action.payload
    },
    setTotalDays: (state, action: PayloadAction<number>) => {
      state.totalDays = action.payload
    },
    setCigarettesAvoided: (state, action: PayloadAction<number>) => {
      state.cigarettesAvoided = action.payload
    },
    setMoneySaved: (state, action: PayloadAction<number>) => {
      state.moneySaved = action.payload
    },
    setRecords: (state, action: PayloadAction<QuitRecord[]>) => {
      state.records = action.payload
    },
    updateTodayTasks: (state, action: PayloadAction<Partial<CompletedTasks>>) => {
      if (state.todayRecord?.tasks_completed) {
        state.todayRecord.tasks_completed = {
          ...state.todayRecord.tasks_completed,
          ...action.payload,
        }
      }
    },
  },
})

export const { setTodayRecord, setTotalDays, setCigarettesAvoided, setMoneySaved, setRecords, updateTodayTasks } = quitSlice.actions
export default quitSlice.reducer