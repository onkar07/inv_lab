package PLISM.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCategoryId(Long categoryId);
}