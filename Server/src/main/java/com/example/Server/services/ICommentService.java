package com.example.Server.services;

import com.example.Server.dtos.comment.CommentDto;
import com.example.Server.models.Comment;
import com.example.Server.requests.comment.CreateCommentRequest;
import com.example.Server.requests.comment.UpdateCommentRequest;

import java.util.List;
import java.util.UUID;

public interface ICommentService {
    /* CRUD */
    Comment createComment(CreateCommentRequest request);
    List<CommentDto> getComments();
    Comment updateComment(UpdateCommentRequest request, UUID commentId);
    void deleteComment(UUID commentId, UUID userId);
}
