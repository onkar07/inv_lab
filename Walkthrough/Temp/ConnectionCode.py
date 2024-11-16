import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(
        host='15.206.7.141',  # Replace 'your_IP_address' with the actual IP
        user='remote_park_onk',
        password='Parkingbay@123'
    )
    if connection.is_connected():
        print("Successfully connected to the MySQL server")
        db_info = connection.get_server_info()
        print(f"Connected to MySQL Server version {db_info}")

except Error as e:
    print(f"Error connecting to MySQL: {e}")

finally:
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("MySQL connection is closed")