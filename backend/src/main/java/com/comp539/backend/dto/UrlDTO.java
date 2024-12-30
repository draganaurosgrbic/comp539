package com.comp539.backend.dto;

import com.comp539.backend.model.UrlData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UrlDTO {

    private String shortUrl;
    private String longUrl;
    private Date createdAt;
    private Date expireAt;
    private Integer clickCount;
    private String userAgent;
    private String ipAddress;
    private String geoLocation;

    public UrlDTO(UrlData urlData) {
        this.shortUrl = urlData.getId();
        this.longUrl = urlData.getLongUrl();
        this.createdAt = urlData.getCreatedAt();
        this.expireAt = urlData.getExpireAt();
        this.clickCount = urlData.getClickCount();
        this.userAgent = urlData.getUserAgent();
        this.ipAddress = urlData.getIpAddress();
        this.geoLocation = urlData.getGeoLocation();
    }

}
