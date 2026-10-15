package com.example.Server.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Server.models.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class JWTService {

    private static final String ISSUER = "cinelib-api";

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JWTService(
            @Value("${jwt.secret}") String secret
    ) {
        this.algorithm = Algorithm.HMAC256(secret);

        this.verifier = JWT.require(algorithm)
                .withIssuer(ISSUER)
                .build();
    }

    public String generateToken(User user) {
        Instant now = Instant.now();

        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(user.getUserId().toString())
                .withClaim("username", user.getUsername())
                .withIssuedAt(now)
                .withExpiresAt(now.plusSeconds(3600))
                .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token) {
        return verifier.verify(token);
    }
}
