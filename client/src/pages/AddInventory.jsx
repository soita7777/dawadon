import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/AddInventory.css'

function AddInventory() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    quantity: '',
    unit_price: '',
    category: '',
    manufacturer: '',
    expiry_date: '',
    description: '',
    batch_number: '',
    storage_location: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to create item')

      navigate('/inventory')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="add-inventory-container">
      <div className="form-header">
        <h1>➕ Add New Inventory Item</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU *</label>
            <input
              id="sku"
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
              placeholder="Enter SKU"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              id="quantity"
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="unit_price">Unit Price ($) *</label>
            <input
              id="unit_price"
              type="number"
              name="unit_price"
              value={formData.unit_price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Tablets, Syrup, Injection"
            />
          </div>

          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              id="manufacturer"
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiry_date">Expiry Date</label>
            <input
              id="expiry_date"
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="batch_number">Batch Number</label>
            <input
              id="batch_number"
              type="text"
              name="batch_number"
              value={formData.batch_number}
              onChange={handleChange}
              placeholder="Batch number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="storage_location">Storage Location</label>
            <input
              id="storage_location"
              type="text"
              name="storage_location"
              value={formData.storage_location}
              onChange={handleChange}
              placeholder="e.g., Shelf A1"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={() => navigate('/inventory')}>
            Cancel
          </button>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Item'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddInventory
