# 1. Create a New Item  
HTTP Method: `POST`  
URL: `http://localhost:8080/api/items`  
```json
{
    "name": "Physics Book",
    "quantity": 10,
    "status": true,
    "date": "2024-11-28T12:00:00Z",
    "category": {
        "id": 1
    }
}
```  
# 2. Get All Items  
HTTP Method: `GET`
URL: `http://localhost:8080/api/items`  

# 3. Get Item by ID  
HTTP Method: `GET`  
URL: `http://localhost:8080/api/items/{id}`  

# 4. Update an Item  
HTTP Method: `PUT`  
URL: `http://localhost:8080/api/items/{id}`  
```json
{
    "name": "Updated Physics Book",
    "quantity": 20,
    "status": false,
    "date": "2024-11-28T12:00:00Z",
    "category": {
        "id": 2
    }
}
```  
# 5. Delete an Item  
HTTP Method: `DELETE`  
URL: `http://localhost:8080/api/items/{id}`  