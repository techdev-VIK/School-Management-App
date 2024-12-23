
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSortBy } from "./classSlice";

export default function Classes() {
  const dispatch = useDispatch();
  const { students, filter, sortBy } = useSelector((state) => state.students);

  // Filter students based on gender
  const filteredStudents = students.filter((student) => {
    if (filter === "All") return true;
    return student.gender === filter;
  });

  // Sort students based on selected sort criteria
  const sortedStudents = filteredStudents.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name); // Sort alphabetically by name
    } else if (sortBy === "marks") {
      return b.marks - a.marks; // Sort by marks (descending order)
    } else if (sortBy === "attendance") {
      return b.attendance - a.attendance; // Sort by attendance (descending order)
    }
    return 0;
  });

  // Handle filter change
  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };

  // Handle sort change
  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  return (
    <div className="container mt-5">
      <h1>Class View</h1>
      {/* Filter Dropdown */}
      <div className="my-3">
        <label htmlFor="filter">Filter by Gender:</label>
        <select
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          className="ms-2"
        >
          <option value="All">All</option>
          <option value="Boy">Boys</option>
          <option value="Girl">Girls</option>
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className="my-3">
        <label htmlFor="sortBy">Sort by:</label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          className="ms-2"
        >
          <option value="name">Name</option>
          <option value="marks">Marks</option>
          <option value="attendance">Attendance</option>
        </select>
      </div>

      {/* Students List */}
      <ul className="list-group">
        {sortedStudents.map((student, index) => (
          <li key={index} className="list-group-item">
            <p>Name: {student.name}</p>
            <p>Gender: {student.gender}</p>
            <p>Marks: {student.marks}</p>
            <p>Attendance: {student.attendance}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
