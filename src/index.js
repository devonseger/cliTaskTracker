import inquirer from "inquirer";
import fs from "fs";
import asciiName from "./utils/asciiArt.js";

const prompt = inquirer.createPromptModule();

const sanitizeFileName = (name) => {
  // Replace illegal characters with underscores and trim whitespace
  return name.replace(/[^a-z0-9]/gi, '_').trim();
};

const getUserFilePath = (name) => {
  const sanitizedFileName = sanitizeFileName(name);
  return `./data/${sanitizedFileName}tasks.json`;
};

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
    validate: (input) => {
      if (!input.trim()) {
        return "Name cannot be empty. Please enter a valid name.";
      }
      return true;
    },
  },
];

const mainMenu = async (userData) => {
  try {
    const asciiArt = await asciiName(userData.user.name);
    console.log(asciiArt);
    const choices = [
      "List Tasks",
      "Add Task",
      "Remove Task",
      "Edit Task",
      "Complete Task",
      "Exit",
    ];

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices,
      },
    ]);

    switch (action) {
      case "List Tasks":
        await listTasks(userData);
        console.clear();
        break;
      case "Add Task":
        await addTask(userData);
        console.clear();
        break;
      case "Remove Task":
        await removeTask(userData);
        console.clear();
        break;
      case "Edit Task":
        await editTask(userData);
        console.clear();
        break;
      case "Complete Task":
        await completeTask(userData);
        console.clear();
        break;
      case "Exit":
        console.log("Goodbye!");
        return;
    }

    mainMenu(userData); // Return to the main menu after each action
  } catch (error) {
    if (error instanceof inquirer.errors.ExitPromptError) {
      console.log("Prompt was closed. Exiting the program.");
      process.exit(0); // Exit the program gracefully
    } else {
      console.error("An unexpected error occurred:", error);
      process.exit(1); // Exit with a failure code
    }
  }
};

const listTasks = async (userData) => {
  const asciiArt = await asciiName(userData.user.name);
  console.clear();
  console.log(asciiArt);
  console.log("-------------------------");

  if (userData.tasks.length === 0) {
    console.log("You have no tasks.");
  } else {
    userData.tasks.forEach((task, index) => {
      const status = task.completed ? "[X]" : "[ ]";
      console.log(
        `${index + 1}. ${status} ${task.title} - ${task.description}`
      );
    });
  }

  // Ask the user to press Enter to return to the main menu
  await inquirer.prompt([
    {
      type: "input",
      name: "exit",
      message: "Press Enter to return to the main menu.",
    },
  ]);
};

const addTask = async (userData) => {
  const { title, description } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the task title:",
    },
    {
      type: "input",
      name: "description",
      message: "Enter the task description:",
    },
  ]);

  userData.tasks.push({ title, description, completed: false });
  saveUserData(userData);
  console.log(`Task "${title}" added successfully!`);
};

const removeTask = async (userData) => {
  const { taskIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "taskIndex",
      message: "Which task would you like to delete?",
      choices: userData.tasks.map((task, index) => ({
        name: task.title,
        value: index,
      })),
    },
  ]);

  const deletedTask = userData.tasks.splice(taskIndex, 1)[0];
  saveUserData(userData);
  console.log(`Task "${deletedTask.title}" has been removed.`);
};

const editTask = async (userData) => {
  const { taskIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "taskIndex",
      message: "Which task would you like to edit?",
      choices: userData.tasks.map((task, index) => ({
        name: task.title,
        value: index,
      })),
    },
  ]);

  const { newTitle, newDescription } = await inquirer.prompt([
    {
      type: "input",
      name: "newTitle",
      message: "Enter the new task title:",
      default: userData.tasks[taskIndex].title,
    },
    {
      type: "input",
      name: "newDescription",
      message: "Enter the new task description:",
      default: userData.tasks[taskIndex].description,
    },
  ]);

  userData.tasks[taskIndex].title = newTitle;
  userData.tasks[taskIndex].description = newDescription;
  saveUserData(userData);
  console.log(`Task "${newTitle}" updated successfully!`);
};

const completeTask = async (userData) => {
  const { taskIndex } = await inquirer.prompt([
    {
      type: "list",
      name: "taskIndex",
      message: "Which task would you like to mark as completed?",
      choices: userData.tasks.map((task, index) => ({
        name: task.title,
        value: index,
      })),
    },
  ]);

  userData.tasks[taskIndex].completed = true;
  saveUserData(userData);
  console.log(`Task "${userData.tasks[taskIndex].title}" marked as completed!`);
};

const saveUserData = (userData) => {
  const filePath = getUserFilePath(userData.user.name);
  fs.writeFileSync(filePath, JSON.stringify(userData, null, 2));
};

prompt(questions).then(async (answers) => {
  const { name } = answers;
  const sanitizedFileName = sanitizeFileName(name);
  const filePath = getUserFilePath(sanitizedFileName);

  let userData;

  if (fs.existsSync(filePath)) {
    try {
      userData = JSON.parse(fs.readFileSync(filePath));
      if (!userData.tasks) {
        userData.tasks = [];
      }
    } catch (error) {
      console.error("Error reading user data:", error);
      userData = {
        user: { name: sanitizedFileName },
        tasks: [],
      };
    }
  } else {
    userData = {
      user: { name: sanitizedFileName },
      tasks: [],
    };
    saveUserData(userData);
  }

  await mainMenu(userData);
});
