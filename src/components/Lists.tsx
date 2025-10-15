import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import { FaLocationDot, FaUsers, FaBed, FaBath } from 'react-icons/fa6'; 

// 1. Home Type oluştur ve export et
export type Home = {
id: string;
title: string;
description: string;
pricePerNight: string;
location: string;
imageUrl: string;
guests: string;
bedrooms: string;
bathrooms: string;
amenities: string[];
};
const Lists = () => {
    // 2. usss homes listesini tut
    const [homes, setHomes] = useState<Home[]>([]);
    
      // 3. uffs ile axios kullanarak verileri çek
    useEffect(() => {
        api.get("/homes").then((res) => {
        let dataToSet: Home[] = [];

          // API'den gelen veriyi kontrol etme
        if (Array.isArray(res.data)) {
            dataToSet = res.data;
        } else if (res.data && Array.isArray(res.data.homes)) {
            dataToSet = res.data.homes;
        }
        
        setHomes(dataToSet);
        console.log("Veri Yüklendi. Ev Sayısı:", dataToSet.length); 
    })
    .catch((error) => {
        console.error("Veri çekme hatası (Bağlantı Sorunu):", error);
    });
    }, []);
    
      // 4. Add ve home linklerini listele
return (
    <div> 
    
      {/* Yüklenme/Boş Durum Göstergesi */}
    {homes.length === 0 && <p className="text-center font-bold py-10 text-red-500">Veri yükleniyor veya listelenecek ev bulunamadı.</p>}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {homes.map((home) => (
            
        <Link to={`/homes/${home.id}`} key={home.id} className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            
            <div className="h-60 overflow-hidden">
                <img 
                src={home.imageUrl} 
                alt={home.title} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{home.title}</h2>

            <div className="flex items-center text-sm text-gray-500 mb-3">
                <FaLocationDot className="w-3 h-3 mr-1 text-gray-400" />
                <span>{home.location}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600  pb-3 mb-3">
    
            <div className="flex items-center mr-4">
                <FaUsers className="w-4 h-4 mr-1 text-gray-500" /> <span className="font-medium">{home.guests}{" "} guests
                </span> 
            </div>              
            <div className="flex items-center mr-4">
                <FaBed className="w-4 h-4 mr-1 text-gray-500" />
                <span className="font-medium">{home.bedrooms}{" "}bed</span>
            </div>
            
            <div className="flex items-center">
                <FaBath className="w-4 h-4 mr-1 text-gray-500" />
                <span className="font-medium">{home.bathrooms}{" "}bath </span>
            </div>
            </div>
        
            <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900">${home.pricePerNight}</span>
                <span className="text-sm text-gray-500"> /night</span>
            </div>
            
        </div>
            
        </Link>
        
        ))}
    </div>
    </div>
)
}

export default Lists