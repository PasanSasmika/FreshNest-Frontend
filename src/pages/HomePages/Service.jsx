import { motion } from "framer-motion";

const mockServices = [
  {
    _id: "1",
    name: "Deep Cleaning",
    description: "Thorough cleaning of entire house including floors, walls, kitchen, and bathrooms.",
    price: 200,
    duration: "4-6 hours",
    createdAt: "2025-04-29T02:37:57.915Z",
    updatedAt: "2025-04-29T02:37:57.915Z",
  },
  // Add more mock services here
];

const ServiceCard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockServices.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* <div className="relative h-48">
                <Image
                  src={service.Images[0]}
                  alt={service.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div> */}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-green-600">
                    ${service.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    ⏳ {service.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;