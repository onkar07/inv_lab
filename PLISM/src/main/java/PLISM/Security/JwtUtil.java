package PLISM.Security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expirationTime;

    // Generate JWT token
    public String generateToken(String username) {
        // Create the key from the secret
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)); // Create SecretKey for HS256

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256) // Sign with the generated key
                .compact();
    }

    // Extract username from the token
    public String extractUsername(String token) {
        Claims claims = parseClaimsJws(token);
        return claims.getSubject();
    }

    // Check if the token is expired
    public boolean isTokenExpired(String token) {
        Date expiration = extractExpirationDate(token);
        return expiration.before(new Date());
    }

    // Extract expiration date from the token
    public Date extractExpirationDate(String token) {
        Claims claims = parseClaimsJws(token);
        return claims.getExpiration();
    }

    // Validate the token
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }

    // Parse the JWT token to extract claims
    private Claims parseClaimsJws(String token) {
        JwtParser jwtParser = Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8)) // Use byte[] for the secret key
                .build();
        return jwtParser.parseClaimsJws(token).getBody();
    }
}
