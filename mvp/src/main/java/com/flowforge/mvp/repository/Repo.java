package com.flowforge.mvp.repository;

import com.flowforge.mvp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repo extends JpaRepository<User,Long> {
}
