import express from 'express'
import * as inventoryModel from '../models/inventory.js'

const router = express.Router()

// GET all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await inventoryModel.getAllInventory()
    res.json({
      success: true,
      data: items,
      count: items.length,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// GET single inventory item
router.get('/:id', async (req, res) => {
  try {
    const item = await inventoryModel.getInventoryById(req.params.id)
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      })
    }
    res.json({
      success: true,
      data: item,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// POST create new inventory item
router.post('/', async (req, res) => {
  try {
    const item = await inventoryModel.createInventoryItem(req.body)
    res.status(201).json({
      success: true,
      data: item,
      message: 'Item created successfully',
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
})

// PUT update inventory item
router.put('/:id', async (req, res) => {
  try {
    const item = await inventoryModel.updateInventoryItem(req.params.id, req.body)
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      })
    }
    res.json({
      success: true,
      data: item,
      message: 'Item updated successfully',
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    })
  }
})

// DELETE inventory item
router.delete('/:id', async (req, res) => {
  try {
    const item = await inventoryModel.deleteInventoryItem(req.params.id)
    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Item not found',
      })
    }
    res.json({
      success: true,
      data: item,
      message: 'Item deleted successfully',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

// GET search inventory
router.get('/search/:query', async (req, res) => {
  try {
    const items = await inventoryModel.searchInventory(req.params.query)
    res.json({
      success: true,
      data: items,
      count: items.length,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    })
  }
})

export default router
