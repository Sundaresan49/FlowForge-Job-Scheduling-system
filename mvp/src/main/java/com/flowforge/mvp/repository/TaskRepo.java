package com.flowforge.mvp.repository;

import com.flowforge.mvp.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository <Task,Long>{
    List<Task> findByProjectId(Long id);
    List<Task> findByProjectIdAndIscompleted(Long id, boolean status);
    List<Task> findByProjectIdAndPrioriti(Long id, Task.priority priority);
    void deleteByProjectIdAndIscompleted(Long id, boolean iscompleted);
}
