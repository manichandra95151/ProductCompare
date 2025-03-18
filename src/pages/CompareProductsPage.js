import React, { useState } from 'react';
import { Table, Modal, Image } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const CompareProductsPage = ({ compareProducts, removeFromCompare, addToCompare }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = async () => {
    setIsModalVisible(true);
    if (productsList.length === 0) {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/products');
        setProductsList(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isInCompare = (productId) => {
    return compareProducts.some(product => product.id === productId);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => <Image src={thumbnail} width={50} height={50} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <button 
          className={`px-4 py-2 rounded text-white ${isInCompare(record.id) || compareProducts.length >= 4 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isInCompare(record.id) || compareProducts.length >= 4}
          onClick={() => {
            addToCompare(record);
            setIsModalVisible(false);
          }}
        >
          {isInCompare(record.id) ? "Added" : "Add to Compare"}
        </button>
      )
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Compare Products</h2>
        <button 
          className={`flex items-center px-4 py-2 rounded text-white ${compareProducts.length >= 4 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={showModal}
          disabled={compareProducts.length >= 4}
        >
          <PlusOutlined className="mr-2" />
          Add More Products
        </button>
      </div>

      {compareProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="text-gray-400 text-lg mb-4">No products selected for comparison</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {compareProducts.map(product => (
            <div key={product.id} className="border rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div>
                <div className="h-48 overflow-hidden">
                  <img 
                    alt={product.title} 
                    src={product.thumbnail} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{product.title}</h4>
                  <div className="mb-1">
                    <span className="font-medium">Brand: </span> 
                    <span className="text-blue-800 text-sm">{product.brand ? product.brand : "Unknown"}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Category: </span> 
                    <span className="text-green-800 text-sm">{product.category}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Price: </span> 
                    <span>${product.price}</span>
                  </div>
                  <div className="mb-1">
                    <span className="font-medium">Discount: </span> 
                    <span className="text-red-800 text-sm">{product.discountPercentage}%</span>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium">Description: </span> 
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-4 mb-2">
                <button 
                  className="w-fit flex justify-center items-center px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                  onClick={() => removeFromCompare(product.id)}
                >
                  <DeleteOutlined className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal 
        title="Select Products to Compare" 
        open={isModalVisible} 
        onCancel={handleCancel}
        width={1000}
        footer={[
          <button 
            key="back" 
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ]}
      >
        <Table 
          dataSource={productsList} 
          columns={columns} 
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Modal>
    </div>
  );
};

export default CompareProductsPage; 