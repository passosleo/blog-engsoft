package com.engsoft.post_service.exceptions;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException() {
        super("User has no permission to perform this action");
    }

    public UnauthorizedException(String message) {
        super(message);
    }
}
