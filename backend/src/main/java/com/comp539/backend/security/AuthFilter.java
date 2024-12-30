package com.comp539.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@AllArgsConstructor
public class AuthFilter extends OncePerRequestFilter {

    private static final String AUTH_HEADER = "Authorization";

    private final UserDetailsService userService;
    private final TokenUtils tokenUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader(AUTH_HEADER);
        if (token != null && !token.trim().isEmpty()) {
            UserDetails user = userService.loadUserByUsername(tokenUtils.getEmail(token));
            if (user != null && tokenUtils.validateToken(user, token)) {
                AuthToken authToken = new AuthToken(user, token);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}
