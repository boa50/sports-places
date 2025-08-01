import { RatingStars } from './ui/RatingStars'

interface Props {
    isShow: boolean
    hideWriteReview: () => void
}

export default function ReviewWrite({ isShow, hideWriteReview }: Props) {
    const handlePost = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted')
    }
    const handleCancel = () => {
        hideWriteReview()
        console.log('Form cancelled')
    }

    return (
        isShow && (
            <div className="fixed z-1500 flex items-center justify-center bg-gray-900/30 w-screen h-screen">
                <div
                    id="crud-modal"
                    aria-hidden="true"
                    className="z-1000 overflow-y-auto overflow-x-hidden flex top-0 right-0 left-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Review
                                </h3>
                            </div>
                            <form
                                className="flex flex-col gap-4"
                                onSubmit={handlePost}
                            >
                                <div className="flex items-center justify-center p-4">
                                    <RatingStars rating={3.5} size="normal" />
                                </div>
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        aria-label="Cancel"
                                        title="Cancel"
                                        onClick={handleCancel}
                                        className="w-20 cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none
                                    text-sky-700 bg-transparent hover:bg-gray-950/5 border border-sky-700"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        aria-label="Post"
                                        title="Post"
                                        className="w-20 cursor-pointer font-medium rounded-lg text-sm p-2.5 focus:outline-none
                                    text-white bg-sky-600 hover:bg-sky-600/90"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
