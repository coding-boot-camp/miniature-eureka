const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};


/**
 *  Function to delete one item from a JSON object array, given the objects's position within the array
 *  @param {string} filepath The path to the JSON file you want to modify.
 *  @param {string} idToDelete The unique id of the note you want to delete.
 *  @returns {void} Nothing
 */
const deleteFromJSON = (filepath, idToDelete) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            
            // turn JSON into JS object for iteration
            const parsedData = JSON.parse(data);
            // When for loop finds the note to delete, its array position will be stored here
            let targetPosition = 0;

            // Iterate over the notes, checking if the note's id matches the id to delete
            for (let i = 0; i < parsedData.length; i++) {
              if (parsedData[i].id === idToDelete) {
                parsedData.splice(i, 1);
                break;
              }
            }
            // Our array now has the note removed, but we need to update the JSON database.
            // Note that writeToFile calls JSON.stringify for us. No need to do it here.
            writeToFile(filepath, parsedData);
        }
    });
}

module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromJSON };
