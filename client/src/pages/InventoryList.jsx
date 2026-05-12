import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Inventory.css'

function InventoryList() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/inventory')
      const data = await response.json()
      setItems(data.data || [])
      setError(null)
    } catch (err) {
      setError('Failed to fetch inventory')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await fetch(`http://localhost:5000/api/inventory/${id}`, {
          method: 'DELETE'
        })
        fetchInventory()
      } catch (err) {
        setError('Failed to delete item')
      }
    }
  }

  if (loading) return <div className="loading">Loading inventory...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <div>
          <h1>📦 Inventory Management</h1>
          <p className="inventory-count">Total Items: {items.length}</p>
        </div>
        <button 
          className="btn-add-new"
          onClick={() => navigate('/inventory/add')}
        >
          ➕ Add New Item
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or SKU..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <p>No inventory items found</p>
          <button 
            className="link-btn"
            onClick={() => navigate('/inventory/add')}
          >
            Create First Item
          </button>
        </div>
      ) : (
        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Category</th>
                <th>Manufacturer</th>
                <th>Expiry Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="sku">{item.sku}</td>
                  <td className={`quantity ${item.quantity < 10 ? 'low' : ''}`}>
                    {item.quantity}
                  </td>
                  <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                  <td>{item.category || '-'}</td>
                  <td>{item.manufacturer || '-'}</td>
                  <td>{item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : '-'}</td>
                  <td className="actions">
                    <button className="btn-edit">Edit</button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default InventoryList
