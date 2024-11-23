package PLISM.Security;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    public Key SecretKeyGenerator() {
        Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        System.out.println("Generated Key: " + secretKey); // You can log the key if needed
        return secretKey;
    }

    private Key SECRET_KEY = SecretKeyGenerator(); // Call the method to get the key

    private static final long EXPIRATION_TIME = 86400000; // 1 day in milliseconds

    private final JwtProperties jwtProperties;

    public JwtUtil(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    // public String generateToken(String username) {
    // Key key = Keys.(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8));
    //
    // return Jwts.builder()
    // .setSubject(username)
    // .setIssuedAt(new Date())
    // .setExpiration(new Date(System.currentTimeMillis() +
    // jwtProperties.getExpiration()))
    // .signWith(key, SignatureAlgorithm.HS256)
    // .compact();
    // }
    public String generateToken(String username) {

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY) // Use the secure generated key
                .compact();
    }

    public String extractUsername(String token) {
        Claims claims = parseClaimsJws(token);
        return claims.getSubject();
    }

    // public boolean isTokenExpired(String token) {
    // Date expiration = extractExpirationDate(token);
    // return expiration.before(new Date());
    // }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }

    public Date extractExpirationDate(String token) {
        Claims claims = parseClaimsJws(token);
        return claims.getExpiration();
    }

    // public boolean validateToken(String token, String username) {
    // return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    // }
    public boolean validateToken(String token, String username) {
        String tokenUsername = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        return username.equals(tokenUsername) && !isTokenExpired(token);
    }

    private Claims parseClaimsJws(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY) // Use the SECRET_KEY directly
                .build();
        return jwtParser.parseClaimsJws(token).getBody();
    }
}
