import requests
import users
from utils import *
from os import environ
from datetime import datetime


def print_booking(booking):
    print('-' * 30)
    print('ID: {}'.format(booking['_id']))
    print('Booker ID: {}'.format(booking['booker_id']))
    from_ = datetime.fromisoformat(
        booking['from_date'][:-1] + '+00:00').strftime('%d/%m/%Y')
    to_ = datetime.fromisoformat(
        booking['to_date'][:-1] + '+00:00').strftime('%d/%m/%Y')
    print('From date: {}'.format(from_))
    print('To date: {}'.format(to_))
    print('Number plate: {}'.format(booking['number_plate']))
    print('Is paid?: {}'.format(booking['paid']))
    print('Price: ${:.2f}'.format(booking['price']))
    print('-' * 30 + '\n')


def print_calendar(calendar):
    for vehicle in calendar:
        print('Vehicle with number plate {} is:\n'.format(vehicle))
        for booking_object in calendar[vehicle]:
            from_date = datetime.fromisoformat(
                booking_object['from_date'][:-1] + '+00:00').strftime('%d/%m/%Y')
            to_date = datetime.fromisoformat(
                booking_object['to_date'][:-1] + '+00:00').strftime('%d/%m/%Y')
            print('\ttaken from {} till the {}'.format(from_date, to_date))
        print('\n\n')


def get(id=''):
    response = requests.get(environ['BOOKING_API_URL'] + id)
    if response.status_code == 200:
        if len(response.json()['bookings']) == 0:
            print('No bookings found...')
        else:
            for booking in response.json()['bookings']:
                print_booking(booking)
    elif response.status_code == 503:
        print('Service unavailable...')
    else:
        print('Something went wrong...')
        print(response.text)


def get_calendar():
    response = requests.get(environ['BOOKING_API_URL'] + '/calendar')
    if response.status_code == 200:
        if len(response.json()) == 0:
            print('All vehicles are available...')
        else:
            print_calendar(response.json())
    elif response.status_code == 503:
        print('Service unavailable...')
    else:
        print('Something went wrong...')
        print(response.text)


def get_veh_cal(number_plate):
    response = requests.get(
        environ['BOOKING_API_URL'] + 'calendar/' + number_plate.upper())
    if response.status_code == 200:
        if len(response.json()) == 0:
            print('Vehicle is available...')
        else:
            print('Vehicle {} is\n'.format(number_plate.upper()))
            for booking_object in response.json():
                from_date = datetime.fromisoformat(
                    booking_object['from_date'][:-1] + '+00:00').strftime('%d/%m/%Y')
                to_date = datetime.fromisoformat(
                    booking_object['to_date'][:-1] + '+00:00').strftime('%d/%m/%Y')
                print('\ttaken from {} till the {}'.format(from_date, to_date))
    elif response.status_code == 503:
        print('Service unavailable...')
    else:
        print('Something went wrong...')
        print(response.text)


def create(booker_id, number_plate, from_date, to_date):

    response = requests.post(environ['BOOKING_API_URL'], json={
        'booker_id': booker_id,
        'number_plate': number_plate,
        'from_date': from_date,
        'to_date': to_date
    })

    if response.status_code == 201:
        print("Booking has been created with id " +
              response.json()['booking_id'])
    else:
        print('Something went wrong...\n')
        print(response.json()['message'])


def delete(id):
    response = requests.delete(environ['BOOKING_API_URL'] + id)
    if response.status_code == 200 or response.status_code == 204:
        print('Booking fulfilled successfully!')
    elif response.status_code == 404:
        print('Booking not found...')
    else:
        print('Something went wrong...')
        print(response.json())

def menu():
    while 1 == 1:
        print('''1. Get all bookings
2. Get full calendar
3. Get vehicle calendar
4. Create booking
5. Fulfill booking
6. Back
> ''', end='')
        choice = wait('')

        if choice == '1':
            get()

        elif choice == '2':
            get_calendar()
        elif choice == '3':
            number_plate = get_plate()
            get_veh_cal(number_plate)
        elif choice == '4':
            user = get_user_by_email()

            id = user['_id']

            number_plate = get_plate()

            from_date = enter_date("Enter from date: (dd/mm/yyyy)\n> ")

            to_date = enter_date("Enter to date: (dd/mm/yyyy)\n> ")

            create(id, number_plate, from_date, to_date)

        elif choice == '5':
            id = wait('Enter booking id: ')
            delete(id)

        elif choice == '6':
            break

        wait()
