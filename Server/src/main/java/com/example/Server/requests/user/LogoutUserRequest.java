package com.example.Server.requests.user;

import java.util.UUID;

public record LogoutUserRequest(
        UUID userId
) {
}
