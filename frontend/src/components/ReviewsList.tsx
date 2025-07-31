import Review from './Review'

export default function ReviewsList() {
    const reviews = [
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
        <Review />,
    ]

    return (
        <>
            <ul className="flex-1 h-full divide-y divide-gray-200">
                {reviews.map((review, i) => (
                    <li key={i} className="w-full p-4">
                        {review}
                    </li>
                ))}
            </ul>
        </>
    )
}
