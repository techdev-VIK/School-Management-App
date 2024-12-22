
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";

export default function StudentDetail(){

    const {students} = useSelector((state) => state.students);


    const {id} = useParams();

    // console.log(id);

    const studentData = students?.find((stu) => stu._id === id)

    // console.log(studentData);
    

    return(
        <main className="container mt-5">
            <h2>Student Details</h2>
            {studentData ? (<div className="mt-3">
                <p>Name: {studentData.name}</p>
                <p>Age: {studentData.age}</p>
                <p>Grade: {studentData.grade}</p>
                <p>Attendance: {studentData.attendance}</p>
                <p>Marks: {studentData.marks}</p>
            
            <button className="btn btn-warning">Edit Details</button>

            <button className="btn btn-danger ms-2">Delete</button></div>) : (<div className="alert alert-danger mt-4">Student Details not Found. Please try again!!!</div>)}
        </main>
    )
}