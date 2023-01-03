import requests
from utils import *
from os import environ


def print_user(user):
    print('-' * 30)
    print('ID: {}'.format(user['_id']))
    print('Name: {}'.format(user['name']))
    print('Email: {}'.format(user['email']))
    print('Balance: {}'.format(user['balance']))
    print('-' * 30 + '\n')


def get():
    response = requests.get(environ['BOOKING_API_URL'])
    if response.status_code == 200:
        print(response.json())
    elif response.status_code == 503:
        print('Service unavailable...')
    else:
        print('Something went wrong...')
        print(response.text)


def create(name, email):
    response = requests.post(environ['BOOKING_API_URL'], json={
        'name': name,
        'email': email
    })
    if response.status_code == 201:
        print('User created successfully with ID: {}\n'.format(
            response.json()['id']))
    elif response.status_code == 409:
        print('User already exists...')
    else:
        print('Something went wrong...')
        print(response.text)


# def update(id, name, email, balance):
#     response = requests.patch(user_api_url + id, json={
#         'name': name,
#         'email': email,
#         'balance': balance
#     })
#     if response.status_code == 200:
#         print('User updated successfully')
#     elif response.status_code == 404:
#         print('User not found')
#     else:
#         print('Something went wrong...\n')
#         print(response.text)


# def delete(id=''):
#     response = requests.delete(user_api_url + id)
#     if response.status_code == 200:
#         print('User deleted successfully')
#     elif response.status_code == 404:
#         print('User not found')
#     else:
#         print('Something went wrong...')
#         print(response.text)


# def addbalance(id, amount):
#     response = requests.post(user_api_url + id + '/addbalance', json={
#         'amount': amount
#     })
#     if response.status_code == 200:
#         print('Balanced topped up successfully!')
#     elif response.status_code == 404:
#         print('User not found...')
#     else:
#         print('Something went wrong...')
#         print(response.text)


def menu():
    while 1 == 1:
        print('''1. Get all bookings
2. Create a booking

> ''', end='')
        choice = wait('')

        if choice == '1':
            get()

        elif choice == '2':
            print('Enter booking details:')
            email = input('Enter client email: ', end='')
            
            while check_valid_email(email) == False:
                email = input('Enter client email: ', end='')


        wait()
