
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, deleteStudentAsync } from "./studentsSlice";
import { useEffect } from "react";

export default function StudentDetail(){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {students, status, error} = useSelector((state) => state.students);

    useEffect(() => {
        if(!students || students.length === 0){
            dispatch(fetchStudents())
            
        }
    }, [dispatch, students])

    const {id} = useParams();

    // console.log(id);

    const studentData = students?.find((stu) => stu._id === id);

    // console.log(studentData);


    const handleDelete = () => {

        const confirmDelete = window.confirm("Are you sure you want to delete this student?");

        if(confirmDelete)
            {
        dispatch(deleteStudentAsync(id));
        
        navigate('/')
      }        
    }

    const handleEdit = () => {

        navigate(`/editStudent/${studentData._id}`, {state: studentData})
    }
    

    return(
        <main className="container mt-5">
            <h2>Student Details</h2>

            {status === "loading" && <div className="alert alert-warning">Loading...</div>}
            {status === "error" && <div className="alert alert-danger">{error}</div>}


            {studentData ? (<div className="mt-3">
                <p>Name: {studentData.name}</p>
                <p>Age: {studentData.age}</p>
                <p>Grade: {studentData.grade}</p>
                <p>Attendance: {studentData.attendance}</p>
                <p>Marks: {studentData.marks}</p>
            
            <button className="btn btn-warning" onClick={handleEdit}>Edit Details</button>

            <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button></div>): (<div className="alert alert-success mt-4">Record Deleted Successfully!!! Redirecting to Previous Page in 3 Seconds...</div>)}
        </main>
    )
}