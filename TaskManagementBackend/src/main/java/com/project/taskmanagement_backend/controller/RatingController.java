package com.project.taskmanagement_backend.controller;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.Rating;
import com.project.taskmanagement_backend.service.RatingService;
import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/rating")
public class RatingController {

    private final RatingService ratingService;

    @Autowired
    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }


    @PostMapping("/giveRating")
    public Rating giveRating(@Valid @RequestBody Rating rating){
        return ratingService.giveRating(rating);
    }

    @GetMapping("/getRatingByUserAndTemplate/{userId}/{templateId}")
    public Rating getRatingByUserAndTemplate(@PathVariable String userId, @PathVariable String templateId){
        return ratingService.getRatingByUserAndTemplate(userId, templateId);
    }

    @GetMapping("/getRatingAverageForTemplate/{templateId}")
    public Float getRatingAverageForTemplate(@PathVariable String templateId){
        return ratingService.getRatingAverageForTemplate(templateId);
    }

    @GetMapping("/getRatingsForTemplates/{userId}")
    public List<Pair<Board, Float>> getRatingsForTemplates(@PathVariable String userId){
        return ratingService.getRatingsForTemplates(userId);
    }
}
