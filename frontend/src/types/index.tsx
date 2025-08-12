export type Place = {
    placeId: number
    lat: number
    lng: number
}

export type Review = {
    userId: number
    experienceDate: Date
    rating: number
    routeLink?: string
    routeLinkTrusted?: boolean
}

export type AlertScreen = {
    message: string
    type: 'success' | 'error' | 'info'
    timeToHide?: number | undefined
}

export type AppState = {
    isMobile: boolean
    isOpenPanel: boolean
    selectedPlace: Place | undefined
    isShowNewPlaceMarker: boolean
    isAlertScreenVisible: boolean
    alertScreen: AlertScreen
}

export type AppAction =
    | { type: 'SET_IS_MOBILE'; payload: boolean }
    | { type: 'OPEN_PANEL' }
    | { type: 'CLOSE_PANEL' }
    | { type: 'CHANGE_SELECTED_PLACE'; payload: Place }
    | { type: 'CLEAR_SELECTED_PLACE' }
    | { type: 'SHOW_NEW_PLACE_MARKER' }
    | { type: 'HIDE_NEW_PLACE_MARKER' }
    | { type: 'SHOW_ALERT_SCREEN'; payload: AlertScreen }
    | { type: 'HIDE_ALERT_SCREEN' }
