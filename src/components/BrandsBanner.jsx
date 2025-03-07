import React from "react";
import { Link } from "react-router-dom";

function BrandsBanner() {
  const brands = [
    { name: "Romsons", image: "https://www.romsons.in/cdn/shop/files/romsons_og_1200x.jpg?v=1649836620" },
    { name: "BD", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/BD_%28company%29_logo.svg/800px-BD_%28company%29_logo.svg.png" },
    { name: "ASP", image: "https://rise.asp.com/hs-fs/hubfs/asp%20fullname%20plum%20rgb-01-Jun-20-2024-07-22-50-1259-AM.png?width=750&height=300&name=asp%20fullname%20plum%20rgb-01-Jun-20-2024-07-22-50-1259-AM.png" },
    { name: "ETHICON", image: "https://www.cdnlogo.com/logos/e/50/ethicon.svg" },
    { name: "PSK", image: "https://media.licdn.com/dms/image/v2/C510BAQFd5imTUIrWTw/company-logo_200_200/company-logo_200_200/0/1630606142776?e=2147483647&v=beta&t=aPlTIfV0SvhCqdOODUO8H4gsB5XYQ_ZOFRrt-TC13u8" },
    { name: "SCHULKE", image: "https://www.cosmeticsdesign-europe.com/resizer/v2/XSONJRA3PZNBJMC4MDITJ5NPKQ.jpg?auth=0020aa0a7e8170479df4aa6a53b96a04fae5a3687725f86b4e5355209439b7d9&width=1200&height=630&smart=true" },
    { name: "AQUMEN", image: "https://media.licdn.com/dms/image/v2/D560BAQG_Sg9D00ErwQ/company-logo_200_200/company-logo_200_200/0/1665215774211/aqmen_medtech_pvt_ltd_logo?e=2147483647&v=beta&t=cuLWLnk9i3M0nFki6Q8GAtTHwM5ImSR-vPMXiX1AJDI" },
    { name: "Nipro", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Nipro_company_logo.svg/2560px-Nipro_company_logo.svg.png" },
    { name:"BSN",image: "https://www.cdnlogo.com/logos/b/36/bsn-medical.svg"},
    {name:"DYNAMIC",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-3CjsXcYJ23Tni8vxfrPEKSBLDd-yDLtsQ&s"},
    {name:"HELTHIUM",image:"https://healthiummedtech.com/wp-content/uploads/2023/07/healthium-logo.png"},
    {name:"COVIDEN",image:"https://d29azk3rh443yy.cloudfront.net/static/Brands/aa.png"},
    {name:"lifelong",image:"https://media.licdn.com/dms/image/v2/C560BAQEE3DYDWFNiXA/company-logo_200_200/company-logo_200_200/0/1631354670337?e=2147483647&v=beta&t=I_YQua6vFIDFqJqeymc9nplFMn0-xvtB8KSpA08JgRM"},
    {name:"medicare",image:"https://1000logos.net/wp-content/uploads/2022/03/Medicare-Logo.png"},
    {name:"newcare",image:"https://www.hravailable.com/public/uploads/employer/JOBPORTAL-1624715541.jpeg"},
    {name:"NAP",image:"https://lh4.googleusercontent.com/proxy/bbCKvh-ytRXTrDwxmYU3QsOnkIaulSi1urjCz_NJg0f3rGcgh8IVaEV4xyRH3E9wo5Hlr0aBkwKvriY7WOW4auWFoMx4a3omoI0"},
    {name:"medigrip",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbi3dlw0j2JC0kBGbz_QVhs5ElwDFNT4J4Hg&s"}
  ];

  return (
    <div className="text-center p-6 border-t-2 border-gray-100">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">Popular Brands</h2>
      <p className="text-xl text-gray-600 mb-6">Trusted by millions around the world</p>

      {/* Brand Logos Section */}
      <div className="flex flex-wrap justify-center items-center gap-16 p-6 bg-gray-100 rounded-lg">
        {brands.map((brand) => (
          <Link key={brand.name} to={`/brands/${brand.name}`} className="transition-transform transform hover:scale-110 ">
            <img src={brand.image} alt={brand.name} className="h-20 sm:h-24" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BrandsBanner;
