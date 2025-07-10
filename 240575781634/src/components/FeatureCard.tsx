import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  id: number;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  path,
}: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-[#5E8C31] text-white rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all relative overflow-hidden"
      whileHover={{ y: -5 }}
      onClick={() => navigate(path)}
    >
      <div className="flex items-center mb-4">
        <i className={`fa-solid ${icon} text-3xl mr-3`}></i>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-white/90 relative z-10">{description}</p>
      <div className="absolute -right-8 -bottom-8 opacity-20">
        <i className="fa-solid fa-bamboo text-8xl"></i>
      </div>
    </motion.div>
  );
}