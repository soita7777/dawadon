# Pharmaceutical Management System - Inventory Module

## Overview

The inventory module provides full CRUD capabilities for managing pharmaceutical inventory, including products, stock levels, pricing, and expiry tracking.

## Backend API Endpoints

### Base URL
```
http://localhost:5000/api/inventory
```

### Endpoints

#### 1. Get All Inventory Items
```bash
GET /api/inventory
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Aspirin 500mg",
      "description": "Pain reliever",
      "quantity": 100,
      "unit_price": "5.99",
      "sku": "ASP-500-001",
      "category": "Analgesics",
      "expiry_date": "2025-12-31",
      "batch_number": "BATCH123",
      "manufacturer": "Pharma Corp",
      "storage_location": "Shelf A1",
      "status": "in_stock",
      "created_at": "2024-05-12T10:30:00Z",
      "updated_at": "2024-05-12T10:30:00Z"
    }
  ],
  "count": 1
}
```

---

#### 2. Get Inventory Item by ID
```bash
GET /api/inventory/:id
```

**Example:**
```bash
GET /api/inventory/1
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

---

#### 3. Create New Inventory Item
```bash
POST /api/inventory
Content-Type: application/json
```

**Required Fields:**
- `name` - Product name
- `sku` - Stock keeping unit (must be unique)
- `quantity` - Current quantity
- `unit_price` - Price per unit

**Optional Fields:**
- `description` - Product description
- `category` - Product category
- `expiry_date` - Expiration date (YYYY-MM-DD)
- `batch_number` - Batch/lot number
- `manufacturer` - Manufacturer name
- `storage_location` - Storage location

**Example Request:**
```json
{
  "name": "Vitamin C 1000mg",
  "sku": "VIT-C-1000",
  "quantity": 500,
  "unit_price": "3.50",
  "category": "Vitamins",
  "manufacturer": "HealthCorp",
  "expiry_date": "2026-06-30"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Item created successfully"
}
```

---

#### 4. Update Inventory Item
```bash
PUT /api/inventory/:id
Content-Type: application/json
```

**Example:**
```bash
PUT /api/inventory/1
```

**Request Body (any fields):**
```json
{
  "quantity": 450,
  "unit_price": "3.75"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Item updated successfully"
}
```

---

#### 5. Delete Inventory Item
```bash
DELETE /api/inventory/:id
```

**Example:**
```bash
DELETE /api/inventory/1
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Item deleted successfully"
}
```

---

## Frontend Features

### Inventory List Page (`/inventory`)
- **Display**: Table view of all inventory items
- **Search**: Filter by product name or SKU
- **Count**: Shows total number of items
- **Actions**:
  - Edit button (placeholder for edit functionality)
  - Delete button with confirmation
- **Low Stock Alert**: Quantities < 10 highlighted in red

### Add Inventory Page (`/inventory/add`)
- **Form Fields**:
  - Product Name (required)
  - SKU (required)
  - Quantity (required)
  - Unit Price (required)
  - Category
  - Manufacturer
  - Expiry Date
  - Batch Number
  - Storage Location
  - Description (textarea)
- **Validation**: Required fields must be filled
- **Navigation**: Cancel button returns to inventory list

---

## Database Schema

```sql
CREATE TABLE inventory (
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
);
```

---

## Usage Examples

### Using cURL

#### Create an item:
```bash
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ibuprofen 200mg",
    "sku": "IBU-200-001",
    "quantity": 200,
    "unit_price": "2.99",
    "category": "Analgesics",
    "manufacturer": "MediCare"
  }'
```

#### Get all items:
```bash
curl http://localhost:5000/api/inventory
```

#### Update an item:
```bash
curl -X PUT http://localhost:5000/api/inventory/1 \
  -H "Content-Type: application/json" \
  -d '{ "quantity": 150 }'
```

#### Delete an item:
```bash
curl -X DELETE http://localhost:5000/api/inventory/1
```

---

## Error Handling

All errors return appropriate HTTP status codes:

- `400` - Bad request (validation error)
- `404` - Item not found
- `500` - Server error

**Error Response Format:**
```json
{
  "success": false,
  "error": "Description of error"
}
```

---

## Next Steps

1. **Database Setup**: Configure PostgreSQL connection in `.env` file
2. **Edit Functionality**: Implement inventory item editing
3. **Advanced Search**: Add filters by category, status, expiry date
4. **Reporting**: Generate inventory reports
5. **Audit Trail**: Track inventory changes
6. **Multi-location Support**: Manage multiple warehouse/storage locations

---

## Environment Variables

Create a `.env` file in the `server` directory:

```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/pharma_db
JWT_SECRET=your_secret_key_here
```

---

## Testing the API

You can test the API using:
- **Postman** - Import the endpoints manually
- **cURL** - Command line tool
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

