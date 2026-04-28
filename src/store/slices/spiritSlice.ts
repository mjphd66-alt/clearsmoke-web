import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Spirit } from '../types'

interface SpiritState {
  spirit: Spirit | null
  isLoading: boolean
}

const initialState: SpiritState = {
  spirit: null,
  isLoading: true,
}

export const spiritSlice = createSlice({
  name: 'spirit',
  initialState,
  reducers: {
    setSpirit: (state, action: PayloadAction<Spirit | null>) => {
      state.spirit = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    updateEnergy: (state, action: PayloadAction<number>) => {
      if (state.spirit) {
        state.spirit.energy = Math.min(100, Math.max(0, state.spirit.energy + action.payload))
      }
    },
    updateEvolutionStage: (state, action: PayloadAction<number>) => {
      if (state.spirit) {
        state.spirit.evolution_stage = action.payload
      }
    },
  },
})

export const { setSpirit, setLoading, updateEnergy, updateEvolutionStage } = spiritSlice.actions
export default spiritSlice.reducer