package PLISM.Security;

import java.util.Base64;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.security.Keys;

@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    private long expiration = 86400000;

    public String SecretKeyGenerator() {
        String secretKey = Base64.getEncoder()
                .encodeToString(Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256).getEncoded());
        System.out.println("Generated Key: " + secretKey);
        return secretKey;
    }

    private String secret = SecretKeyGenerator();
    // private final String secret = new
    // String(Base64.getDecoder().decode(SecretKeyGenerator()));

    // Getters and Setters
    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public long getExpiration() {
        return expiration;
    }

    public void setExpiration(long expiration) {
        this.expiration = expiration;
    }
}
