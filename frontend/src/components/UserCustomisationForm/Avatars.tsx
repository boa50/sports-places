import UserAvatar from '../UserAvatar'

interface Props {
    selectedAvatar: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Avatars({ selectedAvatar, handleChange }: Props) {
    const availableAvatars = [
        { type: 'default', url: 'default' },
        { type: 'red', url: 'https://i.ibb.co/C5prjF4G/red.webp' },
        { type: 'green', url: 'https://i.ibb.co/WWDgDSSh/green.webp' },
        { type: 'blue', url: 'https://i.ibb.co/VWy8KXTN/blue.webp' },
    ]

    return (
        <div className="flex flex-col gap-4">
            <div className="text-sm font-medium text-gray-900">
                Display Picture
            </div>
            <div className="flex justify-around">
                {availableAvatars.map((d, i) => (
                    <div key={i}>
                        <input
                            type="radio"
                            id={`value-${d.type}`}
                            name="ratingStarsRadio"
                            value={d.type}
                            checked={selectedAvatar === d.type}
                            onChange={handleChange}
                            className="hidden peer"
                        />
                        <label
                            htmlFor={`value-${d.type}`}
                            className="cursor-pointer"
                        >
                            <div
                                className={
                                    selectedAvatar === d.type
                                        ? 'ring-5 ring-sky-600/70 rounded-full'
                                        : ''
                                }
                            >
                                <UserAvatar size="big" avatarUrl={d.url} />
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
