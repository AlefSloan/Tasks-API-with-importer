import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query;
      
      const isSearchable = search ? { title: search, description: search } : null

      const tasks = database.select('tasks', isSearchable);

      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body;

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert('tasks', newTask);

      return res.writeHead(201).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const data = req.body;

      database.update('tasks', id, { ...data });

      res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      database.complete_task('tasks', id);
      
      res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('tasks', id);
      
      res.writeHead(204).end();
    },
  },
];