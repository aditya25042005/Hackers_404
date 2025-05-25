import React from 'react';

const products = [
  {
    name: "AI Resume Builder",
    description: "Generate professional resumes instantly using AI.",
    image: "https://imgs.search.brave.com/ItYqGpufFu1VRr5wtLWstJFjUFeKekTQ8_Bd-BUAwCk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vcTZBeFpY/WHp5dHNab0VubnJF/VWN5dFk5NVV2MnEw/ZldBSXdkdXk1SEhy/cy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlq/Wkc0dS9jSEp2WkM1/M1pXSnphWFJsL0xX/WnBiR1Z6TG1OdmJT/ODIvTXpWak5Ua3hN/emM0TXpNeS9aak00/WW1VeU5XUTBOV1l2/L05qYzBNRGM0WXpK/aE5qazMvT0dObVpU/SmlOVGMzTldZdy9Y/MkZwSlRJd2NtVnpk/VzFsL0pUSXdZblZw/YkdSbGNpVXkvTUdo/bGNtOHVkMlZpY0E"
  },
  {
    name: "Smart Chatbot",
    description: "Customizable chatbot trained for your business FAQs.",
    image: "https://imgs.search.brave.com/8f1acWQD5_7k2gOhGbfXF0Tt4EB69K9uWp2AF3hHDq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vOWRrMnU2/akVIN1dvczYxUnZs/VVBTRFU2UG9MUEZt/TTliRXpDR2NFeDFl/Zy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlw/YldjdS9abkpsWlhC/cGF5NWpiMjB2L1pu/SmxaUzEyWldOMGIz/SXYvWTJoaGRDMWli/M1F0WTI5dS9ZMlZ3/ZEMxcGJHeDFjM1J5/L1lYUnBiMjVmTVRF/ME16WXcvTFRVME1U/SXVhbkJuUDNObC9i/WFE5WVdselgyaDVZ/bkpwL1pDWjNQVGMw/TUE"
  },
  {
    name: "Image Captioning Tool",
    description: "AI tool that generates captions for images using deep learning.",
    image: "https://imgs.search.brave.com/WMRky7MXVsdn3NkaPMkUtRBe9pwPc_Dkrykz7QfVcA4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vdkdsUXJM/NW1wV0lZREVxWG5r/SWFFSDBMMjJ3MlpK/Q0djRURJOGx3U2NY/VS9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTlo/WkdGei9ZMmt1YjNK/bkwzZHdMV052L2Ju/UmxiblF2ZFhCc2Iy/RmsvY3k4eU1ESTBM/ekExTDJsdC9ZV2Rs/TFdOaGNIUnBiMjVw/L2JtY3RNVEF5Tkhn/MU56WXUvY0c1bg"
  },
  {
    name: "Text Summarizer",
    description: "Summarize large documents into short paragraphs.",
    image: "https://imgs.search.brave.com/hSoFF0qUj9e_bLAdmNmOB6WOHtU1GvN24DduwxHPIgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vQ3FQSnBo/clhOMDFoSXRrMVd6/VFE5NXR5eHJ5U2V4/SUVhbHNvRVBsM2RL/by9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl3/WVhKaC9abkpoYzJs/emRDNWpiMjB2L1gz/WmxjbU5sYkM5cGJX/Rm4vWlQ5MWNtdzlM/Mmx0WVdkbC9jeTl6/ZFcxdFlYSnBlbVZ5/L0wzUnZiMnd0Wlc0/dWQyVmkvY0NaM1BU/RXdNalFtY1QwNC9N/QQ"
  }
];

const PreviousProducts: React.FC = () => {
  return (
    <div className=" py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Previous Products</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
            >
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousProducts;
