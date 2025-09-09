interface Props {
    title: string
    children: React.ReactNode
    isModalOpen: boolean
    closeModal: () => void
}

export function FormModal({ title, children, isModalOpen, closeModal }: Props) {
    return (
        isModalOpen && (
            <div className="fixed z-1500 flex items-center justify-center w-screen h-screen">
                <div className="z-1000 overflow-y-hidden overflow-x-hidden flex justify-center items-center w-md h-fit rounded-lg shadow-sm/20">
                    <div className="relative w-full h-full">
                        <div className="relative bg-white p-4">
                            <Header title={title} />
                            {children}
                        </div>
                    </div>
                </div>
                <div
                    className="fixed z-900 bg-gray-900/30 w-screen h-screen"
                    onClick={closeModal}
                ></div>
            </div>
        )
    )
}

interface HeaderProps {
    title: string
}

function Header({ title }: HeaderProps) {
    return (
        <div className="flex items-center justify-between pb-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
    )
}
