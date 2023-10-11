export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      res.end('This is a GET Route');
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      res.end('This is a POST Route');
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