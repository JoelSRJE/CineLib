package com.example.Server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID commentId;

    @Column(nullable = false)
    private String comment;

    @Column(nullable = false)
    private Long mediaId;

    @Column(nullable = false)
    private String mediaType;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;

    protected Comment() {}

    public Comment(String comment, Long mediaId, String mediaType, LocalDateTime createdAt, User userId) {
        this.comment = comment;
        this.mediaId = mediaId;
        this.mediaType = mediaType;
        this.createdAt = createdAt;
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "| Comment | Comment ID: " + commentId +
                " | Comment: " + comment +
                " | Media ID: " + mediaId +
                " | Type: " + mediaType +
                " | Created: " + createdAt +
                " | Owner ID: " + userId + " |";
    }
}
