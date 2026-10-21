package com.example.Server.dtos.comment;

import com.example.Server.models.Comment;

import java.time.LocalDateTime;
import java.util.UUID;

public record CommentDto(
        UUID commentId,
        String comment,
        Long mediaId,
        String mediaType,
        LocalDateTime createdAt,
        UUID userId,
        String username
) {
    public static CommentDto from (Comment comment) {
        return new CommentDto(
                comment.getCommentId(),
                comment.getComment(),
                comment.getMediaId(),
                comment.getMediaType(),
                comment.getCreatedAt(),
                comment.getUserId().getUserId(),
                comment.getUserId().getUsername()
        );
    }
}

