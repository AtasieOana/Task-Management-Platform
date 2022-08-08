package com.project.taskmanagement_backend.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "users_boards")
public class UserBoard {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade={CascadeType.MERGE, CascadeType.PERSIST}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_board")
    private Board board;

    @ManyToOne(cascade={CascadeType.MERGE, CascadeType.PERSIST}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_user")
    private User user;

    @Column(name = "user_type")
    private String userType;

    @Column(name = "user_addition_date")
    private Date userAdditionDate;


    public UserBoard() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Board getBoard() {
        return board;
    }

    public void setBoard(Board board) {
        this.board = board;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public Date getUserAdditionDate() {
        return userAdditionDate;
    }

    public void setUserAdditionDate(Date userAdditionDate) {
        this.userAdditionDate = userAdditionDate;
    }

    @Override
    public String toString() {
        return "UserBoard{" +
                "id=" + id +
                ", board=" + board +
                ", user=" + user +
                ", userType='" + userType + '\'' +
                ", userAdditionDate=" + userAdditionDate +
                '}';
    }
}
