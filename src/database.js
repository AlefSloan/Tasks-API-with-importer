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

  update(table, id, data) {
    const task = this.#database[table].findIndex((item) => {
      return item.id === id;
    });

    if (task > -1) {
      Object.assign(this.#database[table][task], {
        ...data,
        updated_at: new Date(),
      });
      
      this.#persist();
    }
  }

  delete(table, id) {
    const task = this.#database[table].findIndex(item => {
      return item.id === id
    })

    if (task > -1) {
      this.#database[table].splice(task, 1)
      this.#persist()
    }
  }

  complete_task(table, id) {
    const task = this.#database[table].findIndex(item => {
      return item.id === id
    })

    if (task > -1 && this.#database[table][task].completed_at === null) {
      Object.assign(this.#database[table][task], {
        completed_at: new Date(),
        updated_at: new Date(),
      });
    } else if (task > -1 && this.#database[table][task].completed_at !== null) {
      Object.assign(this.#database[table][task], {
        completed_at: null,
        updated_at: new Date(),
      });
    }

    this.#persist();
  }
}