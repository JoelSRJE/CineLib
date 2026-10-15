package com.example.Server.dtos.user;

import com.example.Server.models.AccountType;
import com.example.Server.models.User;

import java.util.UUID;

public record GetSpecificUserDto(
        UUID userId,
        String username,
        String email,
        AccountType accountType,
        boolean isOnline
) {
    public static GetSpecificUserDto from (User user) {
        return new GetSpecificUserDto(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getAccountType(),
                user.isOnline()
        );
    }
}
