import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchStudents = createAsyncThunk("students/fetchStudents", async() => {
    const response = await axios.get("http://localhost:3000/students")

    // console.log(response.data);

    return response.data;
});

export const addStudentsAsync = createAsyncThunk("students, addStudent", async(newStudent) => {
    const response = await axios.post("http://localhost:3000/students", newStudent)


    return response.data;
})



export const updateStudentsAsync = createAsyncThunk("students, updateStudents", async(updatedStudent) => {
    const {_id, ...rest} = updatedStudent;
    const response = await axios.put(`http://localhost:3000/students/${_id}`, rest)

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
            state.error = action.error.message
        });
        builder.addCase(addStudentsAsync.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(addStudentsAsync.fulfilled, (state, action) => {
            state.status = "success";
            state.students.push(action.payload);

        });
        builder.addCase(addStudentsAsync.rejected, (state, action) => {
            state.status = 'Failed';
            state.error = action.error.message
        })
    }
});


export default studentsSlice.reducer