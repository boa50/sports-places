import PlaceMarker from './PlaceMarker'
import { screen, fireEvent } from '@testing-library/react'
import { customRender } from '@/test/utils'
import type { Place } from '@/types'

vi.mock(import('react-leaflet'), async (importOriginal) => {
    const mod = await importOriginal<any>()

    return {
        ...mod,
        Marker: ({ eventHandlers }) => (
            <button
                data-testid="leaflet-marker"
                // @ts-ignore Not using all the differences
                onClick={eventHandlers?.click}
            />
        ),
    }
})

function buildTestPlace(placeId: number): Place {
    return {
        placeId: placeId,
        lat: 0.5,
        lng: 0.5,
    }
}

test('show place marker', async () => {
    const place = buildTestPlace(-1)
    const slectedPlace = buildTestPlace(1)

    customRender(<PlaceMarker place={place} />, {
        // @ts-ignore Not testing all the states
        state: { selectedPlace: slectedPlace },
        dispatch: vi.fn(),
    })

    await screen.findByTestId('leaflet-marker')

    expect(screen.getByTestId('leaflet-marker')).toBeDefined()
})

test('click place marker without click action', async () => {
    const place = buildTestPlace(-1)
    const slectedPlace = buildTestPlace(1)

    const mockDispatch = vi.fn()

    customRender(<PlaceMarker place={place} hasClickAction={false} />, {
        // @ts-ignore Not testing all the states
        state: { selectedPlace: slectedPlace },
        dispatch: mockDispatch,
    })

    await screen.findByTestId('leaflet-marker')

    const markerBtn = screen.getByTestId('leaflet-marker')
    expect(markerBtn).toBeDefined()

    fireEvent.click(markerBtn)

    expect(mockDispatch).not.toHaveBeenCalled()
})

test('click place marker with click action', async () => {
    const place = buildTestPlace(-1)
    const slectedPlace = buildTestPlace(1)

    const mockDispatch = vi.fn()

    customRender(<PlaceMarker place={place} hasClickAction={true} />, {
        // @ts-ignore Not testing all the states
        state: { selectedPlace: slectedPlace },
        dispatch: mockDispatch,
    })

    await screen.findByTestId('leaflet-marker')

    const markerBtn = screen.getByTestId('leaflet-marker')
    expect(markerBtn).toBeDefined()

    fireEvent.click(markerBtn)

    expect(mockDispatch).toHaveBeenCalledTimes(3)
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'CHANGE_SELECTED_PLACE',
        payload: place,
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'OPEN_PANEL',
    })
    expect(mockDispatch).toHaveBeenCalledWith({
        type: 'HIDE_NEW_PLACE_MARKER',
    })
})
