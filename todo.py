tasks = []

def todo_list():
    while True:
        action = input("plus (a)، delete (d)، show (s)، exit (e): ")
        if action == 'a':
            task = input("enter your task ")
            tasks.append(task)
        elif action == 'd':
            task = input("Which one should I delete?")
            if task in tasks:
                tasks.remove(task)
            else:
                print("Task not found!")
        elif action == 's':
            print("tasks:")
            for index, task in enumerate(tasks, start=1):
                print(f"{index}. {task}")
        elif action == 'e':
            break

todo_list()
