interface Props {
    id: string
    type: 'email' | 'url' | 'date' | 'password'
    label: string
    value: any
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    hint?: string
    placeholder?: string
    isFullWidth?: boolean
}

export function Input({
    id,
    type,
    label,
    value,
    onChange,
    hint,
    placeholder = '',
    isFullWidth = false,
}: Props) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                {label}
            </label>
            <input
                type={type}
                name={id}
                id={id}
                title={hint ?? `Fill the ${label}`}
                className={`bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm text-gray-900
                        focus:outline focus:outline-sky-600 focus:border-sky-600 
                        invalid:border-red-700 
                        ${isFullWidth && ' w-full '}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
