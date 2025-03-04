import random

def guess_game():
    number = random.randint(1, 100)
    guess = 0
    while guess != number:
        guess = int(input("Guess a number between 1 and 100.: "))
        if guess < number: print("Guess bigger.!")
        elif guess > number: print("Guess smaller!")
    print("Well done, you guessed right!")

guess_game()