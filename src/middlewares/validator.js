export function validator(req, res) {
  const { method } = req;
  const { title, description } = req.body;

  if (method === 'POST' && !(title && description)) {
    return false
  } else if (method === "PUT" && !( title || description )) {
    return false
  }

  return true
}