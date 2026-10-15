package com.example.Server.dtos.user;

public record LoginUserResponseDto(
        LoginUserDto user,
        String token
) {
}
