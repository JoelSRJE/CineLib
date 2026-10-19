package com.example.Server.requests.user;


public record UpdateUserRequest(
        String username,
        String email
) {
}
