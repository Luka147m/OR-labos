import psycopg2
import csv
import json
import os

# Determine the location of the Python script
script_dir = os.path.dirname(__file__)

# Database connection parameters
db_params = {
    "host": "localhost",
    "port": "5434",
    "database": "OtvorenoRac",
    "user": "postgres",
    "password": "luka",
}

# Connect to the database
conn = psycopg2.connect(**db_params)
cursor = conn.cursor()

# Execute SQL query to retrieve data
cursor.execute("SELECT * FROM Gradovi")

# Specify the relative path to the root folder
root_folder = os.path.abspath(os.path.join(script_dir, ".."))

# Export data to CSV
csv_file_path = os.path.join(root_folder, "Gradovi.csv")
with open(csv_file_path, "w", newline="") as csv_file:
    csv_writer = csv.writer(csv_file)
    csv_writer.writerow([desc[0] for desc in cursor.description])
    csv_writer.writerows(cursor)

# Export data to JSON
data = []
for row in cursor.fetchall():
    data.append(dict(zip([desc[0] for desc in cursor.description], row)))

json_file_path = os.path.join(root_folder, "Gradovi.json")
with open(json_file_path, "w") as json_file:
    json.dump(data, json_file, indent=2)

# Create a database dump in the same folder
dump_file_path = os.path.join(root_folder, "Gradovi_dump.sql")
os.system(f"pg_dump -h localhost -p 5434 -U postgres -d OtvorenoRac -f {dump_file_path}")

# Close the cursor and connection
cursor.close()
conn.close()
