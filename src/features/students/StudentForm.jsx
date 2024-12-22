import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStudentsAsync } from "./studentsSlice";

export default function StudentForm(){


    const [name, setName] = useState('');

    const [age, setAge] = useState('');

    const [grade, setGrade] = useState('');

    const [gender, setGender] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const formHandler = (e) =>{
        e.preventDefault();
        
        const newStudent = {
            name,
            age: parseInt(age),
            grade,
            gender
          };


          dispatch(addStudentsAsync(newStudent));

          setName('');
          setAge('');
          setGender('');
          setGrade('')

        navigate('/')
    }


    return(
        <div className="container mt-3">
            <h1>Add Student</h1>

            <form onSubmit={formHandler} className="mt-3">
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}  value={name} required className="form-control mb-3"/>

            

            <input type="number" placeholder="Age" min="1" onChange={(e) => setAge(e.target.value)} value={age} required className="form-control mb-3"/>

            

            <input type="text" placeholder="Grade" onChange={(e) => setGrade(e.target.value)} value={grade} required className="form-control mb-3"/>

            
        <div className="inout-group mb-3">
            <label className="me-2">Gender:</label>
            <label htmlFor="male" className="me-2"><input type="radio" name="gender" id="male" value="Male" className="me-1" onChange={(e) => setGender(e.target.value)}/>Male</label>

            <label htmlFor="female"><input type="radio" name="gender" id="female" className="me-1" value="Female" onChange={(e) => setGender(e.target.value)}/>Female</label>
        </div>
            
            

            <button type="submit" className="btn btn-primary">Add</button>

            </form>
        </div>
    )
}