import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.database import Base, engine, SessionLocal
from app import crud, models

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_todo():
    todo_data = {"title": "Test Task", "description": "Test description", "completed": False}
    
    response = client.post("/todos", json=todo_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "Test description"
    assert data["completed"] is False
    assert "id" in data

def test_get_todos():
    todo1 = {"title": "Task 1", "description": "Desc 1", "completed": False}
    todo2 = {"title": "Task 2", "description": "Desc 2", "completed": True}
    client.post("/todos", json=todo1)
    client.post("/todos", json=todo2)

    response = client.get("/todos")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 2
    assert data[0]["title"] == "Task 1"
    assert data[1]["title"] == "Task 2"

def test_get_todo():
    todo1 = {"title": "Task 1", "description": "Desc 1", "completed": False}
    response_post = client.post("/todos", json=todo1)
    todo_id = response_post.json()["id"]

    response = client.get(f"/todos/{todo_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Task 1"
    assert data["description"] == "Desc 1"
    assert data["completed"] is False


def test_put_todo():
    todo1 = {"title": "Task 1", "description": "Desc 1", "completed": False}
    response_post = client.post("/todos", json=todo1)
    todo_id = response_post.json()["id"]

    todo_data = {"title": "Test Task", "description": "Test description", "completed": True}
    response = client.put(f"/todos/{todo_id}", json=todo_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "Test description"
    assert data["completed"] is True
    assert "id" in data