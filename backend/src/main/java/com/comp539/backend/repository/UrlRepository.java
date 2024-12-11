package com.comp539.backend.repository;

import com.comp539.backend.model.Url;
import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface UrlRepository extends FirestoreReactiveRepository<Url> {

    Flux<Url> findByLongUrl(String longUrl);

}
