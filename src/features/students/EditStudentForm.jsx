import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EditStudentForm(){


    const [name, setName] = useState('');

    const [age, setAge] = useState('');

    const [grade, setGrade] = useState('');

    const [gender, setGender] = useState('');

    const dispatch = useDispatch();

    const navigate = useNavigate();


    const formHandler = async (e) =>{
        e.preventDefault();
        
        const newStudent = {
            name,
            age: parseInt(age),
            grade,
            gender
        }


        try {
            const response = await axios.post("http://localhost:3000/students")
        } catch (error) {
            
        }


    }


    return(
        <div>
            <h1>Add Student</h1>

            <form onClick={formHandler}>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}  value={name}/>

            <br />

            <input type="number" placeholder="Age" min="1" onChange={(e) => setAge(e.target.value)} value={age}/>

            <br />

            <input type="text" placeholder="Grade" onChange={(e) => setGrade(e.target.value)} value={grade} />

            <br />

            <label>Gender:</label>
            <label htmlFor="male"><input type="radio" name="gender" id="male" value="Male" onChange={(e) => setGender(e.target.value)}/>Male</label>

            <label htmlFor="female"><input type="radio" name="gender" id="female" value="Female" onChange={(e) => setGender(e.target.value)}/>Female</label>

            <br />

            <button type="submit">Add</button>

            </form>
        </div>
    )
}