import React from 'react'

const SubSectionPopup = ({isVisible,onCancel, onConfirm,data}) => {
    if (!isVisible) return null; // Do not render if not visible

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
      <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
      <h2 className="text-xl font-semibold mb-4">title</h2>
        <p className="mb-6">message</p>
        <div className="flex  space-x-4">
          <button
              onClick={()=>onConfirm(data)}
            className="bg-yellow-100  text-richblack-900 font-semibold py-2 px-4 rounded"
          >
            btn1
          </button>
          <button
            onClick={onCancel}
            className="bg-richblack-500 hover:bg-richblack-600 text-white font-semibold py-2 px-4 rounded"
          >
            btn2
          </button>
        </div>
        </div>
        
        
      </div>
    </div>
  );
}

export default SubSectionPopup