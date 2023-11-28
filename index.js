import readlineSync from "readline-sync";
import fs from "fs";
import { execSync } from "child_process";

const filePath = "dataFile.txt";

const readFromFile = ()=>{

    try {
      let data = fs
        .readFileSync(filePath, "utf-8")
        .split("\n")
        .filter((data) => data != "");
      console.log(
        "\n----------------Java Locations provided below---------------\n"
      );
      data.forEach((value, index) => {
        console.log(`${index + 1}.${value}`);
      });

      return data;
    } catch {
      console.log("You may need to add java location before changing");
      return;
    }
}

const writeFile = ()=>{
    let userInput = readlineSync.question("Enter the location:");

    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, userInput + "\n");
    } else {
      fs.writeFileSync(filePath, userInput + "\n");
    }  
}

const changeLocation = () => {
  let data = readFromFile();

  if (data) {
    let userSelection = readlineSync.question("Select Location:");

    const newJavaHome = data[userSelection - 1];

    // Use the 'setx' command to set the new JAVA_HOME value
    try {
      execSync(`setx JAVA_HOME "${newJavaHome}"`);
      console.log("JAVA_HOME has been updated.");
    } catch (error) {
      console.error("Error updating JAVA_HOME:", error.message);
    }
  } else {
    console.log("Exiting.......");
    return;
  }
};

const mainFunction = ()=>{
    console.log("----------Menu-----------\n 1.Add New JAVA_HOME Location \n 2.Change JAVA_HOME Location \n 3.Exit");
    let userSelection = readlineSync.question("Select Option:");
    
    switch (userSelection) {
        case '1':
            writeFile();
            break;
    
        case '2':
            changeLocation();
            break;
    
        case '3':
            break;
    
        default:
            console.log("\nInvalid User Selection \nExiting.........");
            break;
    }
}

mainFunction();