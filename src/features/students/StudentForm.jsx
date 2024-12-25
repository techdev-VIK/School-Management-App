import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addStudentsAsync, updateStudentAsync, fetchStudentById } from "./studentsSlice";

export default function StudentForm(){


    const {id} = useParams();

    const location = useLocation();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    

    const {selectedStudent} = useSelector((state) => state.students);

    console.log("Selected Student", selectedStudent)
    

    const student = location.state||{};

    console.log("Student - Location se:  ", student);


    const [name, setName] = useState(student.name || "");
    const [age, setAge] = useState(student.age || "");
    const [grade, setGrade] = useState(student.grade || "");
    const [gender, setGender] = useState(student.gender || "");
    const [attendance, setAttendance] = useState(student.attendance || "");
    const [marks, setMarks] = useState(student.marks || "");


    useEffect(() => {
        if(id){
             // Fetch student data from Redux store when editing (id exists)
            dispatch(fetchStudentById(id))
        }else{
            // Reset form values when creating a new student
            setName("");
            setAge("");
            setGrade("");
            setGender("");
            setAttendance("");
            setMarks("");

        }
    }, [id, dispatch]);

    useEffect(() => {
        if(selectedStudent){
                setName(selectedStudent.name);
                setAge(selectedStudent.age);
                setGrade(selectedStudent.grade);
                setGender(selectedStudent.gender);
                setAttendance(selectedStudent.attendance);
                setMarks(selectedStudent.marks);
            }
           
    }, [selectedStudent])
    
    console.log("Selected Student dobara", selectedStudent)

    console.log("Student - Location se dobara:  ", student);


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

          console.log("New Student: ",newStudent)


          if(id){
            dispatch(updateStudentAsync(newStudent));

            navigate(`/students/${id}`);
          }else{
            dispatch(addStudentsAsync(newStudent));

            navigate("/");
          }
        }

        console.log("Selected Student dobara2", selectedStudent)

    console.log("Student - Location se dobara2:  ", student);

    return(
        <div className="container mt-3">
            <h1>{id ? "Edit Student" : "Add Student"}</h1>

            <form onSubmit={formHandler} className="mt-3">
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}  value={name} required className="form-control mb-3"/>

            

            <input type="number" placeholder="Age" min="1" onChange={(e) => setAge(e.target.value)} value={age} required className="form-control mb-3"/>

            

            <input type="text" placeholder="Grade" onChange={(e) => setGrade(e.target.value)} value={grade} required className="form-control mb-3"/>

            
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