import re
from os import environ


def load_env():

    if 'PYTHON_ENV' in environ:
        if environ['PYTHON_ENV'] == 'container':
            print('\nWelcome to the Gorju Car Rental System CLI.')
            print('This is a container environment.\n')
            wait('Press enter to continue...')
            host = 'proxy'
            booking_port, user_port, vehicle_port = '', '', ''
    else:

        with open('.env', 'r') as f:
            for line in f.readlines():
                key, value = line.split('=')
                environ[key] = value.strip()

        if environ.get('PYTHON_ENV') == 'development':

            print('\nWelcome to the Gorju Car Rental System CLI.')
            print('This is a development environment.\n')
            wait('Press enter to continue...')
            host = 'localhost'
            booking_port, user_port, vehicle_port = ':3000', ':3001', ':3002'

        elif environ.get('PYTHON_ENV') == 'production':

            print('\nWelcome to the Gorju Car Rental System CLI.')
            print('This is a production environment.\n')
            wait('Press enter to continue...')
            host = 'localhost'
            booking_port, user_port, vehicle_port = '', '', ''

    environ['BOOKING_API_URL'] = f'http://{host}{booking_port}/api/bookings/'
    environ['USER_API_URL'] = f'http://{host}{user_port}/api/users/'
    environ['VEHICLE_API_URL'] = f'http://{host}{vehicle_port}/api/vehicles/'


def wait(msg='\nPress enter to continue...'):
    a = input(msg)
    print('\033[2J', end='')
    print('\033[0;0H', end='')
    return a


def valid_number_plate(number_plate):
    if len(number_plate) != 6:
        return False
    for i in range(0, 3):
        if not number_plate[i].isalpha():
            return False
    for i in range(3, 6):
        if not number_plate[i].isdigit():
            return False
    return True


def valid_email(email):
    return re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email)


def get_plate():
    while 1 == 1:
        number_plate = wait('Enter number plate: (XYZ123)\n>  ')
        if valid_number_plate(number_plate) or number_plate == '':
            return number_plate
        else:
            wait('Invalid number plate. Try again.')


def get_type():
    while 1 == 1:
        type = wait('Enter type: (family / motorcycle / commercial)\n> ')
        if type in ['family', 'motorcycle', 'commercial'] or type == '':
            return type
        else:
            wait('Invalid type. Try again.')


def is_float(s):
    try:
        float(s)
        return True
    except ValueError:
        return False


def is_number(s):
    if s == '':
        return True
    try:
        int(s)
        return True
    except ValueError:
        return False


def input_price(string='Enter price:\n> ', error='Invalid price. Try again.'):
    while 1 == 1:
        price = wait(string)
        if is_float(price) or price == '':
            return price if price != '' else -1
        else:
            wait(error)


def input_capacity():
    while 1 == 1:
        capacity = wait('Enter capacity:\n> ')
        if is_number(capacity) or capacity == '':
            return capacity if capacity != '' else -1
        if capacity >= 0:
            return capacity
        else:
            wait('Invalid capacity. Try again.')
