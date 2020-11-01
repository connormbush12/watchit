#!/usr/bin/env node

//The very very first step would be creating a "watchit" directory using 'mkdir' command in the terminal. Once that directory is created, you would select it using "cd watchit". Finally, you would open the folder by typing "code .". However, we will start with this folder already existing, so this step can be skipped.
//There are five basic steps to running a node file as an executable:
//1. Create package.json - we do this by going to our directory in the terminal and typing "npm init -y"
//2. Then, we go to the newly created package.json file. At the bottom, we create a "bin" key, create an object for it, and then create a key for the executable command we want to use. In this case, we'll make our command "watchit". Finally, we set this key equal to our main file: index.js
//3. Then, we have to change the file permissions for index.js. To do this, type in: chmod +x index.js
//4. Fourth, you have to add the above piece of code (#!/usr/bin/env node) to the top of the file to allow it to be treated as an executable
//5. Finally, we have to "link" our project. Go to the terminal and type in: npm link. This takes our project and makes it available everywhere on our computer (not just our current directory)
// You may have to use the word "sudo" in front of that command to get permission if it returns with errors

console.log('I was executed');
