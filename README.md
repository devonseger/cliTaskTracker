
# CLI Task Tracker

A simple Command Line Interface (CLI) application for tracking tasks. This app allows users to manage tasks by creating, listing, completing, and deleting them. The app is built using Node.js and Inquirer.js for user interaction.

## Features

- **Create Task:** Add new tasks to your task list.
- **List Tasks:** View all pending and completed tasks.
- **Complete Task:** Mark tasks as completed.
- **Delete Task:** Remove tasks from your task list.

## Installation

To get started with the CLI Task Tracker, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/devonseger/cliTaskTracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd cliTaskTracker
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

## Usage

Once you've installed the dependencies, you can start using the CLI Task Tracker by running the following command:

```bash
node index.js
```

The application will prompt you to perform various actions such as logging in, creating tasks, listing tasks, completing tasks, and deleting tasks.

### Commands Overview

- **Login:** Enter your name to begin the session.
- **Create Task:** Add a new task by providing a task description.
- **List Tasks:** View all tasks, including pending and completed ones.
- **Complete Task:** Select a task to mark it as completed.
- **Delete Task:** Select a task to remove it from the list.

## Project Structure

```bash
.
├── index.js            # Entry point of the application
├── package.json        # Project metadata and dependencies
├── tasks.json          # JSON file to store tasks (generated after first run)
└── README.md           # Project documentation
```

## Dependencies

- **Inquirer.js:** Used for interactive CLI prompts.
- **fs (File System):** Used to read and write tasks to the `tasks.json` file.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Any contributions, whether they are bug fixes, feature enhancements, or documentation improvements, are welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- This project was inspired by the need for a simple and efficient task management tool directly from the command line.
