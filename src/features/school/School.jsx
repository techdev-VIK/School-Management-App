import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSchoolStats, setTopStudent } from "./schoolSlice";

export default function School() {
    const dispatch = useDispatch();

    const { students } = useSelector((state) => state.students);  

    useEffect(() => {
        if (students.length > 0) {
            const totalStudents = students.length;

            const totalAttendance = students.reduce((acc, student) => acc + student.attendance, 0);
            const averageAttendance = (totalAttendance / totalStudents).toFixed(2);

            const totalMarks = students.reduce((acc, student) => acc + student.marks, 0);
            const averageMarks = (totalMarks / totalStudents).toFixed(2);

            const topStudent = students.reduce((topStu, student) => 
                (student.marks > topStu.marks ? student : topStu), students[0]);

            dispatch(updateSchoolStats({
                totalStudents,
                averageAttendance,
                averageMarks,
                topStudent: topStudent ? topStudent.name : "-"
            }));
            
            dispatch(setTopStudent(topStudent ? topStudent.name : "-"));
        }
    }, [students, dispatch]);

    const { totalStudents, averageAttendance, averageMarks, topStudent } = useSelector((state) => state.school.schoolStats);

    return (
        <div className="container mt-5">
            <h1>School View</h1>
            <div className="mt-4">
                <p>Total Students: {totalStudents}</p>
                <p>Average Attendance: {averageAttendance}</p>
                <p>Average Marks: {averageMarks}</p>
                <p>Top Performing Student: {topStudent}</p>
            </div>
        </div>
    );
}
