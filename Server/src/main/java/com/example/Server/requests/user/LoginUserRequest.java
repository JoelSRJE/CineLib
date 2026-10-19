package com.example.Server.requests.user;


public record LoginUserRequest(
        String email,
        String password
) {
}
