# 1. Create a New Category  
HTTP Method: `POST`  
URL: `http://localhost:8080/api/categories`
```json
{
    "name": "Physics Equipment",
    "description": "Items and apparatus used in physics experiments"
}
```  

# 2. Get All Categories  
HTTP Method: `GET`  
URL: `http://localhost:8080/api/categories`  

# 3. Get Category by ID  
HTTP Method: `GET`  
URL: `http://localhost:8080/categories/{id}`  

# 4. Update a Category  
HTTP Method: `PUT`  
URL: `http://localhost:8080/categories/{id}`  
```json
{
  "name": "Updated Category Name"
}
```  

# 5. Delete a Category  
HTTP Method: `DELETE`  
URL: `http://localhost:8080/categories/{id}`  