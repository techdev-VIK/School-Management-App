
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../students/studentsSlice";


export default function Classes() {
  const dispatch = useDispatch();

  const {students} = useSelector((state) => state.students)

  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    dispatch(fetchStudents())
  }, [dispatch])

  useEffect(() => {
    setFilteredStudents(students)
  }, [students])
  

  console.log(students);


  const genderFilterHandler = (e) => {

        const {value} = e.target;

        const filteredGender = value !== "All" ? students.filter((stu) => stu.gender === value) : students;

        setFilteredStudents(filteredGender)
  }

  const sortingHandler = (e) => {
    
    const {value} = e.target;

    const sortedStudents = [...filteredStudents];

    if(value === "name"){
        sortedStudents.sort((a,b) => a.name.localeCompare(b.name));
    }else if(value === "marks"){
        sortedStudents.sort((a,b) => a.marks - b.marks);
    }else if(value === "attendance"){
        sortedStudents.sort((a,b) => a.attendance - b.attendance);
    }else{
        sortedStudents.sort((a,b) => a.age - b.age);
    }

    setFilteredStudents(sortedStudents);
  }

  return(
    <div className="container my-4 ">
        <h1 className="mb-3">Class View</h1>
        
        <label>Filter By Gender:</label>
        <select onChange={genderFilterHandler} className="form-select w-50 mb-4">
            <option value="All">All</option>
            <option value="Male">Boys</option>
            <option value="Female">Girls</option>
        </select>


        <label>Sort By:</label>
        <select onChange={sortingHandler} className="form-select w-50 mb-4">
            <option value="">-- Select --</option>
            <option value="name">Name</option>
            <option value="marks">Marks</option>
            <option value="attendance">Attendance</option>
        </select>


        <ul>
            {filteredStudents && filteredStudents.map((stu) => (
                <li key={stu._id}>{stu.name} - {stu.gender} - Marks: {stu.marks} - Attendance: {stu.attendance}</li>
            ))}
        </ul>

    </div>
  )
}
