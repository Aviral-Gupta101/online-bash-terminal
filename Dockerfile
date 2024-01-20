FROM node:21-bullseye

# Set the working directory
WORKDIR /app

# Copy the entire content to /app
COPY . /app

RUN apt-get update && \
    apt-get install -y \
    build-essential \
    python

# Set the working directory to /app/Server
WORKDIR /app/Server

# Run npm install inside /app/Server
RUN npm install

# Print the current working directory and list the files
RUN echo $(pwd; ls)

# Expose port 3000
EXPOSE 3000

# Set the command to run your application
CMD ["node", "/app/Server/index.js"]
