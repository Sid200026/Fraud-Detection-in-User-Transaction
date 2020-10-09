import psycopg2
from configparser import RawConfigParser

config = RawConfigParser()
config.read('secret.ini')

USER = config.get('DATABASE', 'USER')
PASSWORD = config.get('DATABASE', 'PASSWORD')
HOST = config.get('DATABASE', 'HOST')
PORT = config.get('DATABASE', 'PORT')
DATABASE = config.get('DATABASE', 'DATABASE')

connection = None


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
        category STRING NOT NULL,
        amount FLOAT(10) NOT NULL,
    );
    '''
    cursor.execute(create_transaction_table_query)
    connection.commit()
    create_expectation_table_query = '''
    CREATE TABLE IF NOT EXISTS EXPECTATION(
        year YEAR NOT NULL,
        month STRING NOT NULL,
        expected FLOAT(10) NOT NULL,
    );
    '''
    cursor = connection.cursor()
    cursor.execute(create_expectation_table_query)
    connection.commit()
    cursor.close()


if __name__ == '__main__':
    connect()
    if connection:
        create_tables()
