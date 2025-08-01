import Review from './Review'

export default function ReviewsList() {
    return (
        <ul className="flex-1 h-full divide-y divide-gray-200">
            {Array.from({ length: 20 }).map((review, i) => (
                <li key={i} className="w-full px-6 py-3">
                    <Review />
                </li>
            ))}
        </ul>
    )
}
