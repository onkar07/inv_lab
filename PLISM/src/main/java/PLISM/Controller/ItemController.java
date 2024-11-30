package PLISM.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import PLISM.Entity.Item;
import PLISM.Entity.Category; // Import Category entity
import PLISM.Service.ItemService;
import PLISM.Service.CategoryService; // Import CategoryService

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private CategoryService categoryService; // Inject CategoryService

    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        item.setDate(new Date()); // Set the current date when creating the item

        // Fetch the category based on the category ID provided in the request
        Category category = categoryService.getCategoryById(item.getCategory().getId()).orElse(null);

        if (category != null) {
            item.setCategory(category); // Set the category to the item
            return ResponseEntity.ok(itemService.saveItem(item));
        }
        return ResponseEntity.badRequest().body(null); // Return bad request if category not found
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item updatedItem) {
        Optional<Item> item = itemService.getItemById(id);
        if (item.isPresent()) {
            Item existingItem = item.get();
            existingItem.setName(updatedItem.getName());
            existingItem.setQuantity(updatedItem.getQuantity());
            existingItem.setStatus(updatedItem.isStatus());
            existingItem.setDate(updatedItem.getDate()); // Update date if needed

            // Fetch the category based on the ID from the request
            Category category = categoryService.getCategoryById(updatedItem.getCategory().getId()).orElse(null);
            if (category != null) {
                existingItem.setCategory(category); // Set the category
            } else {
                return ResponseEntity.badRequest().body(null); // Return bad request if category not found
            }

            return ResponseEntity.ok(itemService.saveItem(existingItem));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        Optional<Item> item = itemService.getItemById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Updated Endpoint for fetching items by category
    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<List<Item>> getItemsByCategory(@PathVariable Long categoryId) {
        List<Item> items = itemService.getItemsByCategoryId(categoryId);
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build(); // Return 204 if no items found
        }
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
