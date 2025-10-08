FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/ /app/

RUN pip install --no-cache-dir fastapi uvicorn psycopg2-binary sqlalchemy

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]


