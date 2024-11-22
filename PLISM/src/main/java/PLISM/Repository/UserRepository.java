package PLISM.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
