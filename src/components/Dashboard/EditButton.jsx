import React from 'react'
import { LiaEditSolid } from "react-icons/lia";

const EditButton = () => {
  return (
    <button className='flex text-black bg-yellow-50 gap-3 justify-center items-center p-2 rounded-lg w-[6rem] h-[2.5rem] font-bold leading-3'>
    Edit
    <LiaEditSolid className='text-xl mb-1'/>
    </button>
  )
}

export default EditButton