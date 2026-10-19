package com.example.Server.dtos.user;

import com.example.Server.models.User;

public record UpdatedUserDto(
        String username,
        String email
) {
    public static UpdatedUserDto from(User user) {
        return new UpdatedUserDto(
                user.getUsername(),
                user.getEmail()
        );
    }
}
