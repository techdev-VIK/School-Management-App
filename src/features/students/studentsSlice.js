import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async() => {
    const response = await axios.get("http://localhost:3000/students")

    // console.log(response.data);

    return response.data;
})


export const studentsSlice = createSlice({
    name: "students",
    initialState:{
        students: [],
        status: "idle",
        error: null,
    },
    reducers: {
        addNewStudentPressed: (state, action) => {
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStudents.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(fetchStudents.fulfilled, (state, action) => {
            state.status = "success";
            state.students = action.payload;
        });
        builder.addCase(fetchStudents.rejected, (state, action) => {
            state.status = "error",
            state.error = action.payload
        })
    }
});


export default studentsSlice.reducer