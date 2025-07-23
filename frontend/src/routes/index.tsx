import { createFileRoute } from '@tanstack/react-router'
import Map from '../components/Map'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return <Map id="root" />
}
