package com.flowforge.mvp.controllers;

import com.flowforge.mvp.models.Projects;
import java.util.List;
import com.flowforge.mvp.models.Projects;
import com.flowforge.mvp.services.ProjService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
public class ProjectController {

    @Autowired
    public ProjService service;
    @GetMapping("/projects")
    public List<Projects> getAllProj(){
        return service.getAllproj();
    }
    @GetMapping("/users/{id}/projects")
    public List<Projects> getProjectsByUser(@PathVariable Long id){
        return service.getProjectsByUser(id);
    }
    @PostMapping("/users/{id}/projects")
    public String CreateProj(@PathVariable Long id,@RequestBody Projects projects){
        boolean isadded=service.addProj(projects,id);
        if(isadded){
            return "Added Sucessfully";
        }
        return "Not Added Sucessfully";
    }
    @GetMapping("/projects/{id}")
    public Projects getProj(@PathVariable Long id){
        return service.getProj(id);
    }
    @PutMapping("/projects/{id}")
    public ResponseEntity<String> updateProject(@PathVariable Long id, @RequestBody Projects proj) {
        boolean update = service.updateProj(proj, id);
        if (update) {
            return new ResponseEntity<>("Updated Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Updated Successfully", HttpStatus.NOT_ACCEPTABLE);
    }
    @DeleteMapping("/projects/{id}")
    public ResponseEntity<String> delProj(@PathVariable Long id){
        boolean ans=service.delProj(id);
        if(ans){
            return new ResponseEntity<>("Deleted Sucessfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Deleted Sucessfully",HttpStatus.NOT_ACCEPTABLE);
    }
}

