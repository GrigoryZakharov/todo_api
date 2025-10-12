# Todo API

[![Python](https://img.shields.io/badge/python-3.11-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.117.1-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-yes-blue?logo=docker)](https://www.docker.com/)
[![Tests](https://img.shields.io/badge/tests-pytest-orange)](https://docs.pytest.org/)

A full-stack Todo App with FastAPI, PostgreSQL, React, fully containerized with Docker. Features include task CRUD, pagination, and filtering by completed/incomplete tasks.

---

<img width="500" height="997" alt="изображение" src="https://github.com/user-attachments/assets/b40e0c4f-deec-4d05-b65a-0864f7c5e6d0" />

<img width="500" height="951" alt="изображение" src="https://github.com/user-attachments/assets/42473559-b6fb-46f9-b98c-aa8bb75a0372" />


<img width="500" height="938" alt="image" src="https://github.com/user-attachments/assets/75fe9963-0876-4cf5-a3b0-0df22f65173b" />

---
## Features

 - Create, read, update, and delete tasks
 - Pagination for tasks
 - Filter tasks by completed/incomplete status
 - React frontend with TailwindCSS styling
 - PostgreSQL backend with SQLAlchemy
 - Fully Dockerized for easy deployment
 - Unit tests with Pytest

---

## Technology Stack

 - Backend: Python 3.11, FastAPI, SQLAlchemy, Pydantic, PostgreSQL
 - Frontend: React 18, TailwindCSS
 - Deployment: Docker, Docker Compose
 - Testing: Pytest

---

## Project Structure
```
Todo_API/
├── backend/
│   ├── app/         # FastAPI application
│   ├── tests/       # Backend unit tests
│   ├── Dockerfile   # Backend Docker image
│   └── requirements.txt
├── todo-frontend/
│   ├── src/         # React source code
│   ├── public/      # Static files
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```
---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/GrigoryZakharov/todo_api
cd Todo_API
```

### 2. Run using Docker Compose
```bash
docker-compose up --build
```

Backend API: http://localhost:8000/docs
Frontend: http://localhost:3000

### 3. Running Tests
```bash
cd backend
pytest
```

## API Endpoints
```
| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | /tasks/     | List all tasks        |
| POST   | /tasks/     | Create a new task     |
| GET    | /tasks/{id} | Retrieve a task by ID |
| PUT    | /tasks/{id} | Update a task         |
| DELETE | /tasks/{id} | Delete a task         |
```
Example Request Payload for POST /tasks
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```
Example Response
```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false,
  "created_at": "2025-09-25T14:00:00Z"
}
```
### Notes

Frontend supports pagination and filtering tasks by status.

Docker Compose handles both backend and frontend, plus PostgreSQL.

Environment variables (e.g., database credentials) can be placed in .env if needed.

Designed as a clean, portfolio-ready project for full-stack development.

Requirements
fastapi
uvicorn[standard]
sqlalchemy
psycopg2-binary
pydantic
