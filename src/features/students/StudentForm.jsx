import { useState } from "react"

export default function StudentForm(){


    const [name, setName] = useState('');

    const [age, setAge] = useState('');

    const [grade, setGrade] = useState('');

    const [gender, setGender] = useState('');


    const formHandler = (e) =>{
        e.preventDefault();


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
            <label htmlFor="male"><input type="radio" name="gender" id="male" value={Male} onChange={(e) => setGender(e.target.value)}/>Male</label>

            <label htmlFor="female"><input type="radio" name="gender" id="female" value={Female} onChange={(e) => setGender(e.target.value)}/>Female</label>

            <br />

            <button type="submit">Add</button>

            </form>
        </div>
    )
}