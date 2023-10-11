import { randomUUID } from "node:crypto";

import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      const tasks = database.select('tasks');
      
      console.log(tasks);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      const { title, description } = req.body
      
      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
      
      database.insert('tasks', newTask);
      
      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => {
      res.end('This is a PUT Route');
    },
  },
  {
    method: 'PATCH',
    path: '/tasks/:id',
    handler: (req, res) => {
      res.end('This is a PATCH Route');
    },
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      res.end('This is a DELETE Route');
    },
  },
];