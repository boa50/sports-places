interface Props {
    handleCancel: () => void
    isPostDisabled: boolean
}

export default function Buttons({ handleCancel, isPostDisabled }: Props) {
    return (
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
                                    text-white bg-sky-600 hover:bg-sky-600/90
                                    disabled:text-gray-100 disabled:bg-gray-400 disabled:cursor-default"
                disabled={isPostDisabled}
            >
                Post
            </button>
        </div>
    )
}
