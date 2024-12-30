package com.comp539.backend.model;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.spring.data.firestore.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Document(collectionName = "url")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Url implements UrlData {

    @DocumentId
    private String id;

    private String longUrl;
    private Date createdAt;
    private Date expireAt;
    private Integer clickCount;
    private String userAgent;
    private String ipAddress;
    private String geoLocation;

    public Url(UrlCache urlCache) {
        this.id = urlCache.getId();
        this.longUrl = urlCache.getLongUrl();
        this.createdAt = urlCache.getCreatedAt();
        this.expireAt = urlCache.getExpireAt();
        this.clickCount = urlCache.getClickCount();
        this.userAgent = urlCache.getUserAgent();
        this.ipAddress = urlCache.getIpAddress();
        this.geoLocation = urlCache.getGeoLocation();
    }

}
