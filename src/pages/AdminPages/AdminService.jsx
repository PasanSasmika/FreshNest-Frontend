import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import uploadMediaToSupabase from '../../Utils/Media';

function AdminService() {
  const navigate = useNavigate();
  const [pageStatus, setPageStatus] = useState("loading");
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    Images: []
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    
    try {
      let imgUrls = [];
      if (imageFiles.length > 0) {
        const promiseArray = Array.from(imageFiles).map(file => uploadMediaToSupabase(file));
        imgUrls = await Promise.all(promiseArray);
      }

      // Validate images for new services
      if (!editingService && imgUrls.length === 0) {
        toast.error('Please upload at least one image');
        return;
      }

      const data = { 
        ...formData,
        Images: editingService 
          ? [...editingService.Images, ...imgUrls]
          : imgUrls
      };

      if (editingService) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/service/${editingService._id}`, 
          data, 
          { headers }
        );
        toast.success('Service updated successfully!');
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/service/`, 
          data, 
          { headers }
        );
        toast.success('Service added successfully!');
      }

      setPageStatus("loading");
      setShowForm(false);
      setEditingService(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        duration: "",
        Images: []
      });
      setImageFiles([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed!');
    }
  }

  async function handleDelete(id) {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/service/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Service deleted successfully!');
      setPageStatus("loading");
    } catch (error) {
      toast.error('Failed to delete service!');
    }
  }

  useEffect(() => {
    if (pageStatus === "loading") {
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/service/`)
        .then((res) => {
          setServices(res.data);
          setPageStatus("loaded");
        })
        .catch((err) => toast.error("Error loading services"));
    }
  }, [pageStatus]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      Images: service.Images
    });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      Images: []
    });
    setImageFiles([]);
  };

  return (
    <div className='min-h-screen bg-gray-50 p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>Manage Services</h1>
          <button 
            onClick={() => setShowForm(true)}
            className='flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors'
          >
            <FiPlus className='mr-2' />
            Add New Service
          </button>
        </div>

        {showForm && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-xl w-full max-w-md shadow-xl'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>
                  {editingService ? 'Edit Service' : 'New Service'}
                </h2>
                <button onClick={handleCloseForm} className='text-gray-500 hover:text-gray-700'>
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>
                      Service Name
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>
                      Images {!editingService && '(Required)'}
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setImageFiles(e.target.files)}
                      className="w-full p-2 border rounded-md"
                      required={!editingService}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload new images to add to existing ones
                    </p>
                  </div>

                  {formData.Images?.length > 0 && (
                    <div>
                      <label className='block text-sm font-medium mb-1 text-gray-700'>
                        Existing Images
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {formData.Images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Service ${index + 1}`}
                            className="w-20 h-20 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>
                      Price
                    </label>
                    <input
                      type='number'
                      name='price'
                      value={formData.price}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>
                      Duration
                    </label>
                    <input
                      type='text'
                      name='duration'
                      value={formData.duration}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500'
                      placeholder='e.g., 30 mins'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium mb-1 text-gray-700'>
                      Description
                    </label>
                    <textarea
                      name='description'
                      value={formData.description}
                      onChange={handleInputChange}
                      className='w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500'
                      rows={3}
                    />
                  </div>

                  <div className='flex justify-end space-x-3 pt-4'>
                    <button
                      type='button'
                      onClick={handleCloseForm}
                      className='px-5 py-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg'
                    >
                      Cancel
                    </button>
                    <button
                      type='submit'
                      className='px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg'
                    >
                      {editingService ? 'Update Service' : 'Add Service'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {services.map(service => (
            <div key={service._id} className='bg-white p-5 rounded-xl shadow-sm hover:shadow-md'>
              <div className='flex justify-between items-start mb-3'>
                <h3 className='text-xl font-semibold text-gray-800'>{service.name}</h3>
                <div className='flex space-x-2'>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg'
                  >
                    <FiTrash2 size={18} />
                  </button>
                  <button
                    onClick={() => handleEditClick(service)}
                    className='p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg'
                  >
                    <FiEdit size={18} />
                  </button>
                </div>
              </div>
              
              {service.Images?.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {service.Images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Service ${index + 1}`}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className='space-y-2 text-gray-600'>
                <div className='flex items-center'>
                  <span className='w-24 font-medium'>Price:</span>
                  <span>Rs {service.price}</span>
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