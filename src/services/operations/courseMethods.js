import { apiConnector } from "../apiconnector";
import { courseEndPoints } from "../api";
import toast from "react-hot-toast";


export const fetchCategories = async()=>{
        let result =[];
            try{
                let data = await apiConnector("GET",courseEndPoints.COURSE_CATEGORIES_API);
                console.log("FetchCategories data =>",data);
                if(data){
                    result=data;
                    //toast.success("Categories fetch Successfully",{duration:3000})
                }
            }catch(error){
                console.log("Error while fetching Categories =>",error);
                toast.error("Error while fetching Course Category",{duration:3000})
            }
        return result;
}