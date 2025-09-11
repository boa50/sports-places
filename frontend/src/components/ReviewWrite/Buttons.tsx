import { Button } from '../ui'

interface Props {
    handleCancel: () => void
    isPostDisabled: boolean
}

export default function Buttons({ handleCancel, isPostDisabled }: Props) {
    return (
        <div
            className="flex gap-2 justify-end"
            data-testid="review-write-buttons"
        >
            <Button
                title="Cancel"
                isSecondary={true}
                onClick={handleCancel}
                width="w-20"
            />
            <Button
                title="Post"
                isSubmit={true}
                isDisabled={isPostDisabled}
                width="w-20"
            />
        </div>
    )
}
