import PlacesMarkers from './PlacesMarkers'
import { screen } from '@testing-library/react'
import { customRender, mockApiCalls, testVariables } from '@/test/utils'

vi.mock('../AlertScreen', () => {
    return {
        default: () => <div data-testid="alert-screen"></div>,
    }
})

vi.mock('../PlaceMarker', () => {
    return {
        default: () => <div data-testid="place-marker"></div>,
    }
})

mockApiCalls()

test('rendering the component', async () => {
    customRender(<PlacesMarkers />, {
        state: {},
        dispatch: vi.fn(),
    })

    expect(screen.getByTestId('alert-screen')).toBeInTheDocument()
    expect(screen.queryByTestId('place-marker')).not.toBeInTheDocument()

    await screen.findAllByTestId('place-marker')
    expect(screen.queryByTestId('alert-screen')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('place-marker').length).toBe(
        testVariables.numberOfPlaces
    )
})
