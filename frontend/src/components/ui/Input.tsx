import { useState } from 'react'
import { Icon } from './Icon'

interface Props {
    id: string
    type: 'email' | 'url' | 'date' | 'password' | 'text'
    label: string
    value: any
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    hint?: string
    placeholder?: string
    isFullWidth?: boolean
    maxValue?: any
    isSameLine?: boolean
    isDisabled?: boolean
    isCustomIvalidity?: boolean
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
    isCustomIvalidity = false,
}: Props) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

    const togglePasswordVisibility = () =>
        setIsPasswordVisible((password) => !password)

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
            <div className="flex">
                <input
                    type={
                        type !== 'password'
                            ? type
                            : isPasswordVisible
                              ? 'text'
                              : 'password'
                    }
                    name={id}
                    id={id}
                    title={hint ?? `Fill the ${label}`}
                    className={`bg-gray-50 border rounded-lg p-2.5 text-sm text-gray-900
                        focus:outline focus:outline-sky-600 focus:border-sky-600 
                        invalid:border-red-700 
                        disabled:text-gray-500 disabled:bg-gray-200
                        ${isCustomIvalidity ? 'border-red-700' : 'border-gray-300'}
                        ${isFullWidth && ' w-full '}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    max={maxValue}
                    disabled={isDisabled}
                    aria-invalid={isCustomIvalidity}
                />
                {type === 'password' && (
                    <div className="flex items-center justify-around">
                        <span
                            className="cursor-pointer absolute mr-10 text-gray-600"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? (
                                <Icon
                                    type="eyeOpened"
                                    size="size-5"
                                    filled="none"
                                />
                            ) : (
                                <Icon
                                    type="eyeClosed"
                                    size="size-5"
                                    filled="none"
                                />
                            )}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
