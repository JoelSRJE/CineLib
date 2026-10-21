package com.example.Server.repositories;

import com.example.Server.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {

    List<Comment> findByMediaIdAndMediaType(Long mediaId, String mediaType);
}
