
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
import requests

tasks = []

def send_to_telegram(task_list):
    token = "7885084705:AAFTh-xRG4A4P4Z0twIv8U2KfVu37HFDbvc"  # توکنی که از BotFather گرفتید
    chat_id = "@Faezehsajadi17"  # آیدی چت یا کانال خود را وارد کنید
    message = "Your Tasks:\n" + "\n".join([f"{i+1}. {task}" for i, task in enumerate(task_list)])
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    data = {"chat_id": chat_id, "text": message}
    response = requests.post(url, data=data)
    if response.status_code == 200:
        print("Message sent successfully!")
    else:
        print(f"Failed to send message: {response.status_code} - {response.text}")