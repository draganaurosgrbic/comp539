package com.comp539.backend.service;

import com.comp539.backend.model.UrlCache;
import com.comp539.backend.model.UrlData;
import com.comp539.backend.model.Url;
import com.comp539.backend.repository.UrlRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UrlStorageService {

    private final UrlRepository urlDatabaseRepository;
    private final UrlCacheService urlCacheService;

    public Url store(Url url) {
        urlCacheService.store(new UrlCache(url));
        return urlDatabaseRepository.save(url).block();
    }

    public UrlData fetch(String shortUrl) {
        UrlData url = urlCacheService.fetch(shortUrl);
        url = url != null ? url : urlDatabaseRepository.findById(shortUrl).block();
        if (url == null) {
            return url;
        }
        url.setClickCount(url.getClickCount() + 1);
        store(url instanceof Url ? (Url) url : new Url((UrlCache) url));
        return url;
    }

    public UrlData fetchByLongUrl(String longUrl) {
        UrlData url = urlCacheService.fetchByLongUrl(longUrl);
        return url != null ? url : urlDatabaseRepository.findByLongUrl(longUrl).blockFirst();
    }

}
