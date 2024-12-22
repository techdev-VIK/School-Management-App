
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../students/studentsSlice";

import { useEffect } from "react";

import { Link } from "react-router-dom";

export default function Students(){

    const {students, status, error} = useSelector((state) => state.students);

    // console.log(students)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStudents())
    }, []);

    return(

        <main className="container mt-4">
            <h2>Student View</h2>

            <button className="btn btn-warning">Add Student</button>

            <div className="container mt-3">
            <h3>Student List</h3>
        
        
            {status === "loading" && <p>Loading...</p>}
            {status === "error" && <p>{error}</p>}
            <ul>
            {status === "success" && students.map((stu, index) => (
                <Link to={`/students/${stu._id}`}><li key={index}>
                    {stu.name}(Age: {stu.age})
                </li></Link>
            ))}
            </ul>
        </div>

        </main>
    )
}