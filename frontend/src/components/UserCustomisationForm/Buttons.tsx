import { Button, ProcessingButton } from '../ui'

interface Props {
    isProcessing: boolean
    handleCancel: () => void
    isNewUser: boolean
}

export default function Buttons({
    isProcessing,
    handleCancel,
    isNewUser,
}: Props) {
    const btnWidth = 'w-28'
    const containerClass = 'flex gap-2 justify-end mt-10'

    return isProcessing ? (
        <div
            className={containerClass}
            data-testid="user-customisation-buttons"
        >
            {!isNewUser && (
                <Button
                    title="Cancel"
                    isSecondary={true}
                    isDisabled={true}
                    width={btnWidth}
                />
            )}
            <ProcessingButton width={btnWidth} />
        </div>
    ) : (
        <div
            className={containerClass}
            data-testid="user-customisation-buttons"
        >
            {!isNewUser && (
                <Button
                    title="Cancel"
                    isSecondary={true}
                    onClick={handleCancel}
                    width={btnWidth}
                />
            )}
            <Button title="Save Changes" isSubmit={true} width={btnWidth} />
        </div>
    )
}
