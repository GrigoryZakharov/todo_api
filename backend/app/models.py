from .database import Base
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import String, Boolean

class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key = True)
    title: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(), nullable = True)
    completed: Mapped[bool] = mapped_column(Boolean, default = False)