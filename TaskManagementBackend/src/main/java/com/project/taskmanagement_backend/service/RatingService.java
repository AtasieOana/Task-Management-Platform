package com.project.taskmanagement_backend.service;

import com.project.taskmanagement_backend.model.Board;
import com.project.taskmanagement_backend.model.Rating;
import com.project.taskmanagement_backend.model.User;
import com.project.taskmanagement_backend.model.UserBoard;
import com.project.taskmanagement_backend.repository.RatingRepository;
import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;

    private final UserBoardService userBoardService;

    @Autowired
    public RatingService(RatingRepository ratingRepository, UserBoardService userBoardService) {
        this.ratingRepository = ratingRepository;
        this.userBoardService = userBoardService;
    }

    public Rating giveRating(Rating rating){
        Optional<Rating> ratingOptional = ratingRepository.findByUserAndTemplate(rating.getUser().getId(), rating.getTemplate().getId());
        ratingOptional.ifPresent(value -> rating.setId(value.getId()));
        return ratingRepository.save(rating);
    }


    public Rating getRatingByUserAndTemplate(String userId, String templateId){
        Optional<Rating> ratingOptional = ratingRepository.findByUserAndTemplate(userId, templateId);
        return ratingOptional.orElse(null);
    }

    public Float getRatingAverageForTemplate(String templateId){
        return ratingRepository.findTemplateAverage(templateId);
    }

    public List<Pair<Board, Float>> getRatingsForTemplates(String userId){
        List<UserBoard> userBoards = this.userBoardService.getPublicBoards(userId);
        List<Pair<Board, Float>> boardRatings = new ArrayList<>();
        for(UserBoard userBoard:userBoards){
            UserBoard ub = this.userBoardService.checkExistenceUserInBoard(userBoard.getBoard().getId(), userId);
            if(ub == null || Objects.equals(ub.getUserType(), "viewer")){
                Float rating = this.getRatingAverageForTemplate(userBoard.getBoard().getId());
                boardRatings.add(Pair.with(userBoard.getBoard(), rating));            }
        }
        return boardRatings;
    }

}
