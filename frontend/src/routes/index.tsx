import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Homes!</h3>
            <div className="bg-red-500">tests</div>
        </div>
    )
}
