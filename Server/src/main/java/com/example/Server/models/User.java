package com.example.Server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID userId;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String hashedPassword;

    @Column(nullable = false)
    private AccountType accountType;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "userId")
    private List<Comment> comments = new ArrayList<>();

    @Column(nullable = false)
    private boolean isOnline;

    protected User() {}

    public User(String username, String email, String hashedPassword) {
        this.username = username;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.accountType = AccountType.USER;
        this.createdAt = LocalDateTime.now();
        this.isOnline = false;
    }

    @Override
    public String toString() {
        return "| User | ID: " + userId +
                " | Username: " + username +
                " | Email: " + email +
                " | AccountType: " + accountType +
                " | Created: " + createdAt +
                " | Online: " + isOnline + " |";
    }

}
