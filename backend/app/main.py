from fastapi import FastAPI, Depends
from .database import init_db, SessionLocal
from sqlalchemy.orm import Session
from . import crud
from .schemas import CreateTodo, UpdateTodo, TodoResponse
from fastapi import HTTPException

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get('/health')
def health():
    return { "status" : "ok" }

@app.post("/todos", response_model = TodoResponse)
def create_todo(todo : CreateTodo, db : Session = Depends(get_db)):
    return crud.create_todo(db, title = todo.title, description = todo.description)

@app.get("/todos", response_model = list[TodoResponse])
def get_todos(db : Session = Depends(get_db)):
    return crud.get_todos(db)
     
@app.get("/todos/{id}", response_model = TodoResponse)
def get_todo(id : int, db : Session = Depends(get_db)):
    return crud.get_todo(db, todo_id = id)

@app.put("/todos/{id}", response_model = TodoResponse)
def update_todo(id: int, todo: UpdateTodo, db: Session = Depends(get_db)):
    fields = {}
    if todo.title is not None: fields["title"] = todo.title
    if todo.description is not None: fields["description"] = todo.description
    if todo.completed is not None: fields["completed"] = todo.completed
    return crud.update_todo(db, todo_id=id, **fields)

@app.delete("/todos/{id}", response_model=TodoResponse)
def delete_todo(id: int, db: Session = Depends(get_db)):
    todo = crud.get_todo(db, id) 
    if not todo:
        raise HTTPException(status_code=404, detail="Task not found")
    crud.delete_todo(db, todo_id=id)
    return todo
