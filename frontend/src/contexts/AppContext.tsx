import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'

type AppState = {
    isOpenPanel: boolean
    selectedPlace: string | undefined
    isShowNewPlaceMarker: boolean
}

type AppAction =
    | { type: 'OPEN_PANEL' }
    | { type: 'CLOSE_PANEL' }
    | { type: 'CHANGE_SELECTED_PLACE'; payload: string }
    | { type: 'CLEAR_SELECTED_PLACE' }
    | { type: 'SHOW_NEW_PLACE_MARKER' }
    | { type: 'HIDE_NEW_PLACE_MARKER' }

const initialState: AppState = {
    isOpenPanel: false,
    selectedPlace: undefined,
    isShowNewPlaceMarker: true,
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
        case 'SHOW_NEW_PLACE_MARKER':
            return {
                ...state,
                isShowNewPlaceMarker: true,
            }
        case 'HIDE_NEW_PLACE_MARKER':
            return {
                ...state,
                isShowNewPlaceMarker: false,
            }
        default:
            return state
    }
}

const AppContext = createContext<
    | {
          state: AppState
          dispatch: Dispatch<AppAction>
      }
    | undefined
>(undefined)

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
