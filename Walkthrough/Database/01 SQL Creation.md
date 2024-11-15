## 1. Database creation  
```sql
CREATE USER PhyLabInvMan IDENTIFIED BY password;
```  
```sql
GRANT CONNECT, RESOURCE TO PhyLabInvMan;
```  
```sql
ALTER USER PhyLabInvMan DEFAULT TABLESPACE users;
```  
## 2. Table creation: Category  
```sql
CREATE TABLE PhyLabInvMan.Category (
    category_id NUMBER PRIMARY KEY,
    category_name VARCHAR2(100) NOT NULL
);
```  
#### insertion Example:  
```sql
INSERT INTO PhyLabInvMan.Category (category_id, category_name) 
VALUES (1, 'Electronics');

INSERT INTO PhyLabInvMan.Category (category_id, category_name) 
VALUES (2, 'Lab Equipment');
```  
## 3. Table creation: Items
```sql
CREATE TABLE PhyLabInvMan.Items (
    item_id NUMBER PRIMARY KEY,
    item_name VARCHAR2(255) NOT NULL,
    quantity NUMBER DEFAULT 0,
    status CHAR(1) CHECK (status IN ('Y', 'N')),
    date_added DATE DEFAULT SYSDATE,
    category_id NUMBER,
    CONSTRAINT fk_category FOREIGN KEY (category_id)
        REFERENCES PhyLabInvMan.Category (category_id)
);
```   
`item_id`: Unique identifier for each item.  
`item_name`: Name of the item.  
`quantity`: Quantity of the item available in the inventory.  
`status`: Indicates if the item is working ('Y') or not ('N'), represented as a CHAR(1).  
`date_added`: Date when the item was added to the inventory. The default is SYSDATE, which will insert the current date automatically.  
`category_id`: This is a foreign key that links to the Category table to specify which category the item belongs to.    
#### insertion Example:  
```sql
INSERT INTO PhyLabInvMan.Items (item_id, item_name, quantity, status, category_id) 
VALUES (1, 'Oscilloscope', 5, 'Y', 1);  -- Item from 'Electronics' category

INSERT INTO PhyLabInvMan.Items (item_id, item_name, quantity, status, category_id) 
VALUES (2, 'Microscope', 3, 'N', 2);  -- Item from 'Lab Equipment' category
```  