import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
    name: "school",
    initialState: {
        schoolStats: {
            totalStudents: 0,
            averageAttendance: 0,
            averageMarks: 0,
            topStudent: null
        },
    },
    reducers: {
        updateSchoolStats: (state, action) => {
            state.schoolStats = action.payload;
        },
        setTopStudent: (state, action) => {
            state.schoolStats.topStudent = action.payload;
        }
    }
});

export const { updateSchoolStats, setTopStudent } = schoolSlice.actions;

export default schoolSlice.reducer;
