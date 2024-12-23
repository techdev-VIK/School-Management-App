import { createSlice } from "@reduxjs/toolkit";

// Sample student data (assuming this is similar to your structure)
const initialState = {
  students: [
    { name: "John", gender: "Boy", marks: 85, attendance: 90 },
    { name: "Mary", gender: "Girl", marks: 90, attendance: 95 },
    // Add more students...
  ],
  filter: "All",  // Initial filter is set to "All"
  sortBy: "name", // Default sorting is by "name"
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;  // Update the filter state
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;  // Update the sortBy state
    },
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer;
