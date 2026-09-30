package com.flowforge.mvp.services;

import com.flowforge.mvp.models.User;
import com.flowforge.mvp.repository.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    Repo repo;
    public UserService(){}
    public List<User> getAllusers(){
        return repo.findAll();
    }
    public Object getChallenge(long id){

        return repo.findById(id).orElse(null);
    }
    public boolean addUser(User user){
        if(user!=null){
        repo.save(user);
        return true;
        }
        return false;
    }
    public boolean updateUser(Long id, User user) {
        if (user != null && id != null) {
            user.setId(id);
            repo.save(user);
            return true;
        }
        return false;
    }
    public boolean deleteUser( Long id){
        if(id!=null){
        repo.deleteById(id);
        return true;
    }
    return false;}
}



