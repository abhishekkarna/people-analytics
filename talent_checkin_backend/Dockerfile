FROM node:18

# WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json .

# Copy all source files
COPY . .

# Install dependencies
RUN npm install


EXPOSE 5000

CMD ["npm", "run", "dev"]
