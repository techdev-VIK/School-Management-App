import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const backendUrl = "https://school-management-rx-3-backend-fg31.vercel.app"

export const fetchStudents = createAsyncThunk("students/fetchStudents", async() => {
    const response = await axios.get(`${backendUrl}/students`)

    // console.log(response.data);

    return response.data;
});

export const addStudentsAsync = createAsyncThunk("students/addStudent", async(newStudent) => {
    const response = await axios.post(`${backendUrl}/students`, newStudent)


    return response.data;
})


export const updateStudentAsync = createAsyncThunk("students/updateStudent", async(updatedStudent) => {
    const response = await axios.put(`${backendUrl}/students/${updatedStudent._id}`, updatedStudent);

    return response.data;
});


export const deleteStudentAsync = createAsyncThunk("students/deleteStudent", async(id) => {
    const response = await axios.delete(`${backendUrl}/students/${id}`)

    return id;
})

export const studentsSlice = createSlice({
    name: "students",
    initialState:{
        students: [],
        status: "idle",
        error: null,
    },
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
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
            state.status = 'error';
            state.error = action.error.message
        });
        builder.addCase(deleteStudentAsync.fulfilled, (state, action) => {
            state.status = "success";
            state.students = state.students.filter((student) => student._id !== action.payload);
        });
        builder.addCase(deleteStudentAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
        builder.addCase(updateStudentAsync.pending, (state) => {
            state.status = "loading"
        });
        builder.addCase(updateStudentAsync.fulfilled, (state, action) => {
            state.status = "success";
            const index = state.students.findIndex((stu) => stu._id === action.payload._id);

            if(index !== -1){
                state.students[index] = action.payload
            }
        })

        builder.addCase(updateStudentAsync.rejected, (state, action) => {
            state.status = "error";
            state.error = action.error.message;
        });
    }
});

export const {resetStatus} = studentsSlice.actions;

export default studentsSlice.reducer