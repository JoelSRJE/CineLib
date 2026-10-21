package com.example.Server.requests.comment;


import java.util.UUID;

public record CreateCommentRequest(
        String comment,
        Long mediaId,
        String mediaType,
        UUID userId
) {
}
