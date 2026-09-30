package com.flowforge.mvp.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.flowforge.mvp.models.User;
import com.flowforge.mvp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
@RestController
public class UserController
{
    @Autowired
    private UserService service;
    public UserController(){
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllusers(){
        return new ResponseEntity<>(service.getAllusers(), HttpStatus.OK);
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<Object> getChallenge(@PathVariable long id){
        Object ans=service.getChallenge(id);
        if(ans!=null){
        return new ResponseEntity<>(ans,HttpStatus.OK);
        }
        return new ResponseEntity<>(ans,HttpStatus.NOT_FOUND);

    }
    @PostMapping("/users")
    public ResponseEntity<String> addUser(@RequestBody User user){
           boolean ans= service.addUser(user);
    if(ans) {
        return new ResponseEntity<>("Added User Sucessfully",HttpStatus.OK);
    }
    return new ResponseEntity<>("Did not added User Sucessfully",HttpStatus.NOT_ACCEPTABLE);
    }
    @PutMapping("/users/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        boolean ans = service.updateUser(id, user);
        if (ans) {
            return new ResponseEntity<>("Updated Successfully", HttpStatus.OK);
        }
        return new ResponseEntity<>("Not Updated Successfully", HttpStatus.NOT_ACCEPTABLE);
    }
     @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id){
        boolean ans=service.deleteUser(id);
        if(ans){
            return new ResponseEntity<>("deleted Sucessfully",HttpStatus.OK);
        }
         return new ResponseEntity<>("not deleted Sucessfully",HttpStatus.NOT_FOUND);
    }
    }

