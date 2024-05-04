import { db } from "../db.js";

export const getProducts = (_, res) => {
  const q = "SELECT * FROM products";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProducts = (req, res) => {
  const q =
    "INSERT INTO products(`name`, `description`, `price`, `quantity`) VALUES(?)";

  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Product added successfully.");
  });
};

export const updateProducts = (req, res) => {
  const q =
    "UPDATE products SET `name` = ?, `description` = ?, `price` = ?, `quantity` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.description,
    req.body.price,
    req.body.quantity,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Product update successfully.");
  });
};

export const deleteProducts = (req, res) => {
  const q = "DELETE FROM products WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Product delete successfully.");
  });
};
