package com.example.Server.controllers;

import com.example.Server.dtos.user.GetSpecificUserDto;
import com.example.Server.dtos.user.LoginUserDto;
import com.example.Server.dtos.user.LoginUserResponseDto;
import com.example.Server.dtos.user.RegisteredUserDto;
import com.example.Server.models.User;
import com.example.Server.requests.user.LoginUserRequest;
import com.example.Server.requests.user.LogoutUserRequest;
import com.example.Server.requests.user.RegisterUserRequest;
import com.example.Server.services.UserService;
import com.example.Server.utils.JWTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JWTService jwtService;

    @PostMapping()
    public ResponseEntity<RegisteredUserDto> registerUser(
            @RequestBody RegisterUserRequest request
            ) {
        User registeredUser = userService.registerUser(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(RegisteredUserDto.from(registeredUser));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<GetSpecificUserDto> getSpecificUser(
            @PathVariable UUID userId
    ) {
        User foundUser = userService.getSpecificUser(userId);

        return ResponseEntity.ok(GetSpecificUserDto.from(foundUser));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(
            @PathVariable UUID userId
    ) {
        userService.deleteUser(userId);

        return ResponseEntity.ok().body("User with id: " + userId + " was deleted!");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDto> loginUser(
            @RequestBody LoginUserRequest request
    ) {
        User loginUser = userService.loginUser(request);

        String token = jwtService.generateToken(loginUser);

        LoginUserDto userDto = LoginUserDto.from(loginUser);

        LoginUserResponseDto response = new LoginUserResponseDto(
                userDto, token
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(
            @RequestBody LogoutUserRequest request
            ) {
        String message = userService.logoutUser(request);

        return ResponseEntity.ok(message);
    }


}
