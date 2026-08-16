import React, { useEffect } from 'react';

export default function TripAdvisorWidget() {
  useEffect(() => {
    if (!(window as any).loadtrk) {
      (window as any).loadtrk = true;
    }

    const existingScript = document.getElementById('tripadvisor-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'tripadvisor-script';
      script.src = "https://www.jscache.com/wejs?wtype=cdsratingsonlynarrow&uniq=766&locationId=25233516&lang=en_US&border=false&display_version=2";
      script.async = true;
      script.setAttribute('data-loadtrk', 'true');
      document.body.appendChild(script);
    }
  }, []);

  return (
    // 🟢 ضفنا هنا "relative" عشان الطبقة الشفافة تمسك في البلوك ده بالظبط
    <div className="tripadvisor-custom-wrapper relative flex items-center justify-center pt-2 transition-transform duration-300 hover:scale-105">
      
      {/* 🟢 السحر هنا: لينك شفاف بيغطي الويدجت كله فوق أي حاجة (z-50) */}
      <a 
        href="https://www.tripadvisor.com/Hotel_Review-g303856-d25233516-Reviews-Noprea_Boutique_Hotel-Philae_Aswan_Governorate_Nile_River_Valley.html" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute inset-0 z-50 cursor-pointer"
        aria-label="View NOPREA Boutique Hotel on TripAdvisor"
      />

      <style>
        {`
          /* 1. إزالة أي خلفيات بيضاء نهائياً */
          body .tripadvisor-custom-wrapper #TA_cdsratingsonlynarrow766,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow > div,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow ul,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow li {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          
          /* 2. إجبار تغيير لون الخط لاسم الفندق وكلمة Reviews للون الذهبي/الرملي */
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow a,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow a span,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow a div,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow div,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow span {
            color: #E5D3B3 !important; 
            text-decoration: none !important;
          }

          /* 3. الشادو الذهبي حوالين النجوم الخضراء واللوجو */
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow img,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow svg,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow .ui_bubble_rating,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow [class*="rating"],
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow [alt*="rating"] {
            filter: drop-shadow(0px 0px 5px rgba(229, 211, 179, 0.7)) !important;
          }
          
          /* تكبير اللوجو وتظبيط مساحته */
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow img {
            max-width: 105px !important;
            margin-top: 6px !important;
            transition: all 0.3s ease;
          }
          
          /* تزويد الإضاءة (Glow) لما تقف بالماوس */
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow:hover img,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow:hover svg,
          body .tripadvisor-custom-wrapper .TA_cdsratingsonlynarrow:hover .ui_bubble_rating {
            filter: drop-shadow(0px 0px 8px rgba(229, 211, 179, 1)) !important;
          }
        `}
      </style>
      
      <div id="TA_cdsratingsonlynarrow766" className="TA_cdsratingsonlynarrow">
        <ul id="YUCz6U" className="TA_links u5m0VKuuQ9 flex flex-col items-center">
          <li id="nGN71pLU5" className="4yqkOwqHHqI">
            <a target="_blank" rel="noopener noreferrer" href="https://www.tripadvisor.com/Hotel_Review-g303856-d25233516-Reviews-Noprea_Boutique_Hotel-Philae_Aswan_Governorate_Nile_River_Valley.html">
              <img src="https://www.tripadvisor.com/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-18034-2.svg" alt="TripAdvisor" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}