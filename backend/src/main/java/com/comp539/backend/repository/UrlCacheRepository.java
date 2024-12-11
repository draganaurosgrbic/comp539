package com.comp539.backend.repository;

import com.comp539.backend.model.UrlCache;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UrlCacheRepository extends CrudRepository<UrlCache, String> {

    Optional<UrlCache> findByLongUrl(String longUrl);

}
