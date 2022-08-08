package com.project.taskmanagement_backend.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "user_workspace")
public class UserWorkspace {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade={CascadeType.REFRESH}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_workspace")
    private Workspace workspace;

    @ManyToOne(cascade={CascadeType.REFRESH}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_user")
    private User user;

    @Column(name = "user_addition_date")
    private Date userAdditionDate;

    @Column(name = "user_type")
    private String userType;

    public UserWorkspace() {
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Workspace getWorkspace() {
        return workspace;
    }

    public void setWorkspace(Workspace workspace) {
        this.workspace = workspace;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getUserAdditionDate() {
        return userAdditionDate;
    }

    public void setUserAdditionDate(Date userAdditionDate) {
        this.userAdditionDate = userAdditionDate;
    }

    @Override
    public String toString() {
        return "UserWorkspace{" +
                "id='" + id + '\'' +
                ", workspace=" + workspace +
                ", user=" + user +
                ", userAdditionDate=" + userAdditionDate +
                ", userType='" + userType + '\'' +
                '}';
    }
}
