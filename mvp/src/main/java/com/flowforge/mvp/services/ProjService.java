package com.flowforge.mvp.services;

import com.flowforge.mvp.models.Projects;
import com.flowforge.mvp.models.User;
import com.flowforge.mvp.repository.ProjRepo;
import com.flowforge.mvp.repository.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ProjService {
    @Autowired
    ProjRepo repo;
    @Autowired
    Repo userepo;
    public List<Projects> getAllproj() {
        return repo.findAll();
    }

    public List<Projects> getProjectsByUser(Long id) {
        return repo.findProjectsCreatedByUser(id);
    }

    public boolean addProj(Projects projects,Long id) {
        if(projects!=null && id!=null){
            User user_id=userepo.findById(id).orElse(null);
            projects.setCreated_by(user_id);
            repo.save(projects);
            return true;
        }
        return false;
    }

    public Projects getProj(Long id) {
        return repo.getById(id);
    }

    public boolean delProj(Long id) {
        if(id!=null){
            repo.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean updateProj(Projects proj, Long id) {
        if (proj != null && id != null) {
            proj.setId(id); // Attaches path variable ID directly to entity
            repo.save(proj);
            return true;
        }
        return false;
    }
}
