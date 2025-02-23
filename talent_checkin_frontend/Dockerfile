FROM node:18

# WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json .

# Install dependencies
RUN npm install -g @angular/cli && npm install

# Copy all source files
COPY . .

EXPOSE 4200

CMD ["ng", "serve"]