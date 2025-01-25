import React, { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";
import SubSectionPopup from "./SubSectionPopup";
import { TiDocumentText } from "react-icons/ti";
import Popup from "../common/Popup";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../services/operations/authMethods"
import { useNavigate } from "react-router-dom";
import { deleteSection } from "../../services/operations/sectionMethod";
import { deleteSubSection } from "../../services/operations/subSectionMethod";
import { setCourse } from "../../slices/courseSlice";
import toast from "react-hot-toast";

const NestedComponent = ({ section, courseId, openSectionId, toggleSection }) => {
  const {token} = useSelector((state)=>state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subSectionPopup, setSubSectionPopup] = useState(false);
  const [popupConfig, setPopupConfig] = useState({ isVisible: false, context: "", id: null });

  const handleEditSection = () => console.log("Edit section:", section._id);

  const handleDeleteSection = () => setPopupConfig({ isVisible: true, context: "section", id: section._id });

  const handleEditSubSection = (id) => console.log("Edit subsection:", id);

  const handleDeleteSubSection = (id) => setPopupConfig({ isVisible: true, context: "subsection", id });

  const handleAddSubSection = () => setSubSectionPopup(true);

  const confirmDelete = () => {
    const { context, id } = popupConfig;
    if (context === "section") {
      console.log("Section deleted:", id);
      // Call the delete section API or function here
      deleteSections(id);
    } else if (context === "subsection") {
      console.log("Subsection deleted:", id);
      deleteSubSections(id);
      // Call the delete subsection API or function here
    }
    setPopupConfig({ isVisible: false, context: "", id: null });
  };

  const deleteSections =async(sectionId)=>{
      let formData = new FormData();
    
        
      formData.append("sectionId",sectionId);
      formData.append("courseId",courseId);

 
      try{
          let data = await deleteSection(token,formData);
          if(data){
            console.log("Delete Section =>",data);
            dispatch(setCourse(data));
            toast.success("Section deleted successfully",{duration:3000})
          }
      }catch(error){
          console.log("Error while deleting Section =>",error)
          if(error?.response?.data?.message=="Token is invalid or expired"){
            dispatch(logout(navigate));
         }
      }
  }
  const deleteSubSections =async (subSectionId)=>{
    let formData = new FormData();
    
        
      formData.append("subSectionId",subSectionId);
      formData.append("courseId",courseId);
      formData.append("sectionId",section._id);

 
      try{
          let data = await deleteSubSection(token,formData);
          if(data){
            console.log("Delete Lecture =>",data);
            dispatch(setCourse(data));
            toast.success("Lecture deleted successfully",{duration:3000})
          }
      }catch(error){
          console.log("Error while deleting Lecture =>",error)
          if(error?.response?.data?.message=="Token is invalid or expired"){
            dispatch(logout(navigate));
         }
      }
  }
  return (
    <div>
      {/* Section Part */}
      <div className="h-[3rem] p-2 flex justify-between items-center border-b-[1px] border-richblack-600">
        <div 
        onClick={() => toggleSection(section._id)}
        className="flex gap-2 items-center w-[60%] cursor-pointer">
          {/* Toggle section open/close */}
          {openSectionId === section._id ? (
            <TiArrowSortedUp  />
          ) : (
            <TiArrowSortedDown  />
          )}
          <h2>{section.sectionName}</h2>
        </div>
        <div className="flex gap-2">
          <MdEdit className="hover:text-yellow-50" onClick={handleEditSection} />
          <MdDelete className="hover:text-pink-1000" onClick={handleDeleteSection} />
        </div>
      </div>

      {/* SubSection Part */}
      {openSectionId === section._id && (
        <div className="w-[80%] flex-col gap-4 mx-auto">
          {section?.subSection &&
            section?.subSection.map((subSection) => (
              <div
                key={subSection._id}
                className="h-[3rem] p-2 flex justify-between items-center border-b-[1px] border-richblack-600"
              >
                <div className="flex w-[100%] justify-between items-center">
                  <div className="cursor-pointer flex gap-2 items-center">
                    <h2 className="flex justify-center items-center gap-2">
                      <TiDocumentText />
                      {subSection?.title}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <MdEdit
                      className="hover:text-yellow-50"
                      onClick={() => handleEditSubSection(subSection._id)}
                    />
                    <MdDelete
                      className="hover:text-pink-1000"
                      onClick={() => handleDeleteSubSection(subSection._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          <h2
            onClick={handleAddSubSection}
            className="mt-4 flex gap-2 items-center text-yellow-50 cursor-pointer"
          >
            <MdOutlineAdd className="text-2xl" /> Add Lecture
          </h2>
        </div>
      )}

      {/* SubSection Popup */}
      <SubSectionPopup
        courseId={courseId}
        sectionId={section._id}
        isVisible={subSectionPopup}
        onCancel={() => setSubSectionPopup(false)}
        btn1="Save Lecture"
      />

      {/* Reusable Popup */}
      <Popup
        title={
          popupConfig.context === "section"
            ? "Do you want to delete this section?"
            : "Do you want to delete this Lecture?"
        }
        message={
          popupConfig.context === "section"
            ? "All the data related to this section will be deleted."
            : "This lecture will be deleted."
        }
        isVisible={popupConfig.isVisible}
        onCancel={() => setPopupConfig({ isVisible: false, context: "", id: null })}
        onConfirm={confirmDelete}
        btn1="Delete"
        btn2="Cancel"
      />
    </div>
  );
};

export default NestedComponent;
