FROM node:16-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    libnss3 \
    libxss1 \
    libasound2 \
    libgbm-dev \
    libgtk-3-0 \
    libx11-xcb-dev \
    && npx playwright install --with-deps \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

CMD ["npm", "test"]
