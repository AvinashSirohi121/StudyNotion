import React from "react";

const Popup = ({ title, message, isVisible, onCancel, onConfirm,btn1,btn2,data }) => {
  if (!isVisible) return null; // Do not render if not visible

  return (
    <div className="fixed  inset-0  backdrop-blur-sm  flex justify-center items-center ">
      <div className="bg-richblack-800 border-richblack-200 border-2  p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex  space-x-4">
          <button
              onClick={()=>onConfirm(data)}
            className="bg-yellow-100  text-richblack-900 font-semibold py-2 px-4 rounded"
          >
            {btn1}
          </button>
          <button
            onClick={onCancel}
            className="bg-richblack-500 hover:bg-richblack-600 text-white font-semibold py-2 px-4 rounded"
          >
            {btn2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
