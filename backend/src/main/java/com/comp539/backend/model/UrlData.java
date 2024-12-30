package com.comp539.backend.model;

import java.util.Date;

public interface UrlData {

    String getId();
    String getLongUrl();
    Date getCreatedAt();
    Date getExpireAt();
    Integer getClickCount();
    String getUserAgent();
    String getIpAddress();
    String getGeoLocation();

    void setId(String id);
    void setLongUrl(String longUrl);
    void setCreatedAt(Date createdAt);
    void setExpireAt(Date expireAt);
    void setClickCount(Integer clickCount);
    void setUserAgent(String userAgent);
    void setIpAddress(String ipAddress);
    void setGeoLocation(String geoLocation);

}
