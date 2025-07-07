import React from 'react'

function modal({ showModal, handleCancel, handleConfirm }) {
    return (
        <div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-60 z-50 special">
                    <div className="bg-gray-300 p-6 rounded-lg w-90 text-center text-gray-950">
                        <h2 className="text-xl font-bold mb-4">Emin misiniz?</h2>
                        <p className="mb-6">Katili öğrenmek üzeresiniz.</p>
                        <div className="flex justify-evenly">
                            <button
                                onClick={handleConfirm}
                                className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                Evet
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default modal