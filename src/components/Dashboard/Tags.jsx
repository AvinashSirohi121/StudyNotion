import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

const TagInput = ({ placeholder, onTagsChange }) => {
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  // Handle input value change
  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  // Handle key press (Enter, Space, Tab)
  const handleKeyDown = (e) => {
    if ((e.code === "Enter" || e.code === "Space" || e.code === "Tab") && tagInput.trim() !== "") {
      const newTag = { id: `${Date.now()}`, name: tagInput.trim() };
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setTagInput(""); // Clear the input field
      onTagsChange(updatedTags); // Send updated tags back to the parent
    }
  };

  // Handle tag deletion
  const deleteTag = (id) => {
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setTags(updatedTags);
    onTagsChange(updatedTags); // Send updated tags back to the parent
  };

  return (
    <div className='flex flex-col mt-4'>
         <label className='flex tracking-wider  text-sm'>Tags <AiFillStar className='text-[5px] ml-2 text-pink-1000'/></label>
      <div className={`flex gap-2 flex-wrap ${tags.length>0 ?"mt-2 mb-1":""}`}>

        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center gap-2 px-2 bg-yellow-600 p-1 rounded-2xl"
          >
            <p>{tag.name}</p>
            <MdOutlineCancel
              className="text-yellow-50 cursor-pointer"
              onClick={() => deleteTag(tag.id)}
            />
          </div>
        ))}
      </div>
      <input
        type="text"
        value={tagInput}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className="h-[40px] rounded-lg bg-richblack-800 pl-2 border-b border-richblack-400 outline-none mt-1 no-arrows"
        placeholder={placeholder || "Enter a tag"}
      />
    </div>
  );
};

export default TagInput;
