## Describe Table  
```sql
DESC PhyLabInvMan.Items;
```  
```sql
DESC PhyLabInvMan.Category;
```  
## View All Records  
```sql
SELECT * FROM PhyLabInvMan.Category;
```  
```sql
SELECT * FROM PhyLabInvMan.Items;
```  
## Join `Items` and `Category` Tables to Get Combined Information  
```sql
SELECT 
    i.item_id,
    i.item_name,
    i.quantity,
    i.status,
    i.date_added,
    c.category_name
FROM 
    PhyLabInvMan.Items i
JOIN 
    PhyLabInvMan.Category c
ON 
    i.category_id = c.category_id;
```  
## Filter Items Based on Certain Conditions  
```sql
# working items
SELECT * 
FROM PhyLabInvMan.Items
WHERE status = 'Y';
```  
```sql
# not working items
SELECT * 
FROM PhyLabInvMan.Items
WHERE status = 'N';
```  
## Show items in a specific category (e.g., 'Electronics')  
```sql
SELECT 
    i.item_id,
    i.item_name,
    i.quantity,
    i.status,
    i.date_added
FROM 
    PhyLabInvMan.Items i
JOIN 
    PhyLabInvMan.Category c
ON 
    i.category_id = c.category_id
WHERE 
    c.category_name = 'Electronics';
```  