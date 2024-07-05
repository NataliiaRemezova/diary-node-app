# Piggy-Backlog Diary App

## Description

Welcome to the Piggy-Backlog! This application allows you to keep a personal diary where you can add, view, edit, and delete your diary entries. It is built using Node.js and provides a simple and intuitive interface for managing your diary.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 21)
- npm (version 10.2.0)
- MongoDB (version 7.0)

optional:
- Docker (version 4.24.2)

## Installation

To install Piggy-Backlog, follow these steps:

### 1. Clone the repo:

```bash
git clone https://github.com/NataliiaRemezova/diary-node-app.git
```

### 2. Start the terminal and switch to the Backend Folder

```bash
cd Backend
```

### 3. Install dependencies:

```bash
npm i
```

### 5. Run the Backend

To run Piggy-Backlog, use the following command:

```bash
npm run dev
```

This will start the Backend on http://localhost:5000 by default und MongoDB server on http://localhost:27017

### 6. Start another terminal and switch to the Frontend Folder

```bash
cd Frontend/static-node-app
```

### 7. Install dependencies:

```bash
npm i
```

### 8. Run the Frontend

```bash
npm run dev
```

This will start and build the Frontend using Vite on [http://localhost:5173] by default.

## 5-8. Docker Version

To run Piggy-Backlog in a docker container, use the following command:

```bash
cd diary-node-app
docker compose up
```

## Features

The features of Piggy-Backlog are:

- **User Authentication**: Secure your diary with user authentication.
- **Diary Entries**: Create a new diary entry for each day. You can switch between them via a calendar.
- **Habit Tracker**: Track your daily habits, mark them as completed, and view your progress over time.
- **To-Do List**: Keep track of all the tasks you need to do.

- all these features support CRUD operations

## Troubleshooting

- delete node_modules folder
- delete package-lock.json
- run npm i again
- delete docker containers
- delete docker images

## Contributing

Piggy-Backlog is a university project. Contributions are not provided.

## Authors

This project was created as a project for Agile Web Development course at HTW Berlin, Studiengang Internationale Medieninformatik (International Media and Computer Science).

This project was created by: Nataliia Remezova, Mai Le Phoung, Laura Bärtschi, Matthis Ehrhardt
