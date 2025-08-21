import { createContext, useContext, useReducer } from 'react'
import type { ReactNode, Dispatch } from 'react'
import type { AppState, AppAction } from '@/types'

const initialState: AppState = {
    isMobile: false,
    isOpenPanel: false,
    selectedPlace: undefined,
    isShowNewPlaceMarker: true,
    isAlertScreenVisible: false,
    alertScreen: { message: '', type: 'info' },
    isLoginFormOpen: false,
    isUserSignedIn: undefined,
    isUserPanelOpen: false,
}

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case 'SET_IS_MOBILE':
            return {
                ...state,
                isMobile: action.payload,
            }
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
        case 'SHOW_ALERT_SCREEN':
            return {
                ...state,
                isAlertScreenVisible: true,
                alertScreen: action.payload,
            }
        case 'HIDE_ALERT_SCREEN':
            return {
                ...state,
                isAlertScreenVisible: false,
                alertScreen: { message: '', type: 'info' },
            }
        case 'SHOW_LOGIN_FORM':
            return {
                ...state,
                isLoginFormOpen: true,
            }
        case 'HIDE_LOGIN_FORM':
            return {
                ...state,
                isLoginFormOpen: false,
            }
        case 'SET_USER_SIGNED_IN':
            return {
                ...state,
                isUserSignedIn: action.payload,
            }
        case 'SHOW_USER_PANEL':
            return {
                ...state,
                isUserPanelOpen: true,
            }
        case 'HIDE_USER_PANEL':
            return {
                ...state,
                isUserPanelOpen: false,
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
