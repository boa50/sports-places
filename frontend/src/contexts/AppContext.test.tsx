import type { AppState, Place, AlertScreen } from '@/types'
import { AppProvider, useAppContext } from './AppContext'
import { screen, render, fireEvent, act } from '@testing-library/react'

const testPlace: Place = {
    placeId: 0,
    lat: 0.5,
    lng: -0.5,
}

const testAlertScreenSuccess: AlertScreen = {
    message: 'success message',
    type: 'success',
    timeToHide: 18263,
}
const testAlertScreenError: AlertScreen = {
    message: 'error alert screen',
    type: 'error',
}
const testAlertScreenInfo: AlertScreen = {
    message: 'info alert',
    type: 'info',
    timeToHide: 567,
}

beforeEach(() => {
    render(
        <AppProvider>
            <MockedCustomComponent />
        </AppProvider>
    )
})

test('initial state', () => {
    testInitialState()
})

test('change isMobile', async () => {
    const stateName = 'isMobile'
    testStateValue(stateName, false)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SET_IS_MOBILE_True'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('SET_IS_MOBILE_False'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])
})

test('change isOpenPanel', async () => {
    const stateName = 'isOpenPanel'
    testStateValue(stateName, false)

    await act(async () => {
        fireEvent.click(screen.getByTestId('OPEN_PANEL'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('CLOSE_PANEL'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])
})

test('change selectedPlace', async () => {
    const stateName = 'selectedPlace'
    testStateValue(stateName, undefined)

    await act(async () => {
        fireEvent.click(screen.getByTestId('CHANGE_SELECTED_PLACE'))
    })

    testStateValue(stateName, testPlace)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('CLEAR_SELECTED_PLACE'))
    })

    testStateValue(stateName, undefined)
    testInitialState([stateName])
})

test('change isShowNewPlaceMarker', async () => {
    const stateName = 'isShowNewPlaceMarker'
    testStateValue(stateName, true)

    await act(async () => {
        fireEvent.click(screen.getByTestId('HIDE_NEW_PLACE_MARKER'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_NEW_PLACE_MARKER'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])
})

test('change alertScreen', async () => {
    const stateNames = ['isAlertScreenVisible', 'alertScreen']
    testStateValue('isAlertScreenVisible', false)
    testStateValue('alertScreen', { message: '', type: 'info' })

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_ALERT_SCREEN_Success'))
    })

    testStateValue('isAlertScreenVisible', true)
    testStateValue('alertScreen', testAlertScreenSuccess)
    testInitialState(stateNames)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_ALERT_SCREEN_Error'))
    })

    testStateValue('isAlertScreenVisible', true)
    testStateValue('alertScreen', testAlertScreenError)
    testInitialState(stateNames)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_ALERT_SCREEN_Info'))
    })

    testStateValue('isAlertScreenVisible', true)
    testStateValue('alertScreen', testAlertScreenInfo)
    testInitialState(stateNames)

    await act(async () => {
        fireEvent.click(screen.getByTestId('HIDE_ALERT_SCREEN'))
    })

    testStateValue('isAlertScreenVisible', false)
    testStateValue('alertScreen', { message: '', type: 'info' })
    testInitialState(stateNames)
})

test('change isLoginFormOpen', async () => {
    const stateName = 'isLoginFormOpen'
    testStateValue(stateName, false)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_LOGIN_FORM'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('HIDE_LOGIN_FORM'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])
})

test('change isUserCustomisationFormOpen', async () => {
    const stateName = 'isUserCustomisationFormOpen'
    testStateValue(stateName, false)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_USER_CUSTOMISATION_FORM'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('HIDE_USER_CUSTOMISATION_FORM'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])
})

test('change isUserSignedIn', async () => {
    const stateName = 'isUserSignedIn'
    testStateValue(stateName, undefined)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SET_USER_SIGNED_IN_True'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('SET_USER_SIGNED_IN_False'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])
})

test('change isUserPanelOpen', async () => {
    const stateName = 'isUserPanelOpen'
    testStateValue(stateName, false)

    await act(async () => {
        fireEvent.click(screen.getByTestId('SHOW_USER_PANEL'))
    })

    testStateValue(stateName, true)
    testInitialState([stateName])

    await act(async () => {
        fireEvent.click(screen.getByTestId('HIDE_USER_PANEL'))
    })

    testStateValue(stateName, false)
    testInitialState([stateName])
})

function testInitialState(excludingStates?: string[]) {
    const initialState: AppState = {
        isMobile: false,
        isOpenPanel: false,
        selectedPlace: undefined,
        isShowNewPlaceMarker: true,
        isAlertScreenVisible: false,
        alertScreen: { message: '', type: 'info' },
        isLoginFormOpen: false,
        isUserCustomisationFormOpen: false,
        isUserSignedIn: undefined,
        isUserPanelOpen: false,
    }

    Object.keys(initialState).forEach((stateName) => {
        if (
            excludingStates === undefined ||
            !excludingStates.includes(stateName)
        )
            // @ts-ignore Accepting any stateName
            testStateValue(stateName, initialState[stateName])
    })
}

