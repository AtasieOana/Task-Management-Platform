package com.project.taskmanagement_backend.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Entity
@Table(name = "user_message")
public class UserMessage  implements Comparable<UserMessage>{

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id")
    private String id;

    @ManyToOne(cascade={CascadeType.MERGE, CascadeType.PERSIST}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_message")
    private ChatMessage chatMessage;

    @ManyToOne(cascade={CascadeType.MERGE, CascadeType.PERSIST}, fetch=FetchType.EAGER)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name ="id_user")
    private User user;

    @Column(name = "seen")
    private Boolean seen;

    public UserMessage() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ChatMessage getChatMessage() {
        return chatMessage;
    }

    public void setChatMessage(ChatMessage chatMessage) {
        this.chatMessage = chatMessage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Boolean getSeen() {
        return seen;
    }

    public void setSeen(Boolean seen) {
        this.seen = seen;
    }

    @Override
    public int compareTo(UserMessage u) {
        Date sendDate1 = chatMessage.getSendDate();
        Date sendDate2 = u.getChatMessage().getSendDate();
        Calendar calendar1 = dateToCalendar(sendDate1);
        Calendar calendar2 = dateToCalendar(sendDate2);
        if(calendar1.get(Calendar.YEAR) < calendar2.get(Calendar.YEAR))
            return -1;
        else{
            if(calendar1.get(Calendar.YEAR) > calendar2.get(Calendar.YEAR)){
                return 1;
            }
            else{
                if(calendar1.get(Calendar.MONTH) > calendar2.get(Calendar.MONTH)){
                    return 1;
                }
                else{
                    if(calendar1.get(Calendar.MONTH) < calendar2.get(Calendar.MONTH)){
                        return -1;
                    }
                    else{
                        return calendar1.get(Calendar.DAY_OF_MONTH) - calendar2.get(Calendar.DAY_OF_MONTH);
                    }
                }
            }
        }
    }

    private Calendar dateToCalendar(Date date){
        Calendar calendar = new GregorianCalendar();
        calendar.setTime(date);
        return calendar;
    }

    @Override
    public String toString() {
        return "UserMessage{" +
                "id='" + id + '\'' +
                ", chatMessage=" + chatMessage +
                ", user=" + user +
                ", seen=" + seen +
                '}';
    }
}
