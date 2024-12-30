package com.comp539.backend.controller;

import com.comp539.backend.dto.UrlDTO;
import com.comp539.backend.model.UrlData;
import com.comp539.backend.service.UrlStorageService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class RedirectionController {

    private final UrlStorageService urlStorageService;

    @GetMapping("{shortUrl}")
    public ResponseEntity<UrlDTO> getUrl(@PathVariable String shortUrl) {
        UrlData url = urlStorageService.fetch(shortUrl);
        return url != null ? ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create(url.getLongUrl()))
                .build() : ResponseEntity.notFound().build();
    }

}
