from pydantic import BaseModel
from typing import List

class TodoBase(BaseModel):
    title : str
    description : str | None = None
    completed : bool = False

class CreateTodo(TodoBase):
    pass

class UpdateTodo(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None

class TodoResponse(TodoBase):
    id: int

    class Config:
        orm_mode = True 

class TodoListResponse(BaseModel):
    total: int
    items: List[TodoResponse]