import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";
import SubSectionPopup from "./SubSectionPopup";
import { TiDocumentText } from "react-icons/ti";

const NestedComponent = ({ section,courseId, openSectionId, toggleSection }) => {

  const [subSectionPopup,setsubSectionPopup]  = useState(false);

  const editSection = () => {
    console.log("Edit section:", section._id);
  };

  const deleteSection = () => {
    console.log("Delete section:", section._id);
  };

  const editSubSection = (subSectionId) => {
    console.log("Edit subsection:", subSectionId);
  };

  const deleteSubSection = (subSectionId) => {
    console.log("Delete subsection:", subSectionId);
  };

  const addSubSection =(sectionId)=>{
        console.log("Opening subSection =>",subSectionPopup)
        setsubSectionPopup(true);
  }

  return (
    <div>
      {/* Section Part */}
      <div className="h-[3rem] p-2 flex justify-between items-center border-b-[1px] border-richblack-600">
        <div className="flex gap-2 items-center">
          {/* Toggle section open/close */}
          {openSectionId === section._id ? (
            <TiArrowSortedUp onClick={() => toggleSection(section._id)} />
          ) : (
            <TiArrowSortedDown onClick={() => toggleSection(section._id)} />
          )}
          <h2>{section.sectionName}</h2>
        </div>
        <div className="flex gap-2">
          <MdEdit
            className="hover:text-yellow-50"
            onClick={() => editSection()}
          />
          <MdDelete
            className="hover:text-pink-1000"
            onClick={() => deleteSection()}
          />
        </div>
      </div>

      {/* SubSection Part */}
      {openSectionId === section._id && (
        <div className="w-[80%] flex-col gap-4 mx-auto">
          {section?.subSection &&
            section?.subSection.map((subSection, subSectionId) => (
              <div
                key={subSectionId}
                className="h-[3rem] p-2 flex justify-between items-center border-b-[1px] border-richblack-600"
              >
                <div className="flex w-[100%] justify-between items-center">
                  <div className="cursor-pointer flex gap-2 items-center">
                    <h2 className="flex justify-center items-center gap-2"><TiDocumentText />{subSection?.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <MdEdit
                      className="hover:text-yellow-50"
                      onClick={() => editSubSection(subSectionId)}
                    />
                    <MdDelete
                      className="hover:text-pink-1000"
                      onClick={() => deleteSubSection(subSectionId)}
                    />
                  </div>
                </div>
              </div>
            ))}
          <h2 
           onClick={()=>addSubSection(section._id)}
          className="mt-4 flex gap-2 items-center text-yellow-50 cursor-pointer">
            <MdOutlineAdd className="text-2xl" /> Add Lecture
          </h2>
        </div>
      )}

      <SubSectionPopup
      courseId={courseId}
      sectionId={section._id}
      isVisible={subSectionPopup}
      onCancel={()=>setsubSectionPopup(!subSectionPopup)}
      btn1="Save Lecture"
      />
    </div>
  );
};

export default NestedComponent;
