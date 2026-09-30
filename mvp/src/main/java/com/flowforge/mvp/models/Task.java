package com.flowforge.mvp.models;

import jakarta.persistence.*;
import com.flowforge.mvp.models.Projects;
import java.time.LocalDateTime;
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    public enum priority{
        LOW,
        MEDIUM,
        HIGH
    }
    private priority prioriti;
    private LocalDateTime datetime;
    private boolean iscompleted;
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Projects project;

    public Task() {
    }

    public Projects getProject() {
        return project;
    }

    public void setProject(Projects project) {
        this.project = project;
    }

    public Task(String title, String description, priority prioriti, LocalDateTime datetime, boolean iscompleted, Projects project) {
        this.title = title;
        this.description = description;
        this.prioriti = prioriti;
        this.datetime = datetime;
        this.iscompleted = iscompleted;
        this.project=project;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public priority getPrioriti() {
        return prioriti;
    }

    public void setPrioriti(priority prioriti) {
        this.prioriti = prioriti;
    }

    public LocalDateTime getDatetime() {
        return datetime;
    }

    public void setDatetime(LocalDateTime datetime) {
        this.datetime = datetime;
    }

    public boolean isIscompleted() {
        return iscompleted;
    }

    public void setIscompleted(boolean iscompleted) {
        this.iscompleted = iscompleted;
    }
}
