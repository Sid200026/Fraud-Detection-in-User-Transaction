import psycopg2
from configparser import RawConfigParser

import random
import datetime

config = RawConfigParser()
config.read('secret.ini')

USER = config.get('DATABASE', 'USER')
PASSWORD = config.get('DATABASE', 'PASSWORD')
HOST = config.get('DATABASE', 'HOST')
PORT = config.get('DATABASE', 'PORT')
DATABASE = config.get('DATABASE', 'DATABASE')

connection = None

CATEGORIES = [
    'Electronics',
    'Apparels',
    'Furniture',
    'Accessories',
    'Accessories',  # Add biasness
]

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def get_random_date(start_date, end_date):
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    random_date = start_date + datetime.timedelta(days=random_number_of_days)
    return random_date


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


def create_tables():
    global connection
    cursor = connection.cursor()
    create_transaction_table_query = '''
    CREATE TABLE IF NOT EXISTS TRANSACTION(
        date_of_transaction DATE NOT NULL,
        category TEXT NOT NULL,
        amount FLOAT(10) NOT NULL
    );'''
    cursor.execute(create_transaction_table_query)
    connection.commit()
    create_expectation_table_query = '''
    CREATE TABLE IF NOT EXISTS EXPECTATION(
        year INT NOT NULL,
        month TEXT NOT NULL,
        expected FLOAT(10) NOT NULL
    );'''
    cursor = connection.cursor()
    cursor.execute(create_expectation_table_query)
    connection.commit()
    cursor.close()


def insert_expectations():
    global connection
    cursor = connection.cursor()
    sql_insert_query = """ INSERT INTO EXPECTATION (year, month, expected)
                           VALUES (%s,%s,%s) """
    records = []
    base_year = 2018
    for i in range(3):
        for month in months:
            value = random.randint(8000, 20000)
            record = (base_year, month, value)
            records.append(record)
        base_year += 1
    result = cursor.executemany(sql_insert_query, records)
    connection.commit()
    print(cursor.rowcount, "Record inserted successfully into expectation table")
    cursor.close()


def insert_transactions():
    global connection
    cursor = connection.cursor()
    sql_insert_query = """ INSERT INTO TRANSACTION (date_of_transaction, category, amount)
                           VALUES (%s,%s,%s) """
    records = []
    start_date = datetime.date(2018, 1, 1)
    end_date = datetime.date(2020, 10, 10)
    for i in range(9500):
        category = random.choice(CATEGORIES)
        value = None
        if category == "Accessories":
            value = random.randint(8, 50)
        else:
            value = random.randint(8, 100)
        date = get_random_date(start_date, end_date).strftime("%Y-%m-%d")
        record = (date, category, value)
        records.append(record)
    result = cursor.executemany(sql_insert_query, records)
    connection.commit()
    print(cursor.rowcount, "Record inserted successfully into transaction table")
    cursor.close()


if __name__ == '__main__':
    connect()
    if connection:
        create_tables()
        # insert_expectations()
        insert_transactions()
