import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'

type AppState = {
    isOpenPanel: boolean
    selectedPlace: string | undefined
}

type AppAction =
    | { type: 'OPEN_PANEL' }
    | { type: 'CLOSE_PANEL' }
    | { type: 'CHANGE_SELECTED_PLACE'; payload: string }
    | { type: 'CLEAR_SELECTED_PLACE' }

// Initial state
const initialState: AppState = {
    isOpenPanel: false,
    selectedPlace: undefined,
}

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'OPEN_PANEL':
            return {
                ...state,
                isOpenPanel: true,
            }
        case 'CLOSE_PANEL':
            return {
                ...state,
                isOpenPanel: false,
            }
        case 'CHANGE_SELECTED_PLACE':
            return {
                ...state,
                selectedPlace: action.payload,
            }
        case 'CLEAR_SELECTED_PLACE':
            return {
                ...state,
                selectedPlace: undefined,
            }
        default:
            return state
    }
}

// Create context
const AppContext = createContext<
    | {
          state: AppState
          dispatch: Dispatch<AppAction>
      }
    | undefined
>(undefined)

// Create provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

// Custom hook for easy access to context
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}
