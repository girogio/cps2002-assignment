import bookings
import vehicles
import users

from os import environ
from utils import wait, load_env
from time import sleep


sleep(1)

load_env()


if __name__ == '__main__':
    while True:
        print('''
                           d8b          
                           Y8P          
                                        
 .d88b.   .d88b.  888d888 8888 888  888 
d88P"88b d88""88b 888P"   "888 888  888 
888  888 888  888 888      888 888  888 
Y88b 888 Y88..88P 888      888 Y88b 888 
 "Y88888  "Y88P"  888      888  "Y88888 
     888                   888          
Y8b d88P                  d88P          
 "Y88P"                 888P"           
================================================

        ''')

        print('''1. User Service
2. Vehicle Service
3. Booking Service
4. Exit

> ''', end='')

        choice = wait('')
        if choice == '1':
            users.menu()
        elif choice == '2':
            vehicles.menu()
        elif choice == '3':
            bookings.menu()
        elif choice == '4':
            break
        elif choice == '5':
            print(environ['USER_API_URL'])
            print(environ['VEHICLE_API_URL'])
            print(environ['BOOKING_API_URL'])
        else:
            print('Invalid choice')
            wait()
            continue
