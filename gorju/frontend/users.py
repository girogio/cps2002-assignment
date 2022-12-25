import requests
from utils import wait
from os import environ

user_api_url = environ.get('USER_API_URL')

def print_user(user):
    print('-' * 30)
    print('ID: {}'.format(user['_id']))
    print('Name: {}'.format(user['name']))
    print('Email: {}'.format(user['email']))
    print('-' * 30 + '\n')


def create(name, email):
    response = requests.post(user_api_url, json={
        'name': name,
        'email': email
    })
    if response.status_code == 201:
        print('User created successfully with ID: {}\n'.format(
            response.json()['id']))
    elif response.status_code == 409:
        print('User already exists...')


def get(id=''):
    response = requests.get(user_api_url + id)
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


def update(id, name, email):
    response = requests.patch(user_api_url + id, json={
        'name': name,
        'email': email
    })
    if response.status_code == 200:
        print('User updated successfully')
    elif response.status_code == 404:
        print('User not found')


def delete(id=''):
    response = requests.delete(user_api_url + id)
    if response.status_code == 200:
        print('User deleted successfully')
    elif response.status_code == 404:
        print('User not found')


def menu():
    while 1 == 1:
        print('''1. Get all users
2. Get user by id
3. Create user
4. Update user
5. Delete user
6. Delete all users
7. Back

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
            update(id, name, email)
        elif choice == '5':
            id = wait('Enter user id to delete:\n>  ')
            delete(id)
        elif choice == '6':
            delete()
        elif choice == '7':
            break
        wait()
