// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input


const questions = [
    //name
    {
      type: 'input',
      name: 'name',
      message: '(required) What is your name?',
      validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
      }
    },
    //github
    {
      type: 'input',
      name: 'github',
      message: '(required) What is your GitHub username?',
      validate: usernameInput => {
          if (usernameInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username!');
            return false;
          }
      }
    },
    //email
    {
      type: 'input',
      name: 'email',
      message: '(required) What is your email?',
      validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your email!');
            return false;
          }
      }
    },
    //projectTitle
    {
      type: 'input',
      name: 'projectTitle',
      message: '(required) What is your project title:',
      validate: projectTitleInput => {
          if (projectTitleInput) {
            return true;
          } else {
            console.log('Please enter your projects title!');
            return false;
          }
      }
    },
    //projectDescription
    {
      type: 'input',
      name: 'projectDescription',
      message: '(required) Provide a description of your app:',
      validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('Please enter a description for your project!');
            return false;
          }
      }
    },

    //projectLicense
    {
      type: 'list',
      name: 'projectLicense',
      message: 'What license is this project made under? Select one (default is none):',
      choices: ['Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense', 'none'],
      default: 'defaultLicense'
    },
]

  // TODO: Create a function to write README file
  function writeToFile(fileName, data) {
      fs.writeFile(fileName, data, err => {
        if(err) throw err;
        console.log(' Your README.md file is complete.');
      });
  }
  
  // TODO: Create a function to initialize app
  // The init function prompts the user a series of questions stored in the array 'questions'
  function init() {
      return inquirer.prompt(questions);
  }
  
  // Function call to initialize app
  init()
  // The inquirer.prompt method returns a Promise which we handle by way of the .then method
  .then(userAnswers => {
      // use the generateMarkdown function to take the user responses and create the README.md sections etc
      return generateMarkdown(userAnswers);
  })

  .then(markdownContent => {
    writeToFile('./utils/readme.md', markdownContent);
  })
  
  .catch(err => {
      console.log('The error is: ', err);
  });
