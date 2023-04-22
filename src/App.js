import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [students, setStudents] = useState([]);
    const [saved, setSaved] = useState(false);

    const handleAddStudent = () => {
        const isEditing = students.some((student) => student.editing);
        if (isEditing) {
            alert('Please finish editing the current student before adding a new one.');
            return;
        }
        const newStudent = { name: '', exam: 0, project: 0, tasks: 0, attendance: 0, editing: true };
        setStudents([...students, newStudent]);
        setSaved(false); // Reset the saved state when adding a new student
    };

    const handleDeleteStudent = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this student?');
        if (confirmation) {
            const newStudents = [...students];
            newStudents.splice(index, 1);
            setStudents(newStudents);
        }
    };

    const handleEditStudent = (index) => {
        const newStudents = [...students];
        newStudents[index].editing = true;
        setStudents(newStudents);
    };

    const handleSaveStudent = (index) => {
        const newStudents = [...students];
        const { name, exam, project, tasks, attendance } = newStudents[index];
        if (name.trim() === '') {
            alert('Please enter a first and last name for the student.');
            return;
        }
        const totalPoints = exam + project + tasks + attendance;
        const average = (totalPoints / 4).toFixed(2);
        const finalGrade = getFinalGrade(average);
        const cellStyle = getCellStyle(average);
        newStudents[index] = { name, exam, project, tasks, attendance, average, finalGrade, cellStyle };
        setStudents(newStudents);

        // Check if all students have been saved
        const allStudentsSaved = newStudents.every((student) => student.average !== undefined);
        if (allStudentsSaved) {
            setSaved(true);
        }
    };

    const handleCancelEdit = (index) => {
        const newStudents = [...students];
        newStudents[index].editing = false;
        setStudents(newStudents);
    };

    const handleNameChange = (index, event) => {
        const newStudents = [...students];
        newStudents[index].name = event.target.value;
        setStudents(newStudents);
    };

    const handlePointsChange = (category, index, event) => {
        const newStudents = [...students];
        newStudents[index][category] = Math.max(0, Math.min(100, Number(event.target.value))); // Prevent negative values
        setStudents(newStudents);
    };


    const calculateAverage = (student) => {
        const totalPoints = student.exam + student.project + student.tasks + student.attendance;
        return (totalPoints / 4).toFixed(2);
    };

    const getFinalGrade = (average) => {
        if (average < 50) return 'FAIL';
        if (average < 62.5) return '2';
        if (average < 75) return '3';
        if (average < 87.5) return '4';
        return '5';
    };

    const getCellStyle = (average) => {
        return average < 50 ? { backgroundColor: 'red', color: 'white' } : { backgroundColor: 'green', color: 'white' };
    };

    const fetchStudentsData = async () => {
        try {
            const response = await fetch('http://localhost:502/api/data');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students data:', error);
        }
    };

    useEffect(() => {
        fetchStudentsData();
    }, []);

    return (
        <div>
            <h1>Evidencija bodova studenata</h1>
            {saved && <p>All entries saved successfully!</p>}
            <button onClick={handleAddStudent}>ADD STUDENT</button>
            <table>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>EXAM</th>
                        <th>PROJECT</th>
                        <th>TASKS</th>
                        <th>ATTENDANCE</th>
                        <th>POINTS</th>
                        <th>FINAL GRADE</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => {
                        const average = student.editing ? null : calculateAverage(student);
                        const finalGrade = average !== null ? getFinalGrade(average) : '-';
                        const cellStyle = average !== null ? getCellStyle(average) : {};

                        return (
                            <tr key={index}>
                                <td style={{ backgroundColor: 'orange' }}>
                                    {student.editing ? (
                                        <input
                                            type="text"
                                            value={student.name}
                                            onChange={(event) => handleNameChange(index, event)}
                                        />
                                    ) : (
                                        <span>{student.name}</span>
                                    )}
                                </td>
                                <td style={{ backgroundColor: '#1e90ff' }}>
                                    {student.editing ? (
                                        <input
                                            type="number"
                                            max="100"
                                            value={student.exam}
                                            onChange={(event) => handlePointsChange('exam', index, event)}
                                        />
                                    ) : (
                                        <span>{student.exam}</span>
                                    )}
                                </td>
                                <td style={{ backgroundColor: '#1e90ff' }}>
                                    {student.editing ? (
                                        <input
                                            type="number"
                                            max="100"
                                            value={student.project}
                                            onChange={(event) => handlePointsChange('project', index, event)}
                                        />
                                    ) : (
                                        <span>{student.project}</span>
                                    )}
                                </td>
                                <td style={{ backgroundColor: '#1e90ff' }}>
                                    {student.editing ? (
                                        <input
                                            type="number"
                                            max="100"
                                            value={student.tasks}
                                            onChange={(event) => handlePointsChange('tasks', index, event)}
                                        />
                                    ) : (
                                        <span>{student.tasks}</span>
                                    )}
                                        </td>
                                <td style={{ backgroundColor: '#1e90ff' }}>
                                    {student.editing ? (
                                        <input
                                            type="number"
                                            max="100"
                                            value={student.attendance}
                                            onChange={(event) => handlePointsChange('attendance', index, event)}
                                        />
                                    ) : (
                                        <span>{student.attendance}</span>
                                    )}
                                </td>
                                <td style={{ backgroundColor: student.editing ? '#1e90ff' : 'yellow' }}>{average !== null ? average : ''}</td>
                                <td style={cellStyle}>{student.hasOwnProperty('average') ? finalGrade : ''}</td>
                                <td>
                                    {student.editing ? (
                                        <>
                                            <button onClick={() => handleSaveStudent(index)}>SAVE</button>
                                            {student.hasOwnProperty('average') && (
                                                <button onClick={() => handleCancelEdit(index)}>CANCEL</button>
                                            )}
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditStudent(index)}>EDIT</button>
                                    )}
                                    <button onClick={() => handleDeleteStudent(index)}>DELETE</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;