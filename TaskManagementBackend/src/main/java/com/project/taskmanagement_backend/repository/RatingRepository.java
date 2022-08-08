package com.project.taskmanagement_backend.repository;

import com.project.taskmanagement_backend.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository  extends JpaRepository<Rating, Integer> {

    @Query("SELECT r from Rating as r where r.user.id = :userId and r.template.id = :templateId")
    Optional<Rating> findByUserAndTemplate(String userId, String templateId);

    @Query("SELECT AVG(r.ratingValue) from Rating as r where r.template.id = :templateId")
    Float findTemplateAverage(String templateId);

}
