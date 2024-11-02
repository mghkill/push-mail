FROM python:3.9-slim

# Atualize o sistema operacional e instale dependências necessárias
RUN apt update && apt -yq upgrade && apt install -yq \
    build-essential \
    libpq-dev \
    openssl \
    tesseract-ocr \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

ENV TZ="America/Sao_Paulo"

WORKDIR /api

COPY requirements.txt .

# COPY .env .env

# ENV $(cat .env | tr '\n' ' ')

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

COPY run.py .

EXPOSE 5000

CMD ["python", "run.py"]