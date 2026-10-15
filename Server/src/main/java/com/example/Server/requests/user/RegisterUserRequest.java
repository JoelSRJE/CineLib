package com.example.Server.requests.user;

public record RegisterUserRequest(
        String username,
        String email,
        String password
) {
}
