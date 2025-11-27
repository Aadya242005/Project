import React, { useEffect, useState } from "react";
import bgImage from "../assets/upload8.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AlumniSection() {
  const [alumniData, setAlumniData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/alumni")
      .then((res) => setAlumniData(res.data))
      .catch((err) => console.error("Error fetching alumni data:", err));
  }, []);

  useEffect(() => {
    async function fetchLinkedInImages() {
      const updated = await Promise.all(
        alumniData.map(async (alumni) => {
          try {
            if (alumni.linkedin) {
              const response = await axios.get(`https://api.microlink.io?url=${alumni.linkedin}`);
              const linkedInImg = response.data?.data?.image?.url;
              if (linkedInImg) {
                return { ...alumni, image: linkedInImg };
              }
            }
            return alumni;
          } catch (error) {
            console.warn("Could not fetch LinkedIn image for", alumni.name);
            return alumni;
          }
        })
      );
      setAlumniData(updated);
    }

    if (alumniData.length > 0) fetchLinkedInImages();
  }, [alumniData.length]);

  // Filter by name
  const filteredAlumni = alumniData.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="alumni"
      className="relative py-20 px-6 min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h2 className="text-5xl font-extrabold mb-6">
          Our <span className="text-teal-400">Alumni</span>
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-10 text-gray-200">
          Search and explore the journeys of our exceptional alumni who are now excelling
          in top tech companies around the world.
        </p>

        {/* 🔍 Search Bar */}
        <div className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Search alumni by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/2 px-5 py-3 rounded-xl bg-white/10 border border-teal-400/40 
                       text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length === 0 ? (
          <p className="text-gray-300">No alumni found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredAlumni.map((alumni) => (
              <div
                key={alumni._id}
                onClick={() => navigate(`/alumni/${alumni._id}`)}
                className="cursor-pointer p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl 
                           hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center"
              >
                <img
                  src={alumni.image || "https://via.placeholder.com/100"}
                  alt={alumni.name}
                  className="w-28 h-28 mx-auto rounded-full object-cover mb-4 border-4 border-teal-200"
                />
                <h3 className="text-xl font-bold text-teal-400">{alumni.name}</h3>
                <p className="text-gray-300">{alumni.role}</p>
                <p className="text-sm text-gray-400 mb-2">
                  {alumni.company} • Batch {alumni.batch}
                </p>
                {alumni.linkedin && (
                  <a
                    href={alumni.linkedin}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-teal-300 hover:text-teal-500 font-medium mt-2"
                  >
                    🔗 LinkedIn
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AlumniSection;
