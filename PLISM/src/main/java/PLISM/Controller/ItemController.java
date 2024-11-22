package PLISM.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import PLISM.Entity.Item;
import PLISM.Service.ItemService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public Optional<Item> getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.saveItem(item);
    }

    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return "Item deleted successfully!";
    }
}
