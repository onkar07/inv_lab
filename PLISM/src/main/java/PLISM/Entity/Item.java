package PLISM.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Item name is required")
    @Column(nullable = false)
    private String name;

    @NotNull(message = "Category must not be null")
    @ManyToOne(fetch = FetchType.EAGER, optional = false) // `optional = false` ensures non-null constraint
    @JoinColumn(name = "category_id", nullable = false, foreignKey = @ForeignKey(name = "FK_Item_Category"))
    private Category category;

    @NotNull(message = "Quantity must not be null")
    @Column(nullable = false)
    private Integer quantity;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}