import psycopg2
import os


def execute_query(sql):
    try:
        conn = psycopg2.connect(
            database=os.environ.get("PGDATABASE"),
            user=os.environ.get("PGUSER"),
            password=os.environ.get("PGPASSWORD"),
            host=os.environ.get("PGHOST"),
            port=os.environ.get("PGPORT"),
        )

        # Create a cursor object to execute SQL queries
        cur = conn.cursor()

        rows = None
        column_names = None

        cur.execute(sql)

        if sql.strip()[:6] == "SELECT":
            # Fetch data
            rows = cur.fetchall()

            if cur.description is not None:
                column_names = [desc[0] for desc in cur.description]
        else:
            # Commit data
            conn.commit()

    except psycopg2.Error as e:
        print(f"Error connecting to PostgreSQL: {e}")
        rows = -1

    finally:
        # Close the cursor and connection
        if cur:
            cur.close()
        if conn:
            conn.close()

        return rows, column_names
