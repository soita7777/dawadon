import pool from '../db.js'

export async function initializeDatabase() {
  try {
    // Check if inventory table exists
    const result = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'inventory')`
    )
    
    if (!result.rows[0].exists) {
      // Create inventory table
      await pool.query(`
        CREATE TABLE IF NOT EXISTS inventory (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          quantity INTEGER NOT NULL DEFAULT 0,
          unit_price DECIMAL(10, 2) NOT NULL,
          sku VARCHAR(100) UNIQUE NOT NULL,
          category VARCHAR(100),
          expiry_date DATE,
          batch_number VARCHAR(100),
          manufacturer VARCHAR(255),
          storage_location VARCHAR(100),
          status VARCHAR(50) DEFAULT 'in_stock',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `)
      console.log('✓ Inventory table created')
    }
  } catch (err) {
    console.error('Database initialization error:', err.message)
  }
}

// Inventory CRUD operations

export async function getAllInventory() {
  try {
    const result = await pool.query('SELECT * FROM inventory ORDER BY created_at DESC')
    return result.rows
  } catch (err) {
    throw new Error(`Failed to fetch inventory: ${err.message}`)
  }
}

export async function getInventoryById(id) {
  try {
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [id])
    return result.rows[0] || null
  } catch (err) {
    throw new Error(`Failed to fetch inventory item: ${err.message}`)
  }
}

export async function createInventoryItem(item) {
  try {
    const {
      name,
      description,
      quantity,
      unit_price,
      sku,
      category,
      expiry_date,
      batch_number,
      manufacturer,
      storage_location,
    } = item

    const result = await pool.query(
      `INSERT INTO inventory 
       (name, description, quantity, unit_price, sku, category, expiry_date, batch_number, manufacturer, storage_location) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        name,
        description,
        quantity,
        unit_price,
        sku,
        category,
        expiry_date,
        batch_number,
        manufacturer,
        storage_location,
      ]
    )
    return result.rows[0]
  } catch (err) {
    throw new Error(`Failed to create inventory item: ${err.message}`)
  }
}

export async function updateInventoryItem(id, updates) {
  try {
    const fields = []
    const values = []
    let paramCount = 1

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`)
        values.push(value)
        paramCount++
      }
    })

    fields.push(`updated_at = $${paramCount}`)
    values.push(new Date())

    const query = `UPDATE inventory SET ${fields.join(', ')} WHERE id = $${paramCount + 1} RETURNING *`
    values.push(id)

    const result = await pool.query(query, values)
    return result.rows[0] || null
  } catch (err) {
    throw new Error(`Failed to update inventory item: ${err.message}`)
  }
}

export async function deleteInventoryItem(id) {
  try {
    const result = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *', [id])
    return result.rows[0] || null
  } catch (err) {
    throw new Error(`Failed to delete inventory item: ${err.message}`)
  }
}

export async function searchInventory(query) {
  try {
    const searchTerm = `%${query}%`
    const result = await pool.query(
      `SELECT * FROM inventory 
       WHERE name ILIKE $1 OR sku ILIKE $1 OR category ILIKE $1 
       ORDER BY created_at DESC`,
      [searchTerm]
    )
    return result.rows
  } catch (err) {
    throw new Error(`Failed to search inventory: ${err.message}`)
  }
}
