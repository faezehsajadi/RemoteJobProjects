from flask import Flask, request, jsonify
import json
import os

app = Flask(name)
TASKS_FILE = 'tasks.json'

# بارگذاری یا ایجاد فایل tasks
def load_tasks():
    if os.path.exists(TASKS_FILE):
        with open(TASKS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

# ذخیره کردن tasks تو فایل
def save_tasks(tasks):
    with open(TASKS_FILE, 'w', encoding='utf-8') as f:
        json.dump(tasks, f, ensure_ascii=False)

# دریافت تمام کارها (GET)
@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = load_tasks()
    return jsonify(tasks)

# اضافه کردن کار جدید (POST)
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    if 'task' in data and data['task'].strip():
        tasks = load_tasks()
        tasks.append(data['task'])
        save_tasks(tasks)
        return jsonify({'message': 'Task added successfully'}), 201
    return jsonify({'error': 'No task provided or empty task'}), 400

# حذف کار (DELETE)
@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    tasks = load_tasks()
    if 0 <= index < len(tasks):
        tasks.pop(index)
        save_tasks(tasks)
        return jsonify({'message': 'Task deleted successfully'})
    return jsonify({'error': 'Invalid index'}), 404

# ویرایش کار (PUT)
@app.route('/tasks/<int:index>', methods=['PUT'])
def edit_task(index):
    tasks = load_tasks()
    if 0 <= index < len(tasks):
        data = request.get_json()
        if 'task' in data and data['task'].strip():
            tasks[index] = data['task']
            save_tasks(tasks)
            return jsonify({'message': 'Task edited successfully'})
        return jsonify({'error': 'No task provided or empty task'}), 400
    return jsonify({'error': 'Invalid index'}), 404

if name == 'main':
    app.run(debug=True, host='0.0.0.0', port=5000)