package com.example.Server.controllers;

import com.example.Server.dtos.comment.CommentDto;
import com.example.Server.models.Comment;
import com.example.Server.requests.comment.CreateCommentRequest;
import com.example.Server.requests.comment.UpdateCommentRequest;
import com.example.Server.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<CommentDto> createComment(
            @RequestBody CreateCommentRequest request
            ) {
            Comment newComment = commentService.createComment(request);

            return ResponseEntity.status(HttpStatus.CREATED).body(CommentDto.from(newComment));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CommentDto>> getAllComments() {
        List<CommentDto> commentDtos = commentService.getComments();

        return ResponseEntity.ok(commentDtos);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDto> updateComment(
            @PathVariable UUID commentId,
            @RequestBody UpdateCommentRequest request) {

        Comment updatedComment = commentService.updateComment(request, commentId);

        CommentDto commentDto = CommentDto.from(updatedComment);

        return ResponseEntity.ok(commentDto);
    }

    @DeleteMapping("/{commentId}/{userId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable UUID userId,
            @PathVariable UUID commentId) {

        commentService.deleteComment(commentId, userId);

        return ResponseEntity.noContent().build();
    }
}
