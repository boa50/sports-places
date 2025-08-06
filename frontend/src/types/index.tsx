export type Place = {
    place_id: number
    lat: number
    lng: number
}

export type Review = {
    user_id: number
    rating: number
}

export type AppState = {
    isOpenPanel: boolean
    selectedPlace: Place | undefined
    isShowNewPlaceMarker: boolean
}

export type AppAction =
    | { type: 'OPEN_PANEL' }
    | { type: 'CLOSE_PANEL' }
    | { type: 'CHANGE_SELECTED_PLACE'; payload: Place }
    | { type: 'CLEAR_SELECTED_PLACE' }
    | { type: 'SHOW_NEW_PLACE_MARKER' }
    | { type: 'HIDE_NEW_PLACE_MARKER' }
