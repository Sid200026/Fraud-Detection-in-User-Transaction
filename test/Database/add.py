import psycopg2
from configparser import RawConfigParser

import random
import datetime
import argparse

config = RawConfigParser()
config.read('secret.ini')

USER = config.get('DATABASE', 'USER')
PASSWORD = config.get('DATABASE', 'PASSWORD')
HOST = config.get('DATABASE', 'HOST')
PORT = config.get('DATABASE', 'PORT')
DATABASE = config.get('DATABASE', 'DATABASE')

connection = None

parser = argparse.ArgumentParser()

parser.add_argument(
    "--value"
)

CATEGORIES = [
    'Electronics',
    'Apparels',
    'Furniture',
    'Accessories'
]

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def connect():
    global connection
    try:
        connection = psycopg2.connect(
            user=USER, password=PASSWORD, host=HOST, port=PORT, database=DATABASE)
        cursor = connection.cursor()
        print(connection.get_dsn_parameters(), "\n")
        cursor.execute("SELECT version();")
        record = cursor.fetchone()
        print("You are connected to - ", record, "\n")
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
    if connection:
        cursor.close()


def insert_transaction():
    global connection
    args = parser.parse_args()
    cursor = connection.cursor()
    sql_insert_query = """ INSERT INTO TRANSACTION (date_of_transaction, category, amount)
                           VALUES (%s,%s,%s) """
    records = []
    start_date = datetime.date(2018, 1, 1)
    end_date = datetime.date(2020, 10, 31)
    value = args.value or random.randint(100, 1200)
    category = random.choice(CATEGORIES)
    date = datetime.date.today().strftime("%Y-%m-%d")
    record = (date, category, value)
    print(record)
    records.append(record)
    result = cursor.executemany(sql_insert_query, records)
    connection.commit()
    cursor.close()


if __name__ == '__main__':
    connect()
    if connection:
        insert_transaction()
