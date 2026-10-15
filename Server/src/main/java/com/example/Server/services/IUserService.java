package com.example.Server.services;

import com.example.Server.models.User;
import com.example.Server.requests.user.LoginUserRequest;
import com.example.Server.requests.user.LogoutUserRequest;
import com.example.Server.requests.user.RegisterUserRequest;

import java.util.UUID;

public interface IUserService {
    /* Standard operations  */
    User registerUser(RegisterUserRequest request);
    User getSpecificUser(UUID userId);
    void deleteUser(UUID userId);


    /* Login methods */
    User loginUser(LoginUserRequest request);
    String logoutUser(LogoutUserRequest request);
}
