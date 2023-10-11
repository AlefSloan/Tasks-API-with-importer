export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      res.end();
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      res.end();
    },
  },
  {
    method: 'PUT',
    path: '/tasks/:id',
    handler: (req, res) => {
      res.end();
    },
  },
  {
    method: 'PATCH',
    path: '/tasks/:id',
    handler: (req, res) => {
      res.end();
    },
  },
  {
    method: 'DELETE',
    path: '/tasks/:id',
    handler: (req, res) => {
      res.end();
    },
  },
];