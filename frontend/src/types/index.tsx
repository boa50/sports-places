export type Review = {
    user_id: number
    lat: number
    lng: number
    rating: number
}

export type AppState = {
    isOpenPanel: boolean
    selectedPlace: string | undefined
    isShowNewPlaceMarker: boolean
}

export type AppAction =
    | { type: 'OPEN_PANEL' }
    | { type: 'CLOSE_PANEL' }
    | { type: 'CHANGE_SELECTED_PLACE'; payload: string }
    | { type: 'CLEAR_SELECTED_PLACE' }
    | { type: 'SHOW_NEW_PLACE_MARKER' }
    | { type: 'HIDE_NEW_PLACE_MARKER' }
