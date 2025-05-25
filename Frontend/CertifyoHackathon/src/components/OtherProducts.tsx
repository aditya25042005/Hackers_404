
import React from 'react';
const products = [
  {
    name: "Ditcionary",
    description: "Get meaning of any word in your mind immediately.",
    image: "https://imgs.search.brave.com/ItYqGpufFu1VRr5wtLWstJFjUFeKekTQ8_Bd-BUAwCk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vcTZBeFpY/WHp5dHNab0VubnJF/VWN5dFk5NVV2MnEw/ZldBSXdkdXk1SEhy/cy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dS9jSEp2WkM1/M1pXSnphWFJsL0xX/WnBiR1Z6TG1OdmJT/ODIvTXpWak5Ua3hN/emM0TXpNeS9aak00/WW1VeU5XUTBOV1l2/L05qYzBNRGM0WXpK/aE5qazMvT0dObVpU/SmlOVGMzTldZdy9Y/MkZwSlRJd2NtVnpk/VzFsL0pUSXdZblZw/YkdSbGNpVXkvTUdo/bGNtOHVkMlZpY0E",
    linkto:"https://aditya-gupta23.github.io/Dictionary/"
  },
  {
    name: "Get My Recipe",
    description: "Get how to cook your favourite food any time anywhere",
    image: "https://imgs.search.brave.com/DTLR0l1V-Bnuj_JIqvSgJShUxaIBpS3RO2YeUg1K6Yk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vbWIwaTNB/V1d1UmF1dVJVTS1y/aWFDd19SSmRubjNY/Y2s1S1BqX2t4YWNB/ay9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L1pu/SmxaUzF3YUc5MGJ5/OWkvZFdSa2FHRXRZ/bTkzYkMxay9hWE5v/TFhkcGRHZ3RkbVZu/L1pYUmhZbXhsY3kx/c1pXZDEvYldWekxY/UnZjQzEyYVdWMy9Y/ekV4TlRBdE5ESTFP/VEV1L2FuQm5QM05s/YlhROVlXbHovWDJo/NVluSnBaQ1ozUFRj/MC9NQQ",
    linkto:"https://aditya-gupta23.github.io/Get-My-Recipe/"
  },
  {
    name: "Currency Convertor",
    description: "Planing to travel abroad now worries we are here to help you konw the rates",
    image: "https://imgs.search.brave.com/jtjAVHRDcjIi71nOQB9NKoGzBbNBlb9KJ6WvkLcwLHA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vY2FZREhM/YllWZE9GakF1aDZD/UTZhNHI4RmRpSHdl/amFNYl9lZ3dLdV9o/Yy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl6/ZEdGMC9hV011ZG1W/amRHVmxlbmt1L1ky/OXRMM041YzNSbGJT/OXkvWlhOdmRYSmpa/WE12ZEdoMS9iV0p1/WVdsc2N5OHdNRFV2/L05EUTVMelkwTmk5/emJXRnMvYkM5amRY/SnlaVzVqZVMxbC9l/R05vWVc1blpTMXZj/aTF0L2IyNWxlUzFr/YjJ4c1lYSXQvWVc1/a0xXVjFjbTh0WjI5/cy9aR1Z1TFhKdmRX/NWtMV04xL2NuSmxi/bU41TFdOdmFXNXov/TFhabFkzUnZjaTVx/Y0dj",
    linkto:"https://github.com/Aditya-Gupta23/Currency-Concerter.git"
  },
  
];

const PreviousProducts: React.FC = () => {


  return (
    <div className=" py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Previous Products</h2>
        <div  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <a
              target="_blank"
              key={index}
              href={product.linkto}
              rel="noopener noreferrer"
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousProducts;
