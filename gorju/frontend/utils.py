def wait(msg='\nPress enter to continue...'):
    a = input(msg)
    print('\033[2J', end='')
    print('\033[0;0H', end='')
    return a
