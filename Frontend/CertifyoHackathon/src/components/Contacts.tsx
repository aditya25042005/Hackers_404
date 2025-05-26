// import Navbar from "./navbar"
// import Footer from "./Footer"
// import '../static/contact.css'
// const Contacts = () => {
//   return (
//     <div className="pageContainer">
//         <Navbar/>
//          <div className="content-wrap">
//          page content 
//         </div>
//         <Footer/>
//     </div>
//   )
// }

// export default Contacts

import Navbar from "./navbar";
import Footer from "./Footer";

const Contacts = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans">
      <Navbar />

      <main className="flex-grow container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          <span className="text-white">one</span>
          <span className="text-red-500">Code</span>
        </h1>

        <p className="text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
          We are a team of passionate individuals — <span className="text-white font-semibold">Aditya Karn</span> , <span className="text-white font-semibold">Aditya Gupta</span> , <span className="text-white font-semibold">Ansh Singh</span> , and <span className="text-white font-semibold">Sristhitk Sekar</span> — united under the name <span className="text-white font-semibold">one</span><span className="text-red-500 font-semibold">Code</span>.
          <br />
          We believe that the world can be revolutionized through the proper and ethical use of technology.
          Our mission is to create impactful digital solutions that make the world a better, fairer, and more inclusive place.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-8 text-left">
          <div className="bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-red-400">Innovation</h2>
            <p className="text-gray-300">
              We strive to build cutting-edge tools that solve real-world problems — combining creativity with functionality.
            </p>
          </div>

          <div className="bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-red-400">Collaboration</h2>
            <p className="text-gray-300">
              At one<span className="text-red-400 font-semibold">Code</span>, we believe in the power of teamwork and open communication to bring ideas to life.
            </p>
          </div>

          <div className="bg-slate-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-2 text-red-400">Purpose</h2>
            <p className="text-gray-300">
              Everything we build is rooted in our commitment to creating a better future — for everyone, everywhere.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
          <p className="max-w-2xl mx-auto text-gray-300 leading-loose">
            In a world driven by fast-paced innovation, we aim to be the voice of mindful tech — balancing progress with responsibility. Whether it's through building community platforms, AI-driven tools, or ethical systems, we strive to empower others and leave a lasting, positive impact.
          </p>
        </div>
                <div className="mt-16">
          <h3 className="text-2xl font-bold mb-4 text-white">What’s in a name?</h3>
          <p className="max-w-2xl mx-auto text-gray-300 leading-loose">
            The name <span className="text-white font-semibold">one</span>
            <span className="text-red-500 font-semibold">Code</span> symbolizes more than just a team. It’s a reflection of unity through diversity — where individuals from different backgrounds, skills, and mindsets come together to write code with a common vision. <br />
            <br />
            “<span className="text-white">One</span>” stands for friendship, compassion, and harmony — the belief that together, we are stronger.  
            “<span className="text-red-500">Code</span>” represents our shared passion, our craft, and the tool we use to create meaningful change.
            <br />
            <br />
            <span className="italic text-gray-400">Together, we are not just writing code — we are building oneCode.</span>
          </p>
        </div>

      </main>
      

      <Footer />
    </div>
  );
};

export default Contacts;
