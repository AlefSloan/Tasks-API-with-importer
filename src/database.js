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
  
  select(table) {
    const data = this.#database[table] ?? []
    
    return data;
  }

  insert(table, data) {   
    if (this.#database[table]) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist();
  }

  update() {

  }

  delete(table, id) {
    const task = this.#database[table].findIndex(item => {
      return item.id === id
    })

    console.log(task);

    if (task > -1) {
      this.#database[table].splice(task, 1)
      this.#persist()
    }
  }

  complete_task() {

  }

}