package PLISM.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import PLISM.Entity.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
