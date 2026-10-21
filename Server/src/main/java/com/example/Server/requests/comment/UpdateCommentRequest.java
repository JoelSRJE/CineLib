package com.example.Server.requests.comment;

import java.util.UUID;

public record UpdateCommentRequest(
        UUID userId,
        String comment
) {
}
