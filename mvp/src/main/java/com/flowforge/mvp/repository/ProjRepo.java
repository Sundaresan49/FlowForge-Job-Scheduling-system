package com.flowforge.mvp.repository;

import com.flowforge.mvp.models.Projects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProjRepo extends JpaRepository<Projects,Long> {
    @Query("SELECT p FROM Projects p WHERE p.created_by.id = :id")
    List<Projects> findProjectsCreatedByUser(@Param("id") Long id);
}
