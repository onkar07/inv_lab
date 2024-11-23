package PLISM.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
