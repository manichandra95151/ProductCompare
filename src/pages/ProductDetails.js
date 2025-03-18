import React, { useState, useEffect } from 'react';
import { Table, Image, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const ProductDetails = ({ compareProducts, addToCompare }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCompare = (product) => {
    if (compareProducts.length >= 4) {
      message.warning('You can compare maximum 4 products at a time');
      return;
    }
    
    addToCompare(product);
    message.success('Product added to comparison');
  };

  const isInCompare = (productId) => {
    return compareProducts.some(product => product.id === productId);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail) => <Image src={thumbnail} width={80} height={80} />
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (title, record) => (
        <span className={isInCompare(record.id) ? 'bg-yellow-100 rounded-full px-2 line-clamp-1' : 'line-clamp-1'}>{title}</span>
      )
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      sorter: (a, b) => {
        const brandA = a.brand || '';
        const brandB = b.brand || '';
        return brandA.localeCompare(brandB);
      },
      render: (brand, record) => (
        <span className={`text-blue-800 px-2 py-0.5 rounded-full text-sm line-clamp-1 ${isInCompare(record.id) ? 'bg-yellow-100' : ''}`}>{brand?brand :"Unknown"}</span>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      render: (category, record) => (
        <span className={`text-green-800 px-2 py-0.5 rounded-full text-sm ${isInCompare(record.id) ? 'bg-yellow-100' : ''}`}>{category}</span>
      )
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price, record) => (
        <span className={isInCompare(record.id) ? 'bg-yellow-100 rounded-full px-2' : ''}>${price}</span>
      )
    },
    {
      title: 'Discount (%)',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (discount, record) => (
        <span className={`text-red-800 px-2 py-0.5 rounded-full text-sm ${isInCompare(record.id) ? 'bg-yellow-100' : ''}`}>{discount}%</span>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (description, record) => (
        <span className={isInCompare(record.id) ? 'bg-yellow-100 rounded-full px-2' : ''}>{description}</span>
      )
    },
    {
      title: 'Compare',
      key: 'action',
      render: (_, record) => (
        <button 
          className={`px-4 py-2 rounded text-white ${isInCompare(record.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          onClick={() => handleCompare(record)}
          disabled={isInCompare(record.id)}
        >
          {isInCompare(record.id) ? 'Added' : 'Compare'}
        </button>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <div className="mb-4">
        {compareProducts.length > 0 && (
          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            onClick={() => navigate('/compare')}
          >
            Compare Selected Products ({compareProducts.length})
          </button>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Table 
          dataSource={products} 
          columns={columns} 
          rowKey="id"
          pagination={{
            pageSize: 10,
            position: ['bottomCenter']
          }}
        />
      )}
    </div>
  );
};

export default ProductDetails; 