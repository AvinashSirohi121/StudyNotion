import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  step: 1,
  course: null,
  currentCourse:null,
  editCourse: false,
  paymentLoading: false,
  courseCategory:[],
  loading:false
}

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setCourse: (state, action) => {
      state.course = action.payload
    },
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload
    },
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload
    },
    setCourseCategory: (state, action) => {
      state.courseCategory = action.payload
    },
    resetCourseState: (state) => {
      state.step = 1
      state.course = null
      state.editCourse = false
      state.currentCourse=null
    },
  },
})

export const {
  setStep,
  setCourse,
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
  setCourseCategory,
  setLoading,
  setCurrentCourse
} = courseSlice.actions

export default courseSlice.reducer
