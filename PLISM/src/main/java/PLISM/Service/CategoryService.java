package PLISM.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import PLISM.Entity.Category;
import PLISM.Repository.CategoryRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get category by ID
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // Save a new or existing category
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Delete category by ID
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
