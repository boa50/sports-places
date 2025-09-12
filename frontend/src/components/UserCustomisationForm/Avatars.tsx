import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { avatarsQueryOptions } from '@/queryOptions'
import UserAvatar from '../UserAvatar'

import type { Avatar } from '@/types'

interface Props {
    selectedAvatar: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Avatars({ selectedAvatar, handleChange }: Props) {
    const [availableAvatars, setAvailableAvatars] = useState<Avatar[]>([])
    const { data: avatarsData } = useQuery(avatarsQueryOptions())

    useEffect(() => {
        if (avatarsData !== undefined)
            setAvailableAvatars([
                { description: 'default', url: 'default' },
                ...avatarsData,
            ])
    }, [avatarsData])

    return (
        <div
            className="flex flex-col gap-4"
            data-testid="user-customisation-avatars"
        >
            <div className="text-sm font-medium text-gray-900">
                Display Picture
            </div>
            <ul className="flex justify-around">
                {availableAvatars.map((d, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            id={`value-${d.description}`}
                            name="ratingStarsRadio"
                            value={d.description}
                            checked={selectedAvatar === d.description}
                            onChange={handleChange}
                            className="hidden peer"
                        />
                        <label
                            htmlFor={`value-${d.description}`}
                            className="cursor-pointer"
                        >
                            <div
                                className={
                                    selectedAvatar === d.description
                                        ? 'ring-5 ring-sky-600/70 rounded-full'
                                        : ''
                                }
                            >
                                <UserAvatar size="big" avatarUrl={d.url} />
                            </div>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}
