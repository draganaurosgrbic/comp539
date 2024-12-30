package com.comp539.backend.service;

import com.comp539.backend.model.User;
import com.comp539.backend.repository.UserRepository;
import com.comp539.backend.security.TokenUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenUtils tokenUtils;

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email).blockFirst();
        if (user == null || !passwordEncoder.matches(password, user.getPassword())) {
            return null;
        }
        user.setPassword(tokenUtils.generateToken(user.getEmail()));
        return user;
    }

    public User register(User user) {
        User userExisting = user.getPassword() != null ? userRepository.findByEmail(user.getEmail()).blockFirst() : null;
        if (userExisting != null) {
            return null;
        }
        if (user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        user = userRepository.save(user).block();
        user.setPassword(tokenUtils.generateToken(user.getEmail()));
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username).blockFirst();
    }
}
