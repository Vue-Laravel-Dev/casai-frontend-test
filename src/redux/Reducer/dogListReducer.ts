import { createSlice, PayloadAction, current } from "@reduxjs/toolkit"

export interface DogList {
    dogList: Array<Record<string, any>>
    isLoading: boolean
}

let initialState: DogList = {
    dogList: [],
    isLoading: true
}

export const dogListSlice = createSlice({
    name: 'doglist',
    initialState,
    reducers: {
        loadingStatus : (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        getDogList : (state = initialState, action: PayloadAction<Array<Record<string, any>>>) =>  {
            state.dogList = action.payload
        },
        
        addAdoption : (state , action: PayloadAction<string>) => {
            state.dogList = current(state).dogList.map((dogItem) => dogItem.id === action.payload ? {...dogItem, isAdopted: true} : dogItem)
        },

        removeAdoption : (state, action: PayloadAction<string>) => {
            state.dogList = current(state).dogList.map((dogItem) => dogItem.id === action.payload ? {
                ...dogItem, isAdopted: false
            } : dogItem)
        },

        submitAll: (state, action: PayloadAction<Array<string>>) => {
            state.dogList = current(state).dogList.map((item) => action.payload.includes(item.id) ? {
                ...item,
                isSubmitted : true
            } : item)
        }
    }
})

const { actions, reducer } = dogListSlice

export const { loadingStatus, getDogList, addAdoption, removeAdoption, submitAll } = actions
export default reducer
