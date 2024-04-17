#! /usr/bin/env node


import inquirer from "inquirer"
import chalk from "chalk";

let todoList : string [] = [];
let conditions = true;

console.log(chalk.magenta.bold("\n \t Welcome to Noman - Todo-List Application\n"));

let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do",
                choices: ["Add Task","Delete Task", "Update Task","View Todo-List","Exit"],
            }
        ]);
    
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await deleteTask()
        }
        else if(option.choice === "Update Task"){
            await updateTask()
        }
        else if(option.choice === "View Todo-List"){
            await ViewTask()
        }
        else if(option.choice === "Exit"){
            conditions = false;
        }
    }
}

let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new task:"
    }
]);

todoList.push(newTask.task);
console.log(`\n ${newTask.task} task added Successfully in Todo-List`);

}

let ViewTask = () => {
    console.log(chalk.bgBlue.bold("\n Your Todo-List: \n"));
    todoList.forEach((task,index) => {
        console.log(`${index+1}: ${task}`)
    });

}

let deleteTask = async () => {
    await ViewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'index no' of the task you want to delete :",
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1 ,1);
    console.log(`\n ${deleteTask} This task has been successfully deleted from your Todo-List`)
}

let updateTask = async () => {
    await ViewTask()
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the 'Index no' of the task you want to update:"
        },
        {
            name: "new_task",
            type: "input",
            message: "Now Enter new task name:",
        }
    ]);
    todoList[update_task_index.index-1] = update_task_index.new_task
    console.log(`\n Task at Index no. ${update_task_index.index} updated successufully [For Updated list check option: "View Todo-List"]`)

}

main();
