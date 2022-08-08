package com.project.taskmanagement_backend.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rating")
public class Rating {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade={CascadeType.REFRESH}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_template")
    private Board template;

    @ManyToOne(cascade={CascadeType.REFRESH}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_user")
    private User user;

    @Column(name = "rating_value")
    private Integer ratingValue;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Board getTemplate() {
        return template;
    }

    public void setTemplate(Board template) {
        this.template = template;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getRatingValue() {
        return ratingValue;
    }

    public void setRatingValue(Integer ratingValue) {
        this.ratingValue = ratingValue;
    }

    public Rating() {
    }

    @Override
    public String toString() {
        return "Rating{" +
                "id=" + id +
                ", template=" + template +
                ", user=" + user +
                ", ratingValue=" + ratingValue +
                '}';
    }
}
