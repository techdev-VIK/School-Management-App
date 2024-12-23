import 'bootstrap/dist/css/bootstrap.min.css';

import {Routes, Route } from "react-router-dom";

import Header from './components/Header';

import Classes from './features/class/Classes';

import School from './features/school/School';

import Students from './features/students/Students';
import StudentDetail from './features/students/StudentDetails';

import StudentForm from './features/students/StudentForm';



function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/school" element={<School />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/add" element={<StudentForm />} />

        <Route path="/students/edit/:id" element={<StudentForm />} />

      </Routes>
    </>
  )
}

export default App
