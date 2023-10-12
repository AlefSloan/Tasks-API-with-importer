import { randomUUID } from "node:crypto";

import { Database } from "./database.js";
import { buildRoutePath } from "./utils/buildRoutePath.js";
import { validator } from './middlewares/validator.js';

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

      const isValid = validator(req, res);

      if (!isValid) {
        return res.writeHead(400).end('Title and Description required')
      }

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

      const isValid = validator(req, res);

      if (!isValid) {
        return res.writeHead(400).end('Title or Description required');
      }

      const task = database.select('tasks').find((task) => {
        return task.id === id
      })

      if (!task) {
        res.writeHead(404).end('Error - Task not found')
      }
      
      database.update('tasks', id, { ...data });

      res.writeHead(204).end();
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      
      const task = database.select('tasks').find((task) => {
        return task.id === id;
      });

      if (!task) {
        res.writeHead(404).end('Error - Task not found');
      }

      database.complete_task('tasks', id);
      
      res.writeHead(204).end();
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select('tasks').find((task) => {
        return task.id === id;
      });

      if (!task) {
        res.writeHead(404).end('Error - Task not found');
      }

      database.delete('tasks', id);
      
      res.writeHead(204).end();
    },
  },
];