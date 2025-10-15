# 🏡 React Home Listing CRUD Uygulaması

Bu proje, bir ev listeleme uygulamasının temel CRUD (Create, Read, Update, Delete) işlevlerini modern React, Vite ve Tailwind CSS kullanarak hayata geçirmektedir.

Uygulama, ilanları listeler, ilan detaylarını gösterir, yeni ilan eklemeye ve mevcut ilanları düzenleme/silme imkanı sunar.

## ✨ Özellikler

- **Tam CRUD İşlevi:** GET, POST, PUT, DELETE HTTP metotlarının tamamı Axios ile kullanılmaktadır.
- **Duyarlı Tasarım:** Tailwind CSS ile mobil ve masaüstü cihazlara uyumlu, modern bir arayüz.
- **Tekil Detay Sayfaları:** Her ilan kartına tıklayınca dinamik olarak URL (örneğin: `/homes/1`) üzerinden detay sayfasına yönlendirme.
- **Form Yönetimi:** İlan ekleme ve düzenleme sayfalarında state yönetimi ve veri doğrulama (validation) yapısı.
- **TypeScript:** Güvenli ve ölçeklenebilir bir kod tabanı için güçlü tip kontrolü.
- **İkon Entegrasyonu:** `react-icons/fa6` paketi ile modern ikon kullanımı.

## 🚀 Hızlı Başlangıç

Bu projeyi yerel bilgisayarınıza klonlamak ve çalıştırmak için aşağıdaki adımları izleyin.

### 1. Klonlama ve Kurulum

Öncelikle projeyi klonlayın ve bağımlılıkları yükleyin:

bash
# Projeyi klonla
git clone [GITHUB_DEPO_ADRESİNİZ]
cd [PROJE-ADI]

# Gerekli paketleri yükle
npm install
2. API Sunucusunu Başlatma (JSON-Server)
Bu proje bir backend simülasyonu için JSON-Server kullanır. Verilerinizi tutan db.json dosyanızın bulunduğundan emin olun ve API sunucunuzu başlatın:

Bash

# (Eğer JSON-Server paketini global kurmadıysanız veya package.json'a eklemediyseniz)
# Bu komut yerine kendi JSON-Server başlatma komutunuzu kullanın.
npx json-server --watch db.json --port 5174 
3. React Uygulamasını Başlatma
Ayrı bir terminal penceresinde React uygulamasını başlatın:

Bash

npm run dev
Uygulama genellikle http://localhost:5173 adresinde çalışmaya başlayacaktır.

🛠 Teknolojiler
Bu projenin geliştirilmesinde kullanılan temel teknolojiler ve kütüphaneler:

⚛️ React: Kullanıcı arayüzü kütüphanesi.

⚡ Vite: Hızlı geliştirme ortamı ve bundler.

🟦 TypeScript: Tip güvenliği sağlar.

🎨 Tailwind CSS: Hızlı ve esnek stil oluşturma.

🌐 Axios: API çağrıları için HTTP istemcisi.

🧭 React Router DOM: Sayfa yönlendirmesi.

🔨 react-icons/fa6: Modern ikon seti.

📁 Klasör Yapısı
Projenin temel bileşenleri ve yapısal öğeleri src klasöründe yer alır:

```src/
├── api/             # API bağlantısı (Axios instance)
├── components/
│   ├── Lists.tsx    # İlanları listeleyen sayfa (GET)
│   ├── Detail.tsx   # İlan detay sayfası (GET, DELETE)
│   ├── Add.tsx      # Yeni ilan ekleme formu (POST)
│   ├── Edit.tsx     # Mevcut ilanı düzenleme formu (GET, PUT)
│   └── Home.tsx     # Anasayfa
├── main.tsx         # Router ve TypeScript konfigürasyonu
├── index.css        # Tailwind CSS importları
└── ... (diğer dosyalar)```
🌐 GitHub
Projenin GitHub Sayfası

📄 Lisans
Bu proje, MIT Lisansı ile lisanslanmıştır. Özgürce kullanabilir, düzenleyebilir ve paylaşabilirsiniz.

Keyifli kodlamalar! 🎉
