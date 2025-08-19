interface Props {
    id: string
    type: 'email' | 'url' | 'date' | 'password'
    label: string
    value: any
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    hint?: string
    placeholder?: string
    isFullWidth?: boolean
    maxValue?: any
    isSameLine?: boolean
    isDisabled?: boolean
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
    maxValue,
    isSameLine = false,
    isDisabled = false,
}: Props) {
    return (
        <div
            className={
                isSameLine
                    ? 'flex gap-2 justify-start items-center'
                    : 'flex flex-col gap-2'
            }
        >
            <label
                htmlFor={id}
                className={`text-sm font-medium ${isDisabled ? 'text-gray-500' : 'text-gray-900'}`}
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
                        disabled:text-gray-500 disabled:bg-gray-200
                        ${isFullWidth && ' w-full '}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                max={maxValue}
                disabled={isDisabled}
            />
        </div>
    )
}
