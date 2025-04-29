import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
function AdminService() {
  const [pageStatus, setPageStatus] = useState("loading");
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    duration: ''
  });

  useEffect(() => {
    if (pageStatus === "loading") {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/service/")
        .then((res) => {
          setServices(res.data);
          setPageStatus("loaded");
        })
        .catch((err) => toast.error("Error loading services"));
    }
  }, [pageStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editingService ? 
      `${import.meta.env.VITE_BACKEND_URL}/api/service/${editingService.id}` :
      `${import.meta.env.VITE_BACKEND_URL}/api/service/`;

    const method = editingService ? 'put' : 'post';

    axios[method](url, newService)
      .then(() => {
        toast.success(`Service ${editingService ? 'updated' : 'added'} successfully`);
        setPageStatus("loading");
        setShowForm(false);
        setEditingService(null);
        setNewService({ name: '', price: '', duration: '' });
      })
      .catch(err => toast.error(`Error ${editingService ? 'updating' : 'adding'} service`));
  };

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/service/${id}`)
      .then(() => {
        toast.success("Service deleted successfully");
        setPageStatus("loading");
      })
      .catch(err => toast.error("Error deleting service"));
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
    <div className='max-w-7xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Manage Services</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className='flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors'
        >
          <FiPlus className='mr-2' />
          {editingService ? 'Editing Service' : 'Add New Service'}
        </button>
      </div>

      {showForm && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <form onSubmit={handleSubmit} className='bg-white p-6 rounded-xl w-full max-w-md shadow-xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-semibold'>
                {editingService ? 'Edit Service' : 'New Service'}
              </h2>
              <button
                type='button'
                onClick={() => {
                  setShowForm(false);
                  setEditingService(null);
                  setNewService({ name: '', price: '', duration: '' });
                }}
                className='text-gray-500 hover:text-gray-700'
              >
                <FiX size={24} />
              </button>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700'>Service Name</label>
                <input
                  type='text'
                  name='name'
                  value={newService.name}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter service name'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700'>Price ($)</label>
                <input
                  type='number'
                  name='price'
                  value={newService.price}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter price'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1 text-gray-700'>Duration</label>
                <input
                  type='text'
                  name='duration'
                  value={newService.duration}
                  onChange={handleInputChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Enter duration (e.g., 30 mins)'
                  required
                />
              </div>
              <div className='flex justify-end space-x-3 pt-4'>
                <button
                  type='button'
                  onClick={() => {
                    setShowForm(false);
                    setEditingService(null);
                    setNewService({ name: '', price: '', duration: '' });
                  }}
                  className='px-5 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors'
                >
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {services.map(service => (
          <div key={service.id} className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
            <div className='flex justify-between items-start mb-3'>
              <h3 className='text-xl font-semibold text-gray-800'>{service.name}</h3>
              <div className='flex space-x-2'>
                <button
                  onClick={() => handleDelete(service.id)}
                  className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                  title='Delete'
                >
                  <FiTrash2 size={18} />
                </button>
                <button
                  onClick={() => {
                    setEditingService(service);
                    setNewService({
                      name: service.name,
                      price: service.price,
                      duration: service.duration
                    });
                    setShowForm(true);
                  }}
                  className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors'
                  title='Edit'
                >
                  <FiEdit size={18} />
                </button>
              </div>
            </div>
            
            <div className='space-y-2 text-gray-600'>
              <div className='flex items-center'>
                <span className='w-24 font-medium'>Price:</span>
                <span>${service.price}</span>
              </div>
              <div className='flex items-center'>
                <span className='w-24 font-medium'>Duration:</span>
                <span>{service.duration}</span>
              </div>
              {service.description && (
                <div className='flex items-start'>
                  <span className='w-24 font-medium'>Description:</span>
                  <span className='flex-1'>{service.description}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}

export default AdminService;