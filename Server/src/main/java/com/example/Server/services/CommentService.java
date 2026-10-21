package com.example.Server.services;

import com.example.Server.dtos.comment.CommentDto;
import com.example.Server.models.Comment;
import com.example.Server.models.User;
import com.example.Server.repositories.CommentRepository;
import com.example.Server.repositories.UserRepository;
import com.example.Server.requests.comment.CreateCommentRequest;
import com.example.Server.requests.comment.UpdateCommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    @Override
    public Comment createComment(CreateCommentRequest request) {

        if (request.comment() == null || request.comment().isBlank()) {
            throw new IllegalArgumentException("Comment cannot be null or empty");
        }

        if (request.mediaId() == null) {
            throw new IllegalArgumentException("MediaId cannot be null or empty");
        }

        if (request.mediaType() == null || request.mediaType().isBlank()) {
            throw new IllegalArgumentException("MediaType cannot be null or empty");
        }

        LocalDateTime today = LocalDateTime.now();

        User foundUser = userRepository.findByUserId(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment newComment = new Comment(
                request.comment(),
                request.mediaId(),
                request.mediaType(),
                today,
                foundUser
        );

        return commentRepository.save(newComment);

    }

    @Override
    public List<CommentDto> getComments() {

        List<Comment> comments = commentRepository.findAll();

        List<CommentDto> commentDtos = new ArrayList<>();

        for (Comment comment : comments) {
            CommentDto commentDto = CommentDto.from(comment);

            commentDtos.add(commentDto);
        }

        return  commentDtos;
    }

    @Override
    public Comment updateComment(UpdateCommentRequest request, UUID commentId) {
        if (request.userId() == null) {
            throw new IllegalArgumentException("User Id cannot be null or empty");
        }

        if (request.comment() == null || request.comment().isBlank()) {
            throw new IllegalArgumentException("Comment cannot be null or empty");
        }

        Comment foundComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found")
                );

        User foundUser = userRepository.findByUserId(request.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found")
                );

        if (!foundComment.getUserId().getUserId().equals(foundUser.getUserId())) {
            throw new IllegalArgumentException("User is not the owner of this comment");
        }

        foundComment.setComment(request.comment());

        return commentRepository.save(foundComment);
    }

    @Override
    public void deleteComment(UUID commentId, UUID userId) {

        Comment foundComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found")
                );

        User foundUser = userRepository.findByUserId(userId)
                .orElseThrow(()  -> new IllegalArgumentException("User not found")
                );

        if (!foundComment.getUserId().getUserId().equals(userId)) {
            throw new IllegalArgumentException("User is not the owner of this comment");
        }

        commentRepository.delete(foundComment);
    }
}
