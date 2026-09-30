package com.flowforge.mvp.services;

import com.flowforge.mvp.models.Projects;
import com.flowforge.mvp.models.Task;
import com.flowforge.mvp.repository.ProjRepo;
import com.flowforge.mvp.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
public class TaskService {
    @Autowired
    private TaskRepo repo;
    @Autowired
    private ProjRepo taskr;
    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public List<Task> getTasksByProject(Long id) {
        return repo.findByProjectId(id);
    }

    public List<Task> getCompletedTasks(Long id, boolean status) {
        return repo.findByProjectIdAndIscompleted(id,status);
    }

    public List<Task> getTasksByPriority(Long id, Task.priority priority) {
        return repo.findByProjectIdAndPrioriti(id,priority);
    }

    public Task getTask(Long id) {
            Task ans=repo.findById(id).orElse(null);
            return ans;
    }

    public boolean createTask(Task task,Long id) {
        if(task!=null && id!=null){
            Projects proj_id = taskr.findById(id).orElse(null);
            task.setProject(proj_id);
            repo.save(task);
            return true;
        }
        return false;
    }

    public boolean updateTask(Task task, Long id) {
        if (task != null && id != null) {
            task.setId(id);
            repo.save(task);
            return true;
        }
        return false;
    }

    public boolean delTask(Long id) {
        if(id!=null){
        repo.deleteById(id);
        return true;
        }
        return false;
    }

    public Task toggleTask(Long id) {
        Task task=repo.findById(id).orElse(null);
        if(task!=null){
            task.setIscompleted(!task.isIscompleted());
            repo.save(task);
        }
        return task;
    }

    @Transactional
    public boolean deleteCompletedTasks(Long id) {
        if(id!=null){
            repo.deleteByProjectIdAndIscompleted(id,true);
            return true;
        }
        return false;
    }
}
