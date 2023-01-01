import sqlite3

# def create_connection(db_file):
#     """ create a database connection to a SQLite database """
#     conn = None
#     try:
#         conn = sqlite3.connect(db_file)
#     except Error as e:
#         print(e)
#     finally:
#         if conn:
#             conn.close()
#     cur = conn.cursor()


# if __name__ == '__main__':
#     create_connection(r"db/crime.db")


def search(state, year):
    con = sqlite3.connect("db/crime.db", check_same_thread=False)
    cur = con.cursor()

    if state == 'or' or state == 'OR':
        state = 'ore'

    query = f"SELECT * FROM {state} WHERE year=?;"
    try:
        data = cur.execute(query, [year])
    except:
        return 0

    crimeList = ['violent_crime', 'homicide', 'robbery', 'aggravated_assault', 'property_crime',
                 'burglary', 'larceny', 'motor_vehicle_theft', 'arson', 'rape', 'total_crime']

    crime_dict = {}
    temp_dict = {}
    for row in data:
        crime_dict['state'] = row[0]
        crime_dict['population'] = row[1]
        crime_dict['year'] = row[2]

        for i in range(3, 14):
            temp_dict[crimeList[i-3]] = {'occurances': row[i],
                                         'per100k': round((row[i] / row[1]) * 100000, 2)}

    crime_dict['crimes'] = temp_dict
    return crime_dict


def create(crime_dict):
    con = sqlite3.connect("db/crime.db", check_same_thread=False)
    cur = con.cursor()

    if crime_dict['state'] == 'or' or crime_dict['state'] == 'OR':
        crime_dict['state'] = 'ore'

    query = f"CREATE TABLE IF NOT EXISTS {crime_dict['state'].lower()}(state TEXT NOT NULL, population INTEGER NOT NULL, year INTEGER PRIMARY KEY NOT NULL, violent_crime INTEGER NOT NULL, homicide INTEGER NOT NULL, robbery INTEGER NOT NULL, aggravated_assault INTEGER NOT NULL, property_crime INTEGER NOT NULL, burglary INTEGER NOT NULL, larceny INTEGER NOT NULL, motor_vehicle_theft INTEGER NOT NULL, arson INTEGER NOT NULL, rape INTEGER NOT NULL, total_crime INTEGER NOT NULL)"
    cur.execute(query)

    query = f"INSERT INTO {crime_dict['state'].lower()} VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    cur.execute(query, [crime_dict['state'], crime_dict['population'], crime_dict['year'], crime_dict['crimes']['violent_crime']['occurances'], crime_dict['crimes']['homicide']['occurances'], crime_dict['crimes']['robbery']['occurances'], crime_dict['crimes']['aggravated_assault']['occurances'],
                crime_dict['crimes']['property_crime']['occurances'], crime_dict['crimes']['burglary']['occurances'], crime_dict['crimes']['larceny']['occurances'], crime_dict['crimes']['motor_vehicle_theft']['occurances'], crime_dict['crimes']['arson']['occurances'], crime_dict['crimes']['rape']['occurances'], crime_dict['crimes']['total_crime']['occurances']])
    con.commit()
