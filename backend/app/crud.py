from .models import Todo

def create_todo(db_session, title, description):
    new_todo = Todo(title = title, description = description)
    db_session.add(new_todo)
    db_session.commit()
    db_session.refresh(new_todo)
    return new_todo

def get_todos(db_session):
    return db_session.query(Todo).all()
    
def get_todo(db_session, todo_id):
    return db_session.get(Todo, todo_id)
    
def update_todo(db_session, todo_id, **fields):
    todo = db_session.get(Todo, todo_id)
    if not todo:
        return None
    for key, value in fields.items():
        if hasattr(todo, key):
            setattr(todo, key, value)
    db_session.commit()
    db_session.refresh(todo)
    return todo
    
def delete_todo(db_session, todo_id):
    todo = db_session.get(Todo, todo_id)
    if not todo:
        return None
    db_session.delete(todo)
    db_session.commit()
    return todo
    