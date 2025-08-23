import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          About <span className="text-green-600">MusicMaster</span>
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 text-center">
          Welcome to <span className="font-semibold text-green-600">MusicMaster</span> – 
          your trusted destination for premium musical instruments.  
          From guitars to grand pianos, we believe music is not just sound – 
          it’s an emotion, a story, and a universal language that connects us all.
        </p>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
              alt="About MusicMaster"
              className="rounded-2xl shadow-md"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              MusicMaster began with a vision to make quality instruments 
              accessible to musicians of every level. What started as a small 
              collection for local artists has grown into a trusted online 
              platform serving musicians worldwide.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We carefully select every guitar, piano, drum, and violin to 
              ensure top-notch quality, durability, and sound. Whether you’re 
              a beginner taking your first step into music or a professional 
              artist, our mission is to help you create melodies that inspire.
            </p>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At MusicMaster, our mission is to nurture the love of music by 
            providing instruments that bring out the best in every artist.  
            We envision a world where music is accessible to all – where 
            every strum, beat, and note can spark creativity, joy, and harmony.  
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
