# 1. Create a New Item  
HTTP Method: `POST`  
URL: `http://localhost:8080/items`  
```json
{
    "name": "Physics Book",
    "category": {
        "id": 1
    },
    "quantity": 10
}
```  
# 2. Get All Items  
HTTP Method: `GET`
URL: `http://localhost:8080/items`  

# 3. Get Item by ID  
HTTP Method: `GET`  
URL: `http://localhost:8080/items/{id}`  

# 4. Update an Item  
HTTP Method: `PUT`  
URL: `http://localhost:8080/items/{id}`  
```json
{
    "name": "Updated Physics Book",
    "category": {
        "id": 1
    },
    "quantity": 20
}
```  
# 5. Delete an Item  
HTTP Method: `DELETE`  
URL: `http://localhost:8080/items/{id}`  