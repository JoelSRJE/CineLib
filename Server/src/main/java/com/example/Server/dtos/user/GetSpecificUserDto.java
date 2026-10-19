package com.example.Server.dtos.user;

import com.example.Server.models.AccountType;
import com.example.Server.models.User;

import java.time.LocalDateTime;
import java.util.UUID;

public record GetSpecificUserDto(
        UUID userId,
        String username,
        String email,
        AccountType accountType,
        LocalDateTime createdAt,
        boolean isOnline
) {
    public static GetSpecificUserDto from (User user) {
        return new GetSpecificUserDto(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getAccountType(),
                user.getCreatedAt(),
                user.isOnline()
        );
    }
}
