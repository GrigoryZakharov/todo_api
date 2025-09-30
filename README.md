# Todo API

[![Python](https://img.shields.io/badge/python-3.11-blue?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.117.1-green?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Docker](https://img.shields.io/badge/docker-yes-blue?logo=docker)](https://www.docker.com/)
[![Tests](https://img.shields.io/badge/tests-pytest-orange)](https://docs.pytest.org/)

A simple REST API for managing tasks (Todo) built with **FastAPI**, **SQLAlchemy**, and **PostgreSQL**. The project is fully containerized using Docker and Docker Compose and includes unit tests with Pytest.

---

## Features
- Create, read, update, and delete tasks
- PostgreSQL database integration
- Dockerized backend for easy deployment
- Unit tests with Pytest

---

## Technology Stack
- Python 3.11
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- Docker & Docker Compose
- Pytest

---

## Project Structure

Todo_API/
├── backend/
│ ├── app/ # main application code
│ ├── tests/ # unit tests
│ ├── Dockerfile # docker image definition
│ └── requirements.txt
├── docker-compose.yml
├── .gitignore
└── README.md

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

Backend API will be available at: http://localhost:8000/docs

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

Make sure Docker and Docker Compose are installed.

Environment variables (like database credentials) should be set in a .env file if you add it later.

This project is designed to be a clean, easy-to-understand portfolio example for Python backend development.

For more information about FastAPI, visit FastAPI Docs

Requirements
fastapi
uvicorn[standard]
sqlalchemy
psycopg2-binary
pydantic
