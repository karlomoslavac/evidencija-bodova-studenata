package com.example.studentspoints.controller;

import org.springframework.web.bind.annotation.RestController;
import com.example.studentspoints.model.Student;
import com.example.studentspoints.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
            student.setName(updatedStudent.getName());
            student.setExam(updatedStudent.getExam());
            student.setProject(updatedStudent.getProject());
            student.setTasks(updatedStudent.getTasks());
            student.setAttendance(updatedStudent.getAttendance());
            return studentRepository.save(student);
        }).orElseGet(() -> {
            updatedStudent.setId(id);
            return studentRepository.save(updatedStudent);
        });
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentRepository.deleteById(id);
    }
}