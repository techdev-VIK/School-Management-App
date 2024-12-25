import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addStudentsAsync, updateStudentAsync } from "./studentsSlice";

export default function StudentForm(){



    const {id} = useParams();

    const {status, error} = useSelector((state) => state.students)

    const location = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

 
    const student = location.state||{};


    const [name, setName] = useState(student.name || "");
    const [age, setAge] = useState(student.age || "");
    const [grade, setGrade] = useState(student.grade || "");
    const [gender, setGender] = useState(student.gender || "");
    const [attendance, setAttendance] = useState(student.attendance || "");
    const [marks, setMarks] = useState(student.marks || "");



    const formHandler = (e) =>{
        e.preventDefault();
        
        const newStudent = {
            _id: id,
            name,
            age: parseInt(age),
            grade,
            gender,
            attendance: parseInt(attendance),
            marks: parseInt(marks),
          };


          
            if(id){
                dispatch(updateStudentAsync(newStudent));

                setTimeout(() => {
                    navigate(`/students/${id}`);
                }, 3000);
              

              }else{
                dispatch(addStudentsAsync(newStudent));
                
                setTimeout(() => {
                    navigate("/");
                }, 3000);

              }
          }
          


    return(
        <div className="container mt-3">
            <h1>{id ? "Edit Student" : "Add Student"}</h1>

            {status === "loading" && <div className="alert alert-warning">Loading...</div>}
            {status === "error" && <div className="alert alert-danger">{error}</div>}


            <form onSubmit={formHandler} className="mt-3">
            <input type="text" placeholder="Name" maxLength={30} onChange={(e) => setName(e.target.value)}  value={name} required className="form-control mb-3"/>

            

            <input type="number" placeholder="Age" min="1" onChange={(e) => setAge(e.target.value)} value={age} required className="form-control mb-3"/>


            <select onChange={(e) => setGrade(e.target.value)} value={grade} required className="form-select mb-3">
                <option value="" disabled>-- Select Grade --</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="F">F</option>
            </select>

            
        <div className="input-group mb-3">
            <label className="me-2">Gender:</label>
            <label htmlFor="male" className="me-2"><input type="radio" name="gender" id="male" value="Male" className="me-1" onChange={(e) => setGender(e.target.value)} checked={gender === "Male"}/>Male</label>

            <label htmlFor="female"><input type="radio" name="gender" id="female" className="me-1" value="Female" onChange={(e) => setGender(e.target.value)} checked={gender === "Female"}/>Female</label>
        </div>
            
            

        {id && (
          <>
            <input
              type="number"
              placeholder="Attendance"
              min="0"
              max="100"
              onChange={(e) => setAttendance(e.target.value)}
              value={attendance}
              required
              className="form-control mb-3"
            />

            <input
              type="number"
              placeholder="Marks"
              min="0"
              max="100"
              onChange={(e) => setMarks(e.target.value)}
              value={marks}
              required
              className="form-control mb-3"
            />
          </>
        )}

            <button type="submit" className="btn btn-primary">
            {id ? "Update" : "Add"}
            </button>

            </form>
            
        </div>
    )
}