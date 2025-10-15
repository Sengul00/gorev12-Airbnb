import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/api';
import { FaArrowLeft, FaFloppyDisk } from 'react-icons/fa6'; 

import type { Home } from './Lists'; 

const PRIMARY_COLOR_CLASS = 'bg-[#f4405e] hover:bg-[#d93a55]'; 

const Edit = () => {
  

  //1. usss
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [guests, setGuests] = useState("");    
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [amenities, setAmenities] = useState(""); 
  const [isLoading, setIsLoading] = useState(true);

  // 1.1. id çekme
  const { id } = useParams();
  const navigate = useNavigate();

  // 2. useEffect
  useEffect(() => {
    if (id) {
      api.get(`/homes/${id}`)
        .then((res) => {
          const homeData: Home = res.data;
          
          setTitle(homeData.title);
          setDescription(homeData.description);
          setPricePerNight(homeData.pricePerNight);
          setLocation(homeData.location);
          setImageUrl(homeData.imageUrl);
          setGuests(homeData.guests);
          setBedrooms(homeData.bedrooms);
          setBathrooms(homeData.bathrooms);
          setAmenities(homeData.amenities ? homeData.amenities.join(', ') : '');
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Veri çekme hatası:", error);
          setIsLoading(false);
          alert("İlan verileri yüklenirken bir hata oluştu.");
          navigate(`/homes/${id}`); 
        });
    }
  }, [id, navigate]);


  // 3. handleUpdate
  const handleUpdate = () => {
    const amenitiesArray = amenities 
      ? amenities.split(',').map(item => item.trim()) 
      : [];

    api.put(`/homes/${id}`, {
      title,
      description,
      pricePerNight,
      location,
      imageUrl,
      guests: guests,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      amenities: amenitiesArray
    }).then(() => {
      alert("İlan başarıyla güncellendi!");
      navigate(`/homes/${id}`); 
    })
    .catch(error => {
        console.error("İlan güncellenirken hata oluştu:", error);
        alert("İlan güncellenirken bir hata oluştu.");
    });
  };

  // İptal
  const handleCancel = () => {
      navigate(`/homes/${id}`); 
  };
  
  // Yükleme durumu
  if (isLoading) {
    return <div className="text-center p-10 text-xl text-gray-600">Loading data...</div>;
  }
  
  // 4. listeleme
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      
      {/* Geri Butonu */}
      <div className="w-full max-w-2xl mb-4">
        <button 
            onClick={() => navigate(-1)} 
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
        >
          <FaArrowLeft className="w-3 h-3"/> 
          Back to home details
        </button>
      </div>

      {/* Form Konteyneri */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-2xl">
        
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8  pb-4">
          Edit Home (ID: {id})
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
          
          <div className="space-y-6">

            {/* Title */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-1">Title <span className="text-red-600">*</span></label>
              <input 
                id="title"
                type="text"
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-1">Description <span className="text-red-600">*</span></label>
              <textarea 
                id="description"
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={4}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors resize-none"
              />
            </div>
            
            {/* Price per night ($) ve Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="price" className="text-sm font-semibold text-gray-700 mb-1">Price per night ($) <span className="text-red-600">*</span></label>
                <input 
                  id="price"
                  type="number"
                  value={pricePerNight}
                  onChange={(e) => setPricePerNight(e.target.value)} 
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="location" className="text-sm font-semibold text-gray-700 mb-1">Location <span className="text-red-600">*</span></label>
                <input 
                  id="location"
                  type="text"
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="flex flex-col">
              <label htmlFor="imageUrl" className="text-sm font-semibold text-gray-700 mb-1">Image URL</label>
              <input 
                id="imageUrl"
                type="url"
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
            </div>

            {/* Guests, Bedrooms, Bathrooms */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label htmlFor="guests" className="text-sm font-semibold text-gray-700 mb-1">Guests <span className="text-red-600">*</span></label>
                <input 
                  id="guests"
                  type="number"
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bedrooms" className="text-sm font-semibold text-gray-700 mb-1">Bedrooms <span className="text-red-600">*</span></label>
                <input 
                  id="bedrooms"
                  type="number"
                  value={bedrooms} 
                  onChange={(e) => setBedrooms(e.target.value)} 
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="bathrooms" className="text-sm font-semibold text-gray-700 mb-1">Bathrooms <span className="text-red-600">*</span></label>
                <input 
                  id="bathrooms"
                  type="number"
                  value={bathrooms} 
                  onChange={(e) => setBathrooms(e.target.value)} 
                  required
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-col">
              <label htmlFor="amenities" className="text-sm font-semibold text-gray-700 mb-1">Amenities (comma-separated)</label>
              <input 
                id="amenities"
                type="text"
                value={amenities} 
                onChange={(e) => setAmenities(e.target.value)} 
                placeholder='WIFI, Kitchen, Air Conditioning, Pool' 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
              />
            </div>
          </div> 

          {/* Aksiyon Butonları */}
          <div className="flex justify-end gap-3 mt-8 pt-4 ">
            
            {/* Cancel Butonu */}
            <button 
              type="button" 
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            
            {/* Update Home Butonu */}
            <button 
              type="submit" 
              className={`px-6 py-3 text-white rounded-lg font-semibold shadow-md ${PRIMARY_COLOR_CLASS} transition-colors flex items-center gap-2`}
            >
              <FaFloppyDisk /> Update Home
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit;