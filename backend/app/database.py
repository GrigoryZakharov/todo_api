import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DB_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@db:5432/todo_db"
)
engine = create_engine(DB_URL, echo=True)

SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

class Base(DeclarativeBase):
    pass

def init_db():
    from .models import Todo
    Base.metadata.create_all(bind=engine)
