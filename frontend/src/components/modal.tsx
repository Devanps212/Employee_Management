import React from 'react';

const Modal = ({ 
  title,
  setShowModal, 
  children,
  showCancelButton
}: { 
  title: string
  setShowModal: (val: boolean) => void, 
  children: React.ReactNode,
  showCancelButton?: boolean
})=>{
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] overflow-y-auto" data-testid="modal-container">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">{children}</div>
        <div className="mt-4 flex justify-between space-x-2">
          {
            showCancelButton && (
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">
                Cancel
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;
