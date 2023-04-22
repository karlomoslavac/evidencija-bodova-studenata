package com.example.studentspoints.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private int exam;
    private int project;
    private int tasks;
    private int attendance;

    public Student() {
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getExam() {
        return exam;
    }

    public int getProject() {
        return project;
    }

    public int getTasks() {
        return tasks;
    }

    public int getAttendance() {
        return attendance;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExam(int exam) {
        this.exam = exam;
    }

    public void setProject(int project) {
        this.project = project;
    }

    public void setTasks(int tasks) {
        this.tasks = tasks;
    }

    public void setAttendance(int attendance) {
        this.attendance = attendance;
    }
}