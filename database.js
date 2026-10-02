const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(__dirname, 'db.json');

async function readData() {
  try {
    const data = await fs.readFile(pathToFile, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database:', err);
    return [];
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(pathToFile, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to database:', err);
  }
}

module.exports = { readData, writeData };