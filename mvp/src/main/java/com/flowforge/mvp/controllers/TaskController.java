package com.flowforge.mvp.controllers;

import com.flowforge.mvp.models.Task;
import com.flowforge.mvp.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TaskController {
    @Autowired
    private TaskService service;
    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTasks(){
        return new ResponseEntity<>(service.getAllTasks(), HttpStatus.OK);
    }
    @GetMapping("/projects/{id}/tasks")
    public ResponseEntity<List<Task>> getTasksByProject(@PathVariable Long id){
        return new ResponseEntity<>(service.getTasksByProject(id),HttpStatus.OK);
    }
    @GetMapping("/projects/{id}/tasks/completed")
    public ResponseEntity<List<Task>> getCompletedTasks(@PathVariable Long id,@RequestParam boolean status){
        return new ResponseEntity<>(service.getCompletedTasks(id,status),HttpStatus.OK);
    }
    @GetMapping("/projects/{id}/tasks/priority/{priority}")
    public ResponseEntity<List<Task>> getTasksByPriority(@PathVariable Long id,@PathVariable Task.priority priority){
        return new ResponseEntity<>(service.getTasksByPriority(id,priority),HttpStatus.OK);
    }
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id){
        return new ResponseEntity<>(service.getTask(id),HttpStatus.OK);
    }
    @PostMapping("/projects/{id}/tasks/")
    public ResponseEntity<String> createTask(@PathVariable Long id ,@RequestBody Task task ){
        boolean ans=service.createTask(task,id);
        if(ans){
            return new ResponseEntity<>("Sucessfully Posted",HttpStatus.OK);
        }
        return new ResponseEntity<>("Task Not Created",HttpStatus.NOT_FOUND);
    }
    @PostMapping("/projects/{id}/tasks")
    public ResponseEntity<String> createTaskWithoutTrailingSlash(@PathVariable Long id ,@RequestBody Task task ){
        boolean ans=service.createTask(task,id);
        if(ans){
            return new ResponseEntity<>("Sucessfully Posted",HttpStatus.OK);
        }
        return new ResponseEntity<>("Task Not Created",HttpStatus.NOT_FOUND);
    }
    @PutMapping("/tasks/{id}")
    public ResponseEntity<String> updateTask(@PathVariable Long id, @RequestBody Task task) {
        boolean ans = service.updateTask(task, id);
        if (ans) {
            return new ResponseEntity<>("Updated Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Updated", HttpStatus.NOT_ACCEPTABLE);
    }
    @PatchMapping("/tasks/{id}/toggle")
    public ResponseEntity<Task> toggleTask(@PathVariable Long id){
        Task task=service.toggleTask(id);
        if(task!=null){
            return new ResponseEntity<>(task,HttpStatus.OK);
        }
        return new ResponseEntity<>(task,HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/projects/{id}/tasks/completed")
    public ResponseEntity<String> deleteCompletedTasks(@PathVariable Long id){
        boolean ans=service.deleteCompletedTasks(id);
        if(ans){
            return new ResponseEntity<>("Completed Tasks Deleted Sucessfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("Completed Tasks Not Deleted",HttpStatus.NOT_ACCEPTABLE);
    }
    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<String> delTask(@PathVariable Long id){
        boolean ans=service.delTask(id);
        if(ans){
            return new ResponseEntity<>("Deleted Sucessfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Deleted",HttpStatus.NOT_ACCEPTABLE);
    }
}
