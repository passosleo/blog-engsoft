package com.engsoft.post_service.utils.auth;

import com.engsoft.post_service.dtos.auth.AccountDTO;
import jakarta.servlet.http.HttpServletRequest;

public class Session {
    public static AccountDTO getUserAccount(HttpServletRequest request) {
        return (AccountDTO) request.getAttribute("userAccount");
    }
}
