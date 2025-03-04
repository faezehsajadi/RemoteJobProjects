def calculator():
    print("simple cal")
    try:
        num1 = int(input("Enter your first number: "))
        op = input("Enter your operator (+, -, *, /): ")
        num2 = int(input("Enter your second number: "))
        
        if op == '+':
            result = num1 + num2
        elif op == '-':
            result = num1 - num2
        elif op == '*':
            result = num1 * num2
        elif op == '/':
            if num2 != 0:
                result = num1 / num2
            else:
                print("Cannot divide by zero!")
                return
        else:
            print("Wrong operator!")
            return
        
        print(f"Result: {result}")
    except ValueError:
        print("Invalid input. Please enter numbers only.")

calculator()