package com.example.Server.dtos.user;

import com.example.Server.models.AccountType;
import com.example.Server.models.User;

import java.time.LocalDateTime;
import java.util.UUID;

public record RegisteredUserDto(
        UUID userId,
        String username,
        String email,
        String hashedPassword,
        AccountType accountType,
        LocalDateTime createdAt,
        boolean isOnline
) {
    public static RegisteredUserDto from(User user) {
        return new RegisteredUserDto(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getHashedPassword(),
                user.getAccountType(),
                user.getCreatedAt(),
                user.isOnline()
        );
    }
}
