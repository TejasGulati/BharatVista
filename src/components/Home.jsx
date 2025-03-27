import { motion } from 'framer-motion';
import { Map, Landmark, CalendarDays, Plus } from 'lucide-react';

function Home() {
  return (
    <div className="text-center py-12">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-indigo-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover India's Rich Cultural Heritage
      </motion.h1>
      
      <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
        Explore ancient temples, vibrant festivals, and historical landmarks through our interactive 3D map powered by AI.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <Map size={48} className="mx-auto mb-4" />, title: "Interactive Map", desc: "Explore cultural sites in 3D" },
          { icon: <Landmark size={48} className="mx-auto mb-4" />, title: "Historical Insights", desc: "AI-powered cultural context" },
          { icon: <CalendarDays size={48} className="mx-auto mb-4" />, title: "Festival Calendar", desc: "Find events by date and location" },
          { icon: <Plus size={48} className="mx-auto mb-4" />, title: "Contribute", desc: "Add your own cultural discoveries" }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-indigo-600">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;