import { Icon } from './ui'

interface Props {
    size: 'small' | 'big'
}

export default function UserAvatar({ size }: Props) {
    return (
        <div className="bg-gray-400 text-gray-100 p-1.5 rounded-full">
            <Icon type="user" size={size === 'small' ? 'size-5' : 'size-14'} />
        </div>
    )
}
