export default function Review() {
    return (
        <div className="flex flex-col text-sm font-sans font-normal">
            <div className="flex flex-col leading-3">
                <div className="text-base">User Name</div>
                <div className="text-gray-500">
                    User Title - User reviews punctuation
                </div>
            </div>
            <div className="flex gap-x-2 pt-2">
                <div>Rating</div>
                <div>Date (how many years/months/days from now)</div>
            </div>
        </div>
    )
}
