export type Place = {
    place_id: number
    lat: number
    lng: number
}

export type Review = {
    user_id: number
    created_at: Date
    rating: number
}

export type AppState = {
    isMobile: boolean
    isOpenPanel: boolean
    selectedPlace: Place | undefined
    isShowNewPlaceMarker: boolean
}

export type AppAction =
    | { type: 'SET_IS_MOBILE'; payload: boolean }
    | { type: 'OPEN_PANEL' }
    | { type: 'CLOSE_PANEL' }
    | { type: 'CHANGE_SELECTED_PLACE'; payload: Place }
    | { type: 'CLEAR_SELECTED_PLACE' }
    | { type: 'SHOW_NEW_PLACE_MARKER' }
    | { type: 'HIDE_NEW_PLACE_MARKER' }
