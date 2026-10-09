import { Request, Response } from 'express';
import pool from '../conf/dbConnection';

export class ProductsController {
 async getAll(req: Request, res: Response): Promise<any> {
    try {
      const query = 'SELECT * FROM products WHERE active = TRUE';
      const [rows]: any = await pool.execute(query);
      return res.status(200).json(rows);
    } catch (error: any) {
      console.log("error:", error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async getById(req: Request, res: Response): Promise<any> {
    try {
      const id: any = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'El ID debe ser un entero positivo' });
      }

      const query = 'SELECT * FROM products WHERE id = ? AND active = TRUE';
      const [rows]: any = await pool.execute(query, [id]);
      
      // Regla de la tarea: Responder 200 aunque no exista
      if (rows.length === 0) {
        return res.status(200).json({ message: 'Producto no encontrado o inactivo' });
      }
      return res.status(200).json(rows[0]);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    try {
      const { name, price, stock, description, brand, img }: any = req.body;
      
      const numPrice: any = Number(price);
      if (Number.isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número mayor a 0' });
      }

      const query = 'INSERT INTO products (name, price, stock, description, brand, img, active) VALUES (?, ?, ?, ?, ?, ?, TRUE)';
      await pool.execute(query, [name, numPrice, stock, description, brand || null, img || null]);
      
      return res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const id: any = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'El ID debe ser un entero positivo' });
      }

      const { name, price, stock, description, brand, img }: any = req.body;
      const numPrice: any = Number(price);
      
      if (Number.isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número mayor a 0' });
      }

      const checkQuery = 'SELECT id FROM products WHERE id = ? AND active = TRUE';
      const [check]: any = await pool.execute(checkQuery, [id]);
      
      if (check.length === 0) {
        return res.status(200).json({ message: 'Producto no encontrado o inactivo' });
      }

      const updateQuery = 'UPDATE products SET name = ?, price = ?, stock = ?, description = ?, brand = ?, img = ? WHERE id = ? AND active = TRUE';
      await pool.execute(updateQuery, [name, numPrice, stock, description, brand || null, img || null, id]);
      
      return res.status(200).json({ message: 'Producto actualizado' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async delete(req: Request, res: Response): Promise<any> {
    try {
      const id: any = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'El ID debe ser un entero positivo' });
      }

      const checkQuery = 'SELECT id FROM products WHERE id = ? AND active = TRUE';
      const [check]: any = await pool.execute(checkQuery, [id]);
      
      if (check.length === 0) {
        return res.status(200).json({ message: 'Producto no encontrado o inactivo' });
      }

      const deleteQuery = 'UPDATE products SET active = FALSE WHERE id = ?';
      await pool.execute(deleteQuery, [id]);
      
      return res.status(200).json({ message: 'Producto dado de baja lógicamente' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  async changePrice(req: Request, res: Response): Promise<any> {
    try {
      const id: any = Number(req.params.id);
      if (Number.isNaN(id) || id <= 0) {
        return res.status(400).json({ message: 'El ID debe ser un entero positivo' });
      }

      const { price }: any = req.body;
      const numPrice: any = Number(price);
      
      if (Number.isNaN(numPrice) || numPrice <= 0) {
        return res.status(400).json({ message: 'El precio debe ser un número mayor a 0' });
      }

      const checkQuery = 'SELECT id FROM products WHERE id = ? AND active = TRUE';
      const [check]: any = await pool.execute(checkQuery, [id]);
      
      if (check.length === 0) {
        return res.status(200).json({ message: 'Producto no encontrado o inactivo' });
      }

      const patchQuery = 'UPDATE products SET price = ? WHERE id = ? AND active = TRUE';
      await pool.execute(patchQuery, [numPrice, id]);
      
      return res.status(200).json({ message: 'Precio modificado exitosamente' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}