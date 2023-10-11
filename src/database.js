import fs from "node:fs/promises";

const databasePath = new URL('db/db.json', import.meta.url);

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then(data => {
        this.#database = JSON.parse(data);
      }).catch(() => {
        this.#persist();
      });
  }

  #persist() {
    return fs.writeFile(databasePath, JSON.stringify(this.#database))
  }
  
  select() {
    
  }

  insert() {

  }

  update() {

  }

  delete() {

  }

  complete_task() {

  }

}