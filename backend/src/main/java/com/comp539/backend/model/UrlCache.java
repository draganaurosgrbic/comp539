package com.comp539.backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.util.Date;


@RedisHash("url")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UrlCache implements UrlData {

    private String id;

    private String longUrl;
    private Date createdAt;
    private Date expireAt;
    private Integer clickCount;
    private String userAgent;
    private String ipAddress;
    private String geoLocation;

    public UrlCache(Url urlDatabase) {
        this.id = urlDatabase.getId();
        this.longUrl = urlDatabase.getLongUrl();
        this.createdAt = urlDatabase.getCreatedAt();
        this.expireAt = urlDatabase.getExpireAt();
        this.clickCount = urlDatabase.getClickCount();
        this.userAgent = urlDatabase.getUserAgent();
        this.ipAddress = urlDatabase.getIpAddress();
        this.geoLocation = urlDatabase.getGeoLocation();
    }

}
