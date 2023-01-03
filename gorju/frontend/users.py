import requests
from utils import wait, input_price
from os import environ


def print_user(user):
    print('-' * 30)
    print('ID: {}'.format(user['_id']))
    print('Name: {}'.format(user['name']))
    print('Email: {}'.format(user['email']))
    print('Balance: {}'.format(user['balance']))
    print('-' * 30 + '\n')


def create(name, email):
    response = requests.post(environ['USER_API_URL'], json={
        'name': name,
        'email': email
    })
    if response.status_code == 201:
        print('User created successfully with ID: {}\n'.format(
            response.json()['user_id']))
    elif response.status_code == 409:
        print('User already exists...')
    else:
        print('Something went wrong...')
        print(response.text)

def getByEmail(email):
    response = requests.get(environ['USER_API_URL'] + 'email/' + email)
    if response.status_code == 200:
        print('User found\n')
        print_user(response.json())
    elif response.status_code == 404:
        print('User not found')
    elif response.status_code == 400:
        print('Invalid ID supplied...')
    else:
        print('Something went wrong...')
        print(response.text)

def get(id=''):
    response = requests.get(environ['USER_API_URL'] + id)
    if response.status_code == 200:
        if id:
            print('User found\n')
            print_user(response.json())
        else:
            if len(response.json()) == 0:
                print('No users found')
            else:
                for idx, user in enumerate(response.json()):
                    print('User #{}'.format(idx + 1))
                    print_user(user)
    elif response.status_code == 404:
        print('User not found')
    elif response.status_code == 400:
        print('Invalid ID supplied...')
    else:
        print('Something went wrong...')
        print(response.text)


def update(id, name, email, balance):
    response = requests.patch(environ['USER_API_URL'] + id, json={
        'name': name,
        'email': email,
        'balance': balance
    })
    if response.status_code == 200:
        print('User updated successfully')
    elif response.status_code == 404:
        print('User not found')
    else:
        print('Something went wrong...\n')
        print(response.text)


def delete(id=''):
    response = requests.delete(environ['USER_API_URL'] + id)
    if response.status_code == 200:
        print('User deleted successfully')
    elif response.status_code == 404:
        print('User not found')
    else:
        print('Something went wrong...')
        print(response.text)


def addbalance(id, amount):
    response = requests.post(environ['USER_API_URL'] + id + '/addbalance', json={
        'amount': amount
    })
    if response.status_code == 200:
        print('Balanced topped up successfully!')
    elif response.status_code == 404:
        print('User not found...')
    else:
        print('Something went wrong...')
        print(response.text)


def menu():
    while 1 == 1:
        print('''1. Get all users
2. Get user by id
3. Create user
4. Update user
5. Delete user
6. Delete all users
7. Add to balance
8. Get user by email
9. Exit

> ''', end='')
        choice = wait('')

        if choice == '1':
            get()
        elif choice == '2':
            id = wait('Enter user id:\n>  ')
            get(id)
        elif choice == '3':
            name = wait('Enter name:\n> ')
            email = wait('Enter email:\n> ')
            create(name, email)
        elif choice == '4':
            id = wait('Enter user id to update:\n>  ')
            name = wait('Enter new name:\n> ')
            email = wait('Enter new email:\n> ')
            balance = input_price(
                'Enter new balance: (leave blank to keep current balance)\n>', 'Enter a valid balance...\n')
            update(id, name, email, balance)
        elif choice == '5':
            id = wait('Enter user id to delete:\n>  ')
            delete(id)
        elif choice == '6':
            delete()
        elif choice == '7':
            id = wait('Enter user id:\n>  ')
            amount = input_price()
            addbalance(id, amount)
        elif choice == '8':
            email = wait('Enter email:\n>  ')
            getByEmail(email)
        elif choice == '9':
            break
        wait()
