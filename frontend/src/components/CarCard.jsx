// src/components/CarCard.jsx
// import React from 'react';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;  // For Vite

const CarCard = ({title,description,id,images}) => {
    return (
        <div className='card bg-base-100 shadow-md'>
            <figure>
                {images && images[0] && (
                    <img src={`${apiUrl}/${images[0].replace(/\\/g, '/')}`} alt={title} className='w-full h-48 object-cover' />
                )}
            </figure>
            <div className='card-body'>
                <h2 className='card-title'>{title}</h2>
                <p>{description}</p>
                <div className='card-actions justify-end'>
                    <Link to={`/cars/${id}`} className='btn btn-primary btn-sm'>View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
