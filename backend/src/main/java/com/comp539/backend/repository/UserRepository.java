package com.comp539.backend.repository;

import com.comp539.backend.model.User;
import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface UserRepository extends FirestoreReactiveRepository<User> {

    Flux<User> findByEmail(String email);

}
