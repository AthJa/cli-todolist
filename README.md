# CLI To-Do List App

A simple command-line to-do list application for managing tasks efficiently.

## Features
- Add new tasks
- Update task descriptions
- Delete tasks
- Mark tasks as in-progress
- Mark tasks as done
- List tasks by status

## Installation
Ensure you have [Node.js](https://nodejs.org/) installed.

1. Clone this repository:
   ```sh
   git clone https://github.com/yourusername/cli-todolist.git
   cd cli-todolist
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Usage
Run the following commands to manage your tasks:

### Add a Task
```sh
node index.js add "Task description"
```

### Update a Task
```sh
node index.js update <id> "Updated description"
```

### Delete a Task
```sh
node index.js delete <id>
```

### Mark Task as In-Progress
```sh
node index.js mark-in-progress <id>
```

### Mark Task as Done
```sh
node index.js mark-done <id>
```

### List Tasks by Status
```sh
node index.js list <status>
```
> `<status>` can be `todo`, `in-progress`, or `done`.
> leave empty to list all tasks.

## Contributing
Feel free to open issues and submit pull requests to improve this project.
