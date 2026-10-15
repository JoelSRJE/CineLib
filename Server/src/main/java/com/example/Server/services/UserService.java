package com.example.Server.services;

import com.example.Server.models.User;
import com.example.Server.repositories.UserRepository;
import com.example.Server.requests.user.LoginUserRequest;
import com.example.Server.requests.user.LogoutUserRequest;
import com.example.Server.requests.user.RegisterUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterUserRequest request) {
        if (request.username() == null || request.username().isBlank()) {
            throw new IllegalArgumentException("Username is null or empty");
        }

        if (request.email() == null || request.email().isBlank()) {
            throw new IllegalArgumentException("Email is null or empty");
        }

        if (request.password() == null || request.password().isBlank()) {
            throw new IllegalArgumentException("Password is null or empty");
        }

        String hashedPassword = passwordEncoder.encode(request.password());

        User user = new User(request.username(), request.email(), hashedPassword);

        return userRepository.save(user);
    }

    @Override
    public User getSpecificUser(UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));
    }

    @Override
    public void deleteUser(UUID userId) {
        User user = getSpecificUser(userId);

        userRepository.delete(user);
    }

    @Override
    public User loginUser(LoginUserRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new IllegalArgumentException("User not found"));

        boolean correctPassword = passwordEncoder.matches(
                request.password(),
                user.getHashedPassword()
        );

        if (!correctPassword) {
            throw new  IllegalArgumentException("Wrong password");
        }

        updateUserLoginStatus(user.getUserId(), true);

        return user;
    }


    @Override
    public String logoutUser(LogoutUserRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("User not found!"));

        updateUserLoginStatus(user.getUserId(), false);

        return "User: " + user.getUsername() + " logged out successfully!";
    }

    private void updateUserLoginStatus(UUID userId, boolean isOnline) {
        User user = getSpecificUser(userId);

        user.setOnline(isOnline);

        userRepository.save(user);
    }
}
