package com.comp539.backend.service;

import com.comp539.backend.model.UrlCache;
import com.comp539.backend.repository.UrlCacheRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UrlCacheService {

    private final UrlCacheRepository urlCacheRepository;

    public UrlCache store(UrlCache url) {
        return urlCacheRepository.save(url);
    }

    public UrlCache fetch(String shortUrl) {
        return urlCacheRepository.findById(shortUrl).orElse(null);
    }

    public UrlCache fetchByLongUrl(String longUrl) {
        return urlCacheRepository.findByLongUrl(longUrl).orElse(null);
    }

}
