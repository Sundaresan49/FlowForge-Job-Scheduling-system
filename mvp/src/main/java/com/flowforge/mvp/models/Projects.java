package com.flowforge.mvp.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;



@Entity
public class Projects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name="created_by")
    private User created_by;
    private LocalDateTime created_at;
    public enum Status{
        ONGOING,
        COMPLETED,
        ONHOLD,
        BLOCKED,
        INREVIEW
    };
    private Status status;

    public Projects() {
    }

    public Projects(String name, String description, User created_by, LocalDateTime created_at, Status status) {
        this.description = description;
        this.created_by = created_by;
        this.created_at = LocalDateTime.now();
        this.status=status;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreated_by() {
        return created_by;
    }

    public void setCreated_by(User created_by) {
        this.created_by = created_by;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }
}
