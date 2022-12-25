import requests
from utils import *
from os import getenv

vehicle_api_url = getenv('VEHICLE_API_URL')


def print_vehicle(vehicle):
    print('-' * 30)
    print('Vehicle ID: {}'.format(vehicle['numberPlate']))
    print('Brand: {}'.format(vehicle['brand']))
    print('Model: {}'.format(vehicle['model']))
    print('Colour: {}'.format(vehicle['colour']))
    print('Capacity: {}'.format(vehicle['capacity']))
    print('Price: ${:.2f}'.format(vehicle['price']))
    print('Available: {}'.format(vehicle['available']))
    print('-' * 30 + '\n')


def create(number_plate, brand, model, colour, type):
    r = requests.post(vehicle_api_url + f'?type={type}', json={
        'numberPlate': number_plate,
        'brand': brand,
        'model': model,
        'colour': colour,
    })
    if r.status_code == 201:
        print('Vehicle created successfully with ID: {}'.format(number_plate))
    elif r.status_code == 409:
        print('Vehicle already exists...')
    else:
        print('Something went wrong...\n')
        print(r.json())


def get(id='', available='', colour=''):
    url = vehicle_api_url
    if id != '':
        url += id
    else:
        url += '?'
        if available:
            url += f'available={available}&'
        if colour:
            url += f'colour={colour}&'

    r = requests.get(url)

    vehicles = r.json()['vehicles']

    if r.status_code == 200:
        if id:
            print('Vehicle found\n')
            print_vehicle(vehicles)
        else:
            if len(vehicles) == 0:
                print('No vehicles found')
            else:
                for vehicle in vehicles:
                    print_vehicle(vehicle)


def getAvailable():
    r = requests.get(vehicle_api_url + '?available=true')
    return r.json()['vehicles']


def update(number_plate='', brand='', model='', colour='', price=-1, capacity=-1, available=''):
    available = requests.get(
        vehicle_api_url + number_plate).json()['vehicles'][0]['available']
    r = requests.put(vehicle_api_url, json={
        'numberPlate': number_plate,
        'brand': brand,
        'price': price,
        'capacity': capacity,
        'model': model,
        'colour': colour,
        'available': available
    })

    if r.status_code == 200:
        print('Vehicle updated successfusaly')
    elif r.status_code == 404:
        print('Vehicle not found...')
    else:
        print('Something went wrong...')
        print(r.json())


def delete(number_plate):
    r = requests.delete(vehicle_api_url + number_plate)
    if r.json()['found'] == True:
        print('Vehicle deleted successfully')
    else:
        print('Vehicle not found...')


def menu():
    while 1 == 1:
        print('''1. Get all vehicles
2. Get vehicles by availability
3. Get vehicles by colour
4. Create vehicle
5. Update vehicle
6. Delete vehicle
7. Back

> ''', end='')
        choice = wait('')
        if choice == '1':
            get()
        elif choice == '2':
            choice = wait('1. Available\n2. Unavailable\n3. Back\n> ')
            if choice == '3':
                continue
            else:
                get(available=('true' if choice == '1' else 'false'))
        elif choice == '3':
            colour = wait('Enter colour (empty for back):\n> ')
            if colour == '':
                continue
            else:
                get(colour=colour)

        elif choice == '4':

            number_plate = get_plate()
            brand = wait('Enter brand:\n> ')
            model = wait('Enter model:\n> ')
            colour = wait('Enter colour:\n> ')
            type = get_type()
            create(number_plate, brand, model, colour, type)

        elif choice == '5':

            number_plate = get_plate()
            brand = wait('Enter brand:\n> ')
            model = wait('Enter model:\n> ')
            colour = wait('Enter colour:\n> ')
            price = input_price()
            capacity = input_capacity()
            available = wait('Enter availability (true / false):\n> ')
            update(number_plate, brand, model, colour,
                   price, capacity, available)

        elif choice == '6':

            number_plate = get_plate()
            if number_plate == '':
                continue
            else:
                delete(number_plate)

        elif choice == '7':
            break
        wait()
