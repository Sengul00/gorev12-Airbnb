import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { api } from '../api/api';
import { FaLocationDot, FaUsers, FaBed, FaBath, FaArrowLeft, FaPenToSquare, FaTrash, FaWifi, FaKitchenSet, FaWind, FaLaptop } from 'react-icons/fa6'; // İkonlar (Fa6 kullanıldı)
import type { Home } from './Lists'; 

const getAmenityIcon = (amenity: string) => {
    const lowerCaseAmenity = amenity.toLowerCase();
    if (lowerCaseAmenity.includes('wifi')) return <FaWifi className="mr-2 text-gray-500" />;
    if (lowerCaseAmenity.includes('kitchen')) return <FaKitchenSet className="mr-2 text-gray-500" />;
    if (lowerCaseAmenity.includes('air conditioning')) return <FaWind className="mr-2 text-gray-500" />;
    if (lowerCaseAmenity.includes('workspace')) return <FaLaptop className="mr-2 text-gray-500" />;
    return null; 
};


const PRIMARY_COLOR_CLASS = 'bg-[#f4405e] hover:bg-[#d93a55]'; 

const Detail = () => {
  // 1. usss
  const [home, setHome] = useState<Home | null>(null); 
const { id } = useParams();
const navigate = useNavigate();

  // 2. Veri çekme 
const fetchHome = () => {
    api.get(`/homes/${id}`)
    .then((res) => setHome(res.data))
    .catch((error) => {
        console.error(`Evin detayları (${id}) çekilirken hata oluştu:`, error);
        setHome(null);
    });
};

  // 2.1. useEffect ile ürün detayı
useEffect(() => {
    fetchHome();
}, [id]);

  // 3. İlan Silme İşlemi
const handleDelete = () => {
    if (window.confirm('Bu ilanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
        api.delete(`/homes/${id}`)
            .then(() => {
                alert('İlan başarıyla silindi.');
                navigate('/'); 
            })
            .catch((error) => {
                console.error('İlan silinirken hata oluştu:', error);
                alert('İlan silinirken bir hata oluştu.');
            });
    }
};

if (!home) {
    return <div className="text-center p-10 text-xl text-gray-600">
        Yükleniyor... (veya bu ID'ye ait bir ev bulunamadı.)
    </div>;
}

  // 4. İlan detayını listeleriz
return (
    <div className="min-h-screen bg-gray-50 pb-12">
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        
        {/* Üst Navigasyon */}
        <div className="p-4">
        <button 
            onClick={() => navigate(-1)} 
            className="text-gray-600 hover:text-gray-900 transition-colors flex items-center font-semibold"
        >
            <FaArrowLeft className="w-4 h-4 mr-2"/> Back to listings
        </button>
        </div>
        
        {/* İlan Resmi */}
        <div className="w-full h-96">
            <img 
                src={home.imageUrl} 
                alt={home.title} 
                className="w-full h-full object-cover"
            />
        </div>

        {/* Detay İçeriği */}
        <div className="p-6 md:p-8">
            
            {/* Başlık ve Aksiyon Butonları */}
            <div className="flex justify-between items-start mb-6  pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{home.title}</h1>
                    {/* Konum */}
                    <div className="flex items-center text-gray-500 mt-1">
                        <FaLocationDot className="w-3 h-3 mr-2" />
                        <span>{home.location}</span>
                    </div>
                </div>
                
                {/* Düzenle ve Sil Butonları */}
                <div className="flex gap-3">
                    {/* Düzenle Butonu */}
                    <Link 
                        to={`/homes/${home.id}/edit`} 
                        className="p-3 border rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Edit Home"
                    >
                        <FaPenToSquare className="w-5 h-5" />
                    </Link>
                    {/* Sil Butonu */}
                    <button 
                        onClick={handleDelete}
                        className="p-3 border rounded-full text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Home"
                    >
                        <FaTrash className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Özellikler */}
            <div className="border-b border-gray-200 gap-8">
                <div className='flex gap-8 text-gray-700 mb-8'>
                    <div className="flex items-center">
                    <FaUsers className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{home.guests}{" "}</span> Guests
                </div>
                <div className="flex items-center">
                    <FaBed className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{home.bedrooms}{" "}</span> Bedrooms
                </div>
                <div className="flex items-center">
                    <FaBath className="w-4 h-4 mr-2" />
                    <span className="font-semibold">{home.bathrooms}{" "}</span> Bathrooms
                </div>
                </div>
            </div>

            {/* Açıklama */}
            <div className="mb-8 mt-8 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About this place</h2>
                <p className="text-gray-600 leading-relaxed mb-8">{home.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8 border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-700">
                    {home.amenities?.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                            {getAmenityIcon(amenity)}
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Fiyat ve Rezervasyon Butonu */}
            <div className="flex justify-between items-center pt-4">
                <div className="text-2xl font-bold text-gray-900">
                    ${home.pricePerNight}
                    <span className="text-lg font-normal text-gray-500"> /night</span>
                </div>
                
                <button
                    className={`px-8 py-3 text-white rounded-lg font-semibold shadow-xl ${PRIMARY_COLOR_CLASS} transition-colors`}
                >
                    Reserve
                </button>
            </div>
            
        </div>
    </div>
    </div>
);
};

export default Detail;