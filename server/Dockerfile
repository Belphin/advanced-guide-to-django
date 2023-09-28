FROM python:3.10.8-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY pyproject.toml poetry.lock /

RUN pip install poetry
RUN poetry config virtualenvs.create false && poetry install