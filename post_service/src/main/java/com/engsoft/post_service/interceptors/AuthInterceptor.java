package com.engsoft.post_service.interceptors;

import com.engsoft.post_service.annotations.Authenticated;
import com.engsoft.post_service.dtos.auth.AccountDTO;
import com.engsoft.post_service.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private AuthService authService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        if (handler instanceof HandlerMethod handlerMethod) {
            Authenticated authenticatedAnnotation = handlerMethod.getMethodAnnotation(Authenticated.class);
            if (authenticatedAnnotation != null) {
                String authHeader = request.getHeader("Authorization");

                if (!isAuthorizationHeaderValid(authHeader) && authenticatedAnnotation.required()) {
                    writeResponse(response);
                    return false;
                }

                if (isAuthorizationHeaderValid(authHeader)) {
                    String authToken = authHeader.split(" ")[1];
                    AccountDTO userAccount = authService.validateToken(authToken);

                    if (userAccount == null && authenticatedAnnotation.required()) {
                        writeResponse(response);
                        return false;
                    }

                    request.setAttribute("userAccount", userAccount);
                }
            }
        }

        return true;
    }

    private boolean isAuthorizationHeaderValid(String token) {
        return token != null && token.startsWith("Bearer ");
    }

    private void writeResponse(HttpServletResponse response) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.sendError(HttpStatus.UNAUTHORIZED.value());
    }
}
