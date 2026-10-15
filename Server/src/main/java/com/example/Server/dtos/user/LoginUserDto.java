package com.example.Server.dtos.user;

import com.example.Server.models.AccountType;
import com.example.Server.models.User;

import java.util.UUID;

public record LoginUserDto(
        UUID userId,
        String username,
        String email,
        AccountType accountType,
        boolean isOnline

) {
    public static LoginUserDto from (User user) {
        return new LoginUserDto(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getAccountType(),
                user.isOnline()
        );
    }
}
