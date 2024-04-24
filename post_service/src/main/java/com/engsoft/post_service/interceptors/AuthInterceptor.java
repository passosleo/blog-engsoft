package com.engsoft.post_service.interceptors;

import com.engsoft.post_service.annotations.Authenticated;
import com.engsoft.post_service.dtos.auth.AccountDTO;
import com.engsoft.post_service.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
public class AuthInterceptor implements HandlerInterceptor {

    @Autowired
    private AuthService authService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

        if (handler instanceof HandlerMethod handlerMethod) {
            Authenticated authenticatedAnnotation = handlerMethod.getMethodAnnotation(Authenticated.class);
            if (authenticatedAnnotation != null && authenticatedAnnotation.required()) {
                String token = request.getHeader("Authorization");
                log.info("token: {}", token);
                if (token == null || !token.startsWith("Bearer ")) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }

                String authToken = token.split(" ")[1];
                AccountDTO userAccount = authService.validateToken(authToken);
                log.info("User account: {}", userAccount);
                if (userAccount == null) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    return false;
                }

                request.setAttribute("userAccount", userAccount);
            }
        }

        return true;
    }
}