function MockedCustomComponent() {
    const { state, dispatch } = useAppContext()

    const StateComponent = ({ stateName }: { stateName: string }) => (
        <div
            data-testid={stateName}
            data-value={getDataValue(state, stateName)}
        ></div>
    )

    return (
        <>
            <StateComponent stateName={'isMobile'} />
            <StateComponent stateName={'isOpenPanel'} />
            <StateComponent stateName={'selectedPlace'} />
            <StateComponent stateName={'isShowNewPlaceMarker'} />
            <StateComponent stateName={'isAlertScreenVisible'} />
            <StateComponent stateName={'alertScreen'} />
            <StateComponent stateName={'isLoginFormOpen'} />
            <StateComponent stateName={'isUserCustomisationFormOpen'} />
            <StateComponent stateName={'isUserSignedIn'} />
            <StateComponent stateName={'isUserPanelOpen'} />
            <button
                data-testid="SET_IS_MOBILE_True"
                onClick={() =>
                    dispatch({ type: 'SET_IS_MOBILE', payload: true })
                }
            ></button>
            <button
                data-testid="SET_IS_MOBILE_False"
                onClick={() =>
                    dispatch({ type: 'SET_IS_MOBILE', payload: false })
                }
            ></button>
            <button
                data-testid="OPEN_PANEL"
                onClick={() => dispatch({ type: 'OPEN_PANEL' })}
            ></button>
            <button
                data-testid="CLOSE_PANEL"
                onClick={() => dispatch({ type: 'CLOSE_PANEL' })}
            ></button>
            <button
                data-testid="CHANGE_SELECTED_PLACE"
                onClick={() =>
                    dispatch({
                        type: 'CHANGE_SELECTED_PLACE',
                        payload: testPlace,
                    })
                }
            ></button>
            <button
                data-testid="CLEAR_SELECTED_PLACE"
                onClick={() => dispatch({ type: 'CLEAR_SELECTED_PLACE' })}
            ></button>
            <button
                data-testid="SHOW_NEW_PLACE_MARKER"
                onClick={() => dispatch({ type: 'SHOW_NEW_PLACE_MARKER' })}
            ></button>
            <button
                data-testid="HIDE_NEW_PLACE_MARKER"
                onClick={() => dispatch({ type: 'HIDE_NEW_PLACE_MARKER' })}
            ></button>
            <button
                data-testid="SHOW_ALERT_SCREEN_Success"
                onClick={() =>
                    dispatch({
                        type: 'SHOW_ALERT_SCREEN',
                        payload: testAlertScreenSuccess,
                    })
                }
            ></button>
            <button
                data-testid="SHOW_ALERT_SCREEN_Error"
                onClick={() =>
                    dispatch({
                        type: 'SHOW_ALERT_SCREEN',
                        payload: testAlertScreenError,
                    })
                }
            ></button>
            <button
                data-testid="SHOW_ALERT_SCREEN_Info"
                onClick={() =>
                    dispatch({
                        type: 'SHOW_ALERT_SCREEN',
                        payload: testAlertScreenInfo,
                    })
                }
            ></button>
            <button
                data-testid="HIDE_ALERT_SCREEN"
                onClick={() => dispatch({ type: 'HIDE_ALERT_SCREEN' })}
            ></button>
            <button
                data-testid="SHOW_LOGIN_FORM"
                onClick={() => dispatch({ type: 'SHOW_LOGIN_FORM' })}
            ></button>
            <button
                data-testid="HIDE_LOGIN_FORM"
                onClick={() => dispatch({ type: 'HIDE_LOGIN_FORM' })}
            ></button>
            <button
                data-testid="SHOW_USER_CUSTOMISATION_FORM"
                onClick={() =>
                    dispatch({ type: 'SHOW_USER_CUSTOMISATION_FORM' })
                }
            ></button>
            <button
                data-testid="HIDE_USER_CUSTOMISATION_FORM"
                onClick={() =>
                    dispatch({ type: 'HIDE_USER_CUSTOMISATION_FORM' })
                }
            ></button>
            <button
                data-testid="SET_USER_SIGNED_IN_True"
                onClick={() =>
                    dispatch({ type: 'SET_USER_SIGNED_IN', payload: true })
                }
            ></button>
            <button
                data-testid="SET_USER_SIGNED_IN_False"
                onClick={() =>
                    dispatch({ type: 'SET_USER_SIGNED_IN', payload: false })
                }
            ></button>
            <button
                data-testid="SHOW_USER_PANEL"
                onClick={() => dispatch({ type: 'SHOW_USER_PANEL' })}
            ></button>
            <button
                data-testid="HIDE_USER_PANEL"
                onClick={() => dispatch({ type: 'HIDE_USER_PANEL' })}
            ></button>
        </>
    )
}

function testStateValue(stateName: string, value: any) {
    expect(screen.getByTestId(stateName)).toHaveAttribute(
        'data-value',
        getDataValueTest(value)
    )
}

function getDataValue(state: AppState, stateName: string) {
    // @ts-ignore Accepting any stateName
    return typeof state[stateName] === 'object'
        ? // @ts-ignore Accepting any stateName
          JSON.stringify(state[stateName])
        : // @ts-ignore Accepting any stateName
          String(state[stateName])
}

function getDataValueTest(stateValue: any) {
    return typeof stateValue === 'object'
        ? JSON.stringify(stateValue)
        : String(stateValue)
}
