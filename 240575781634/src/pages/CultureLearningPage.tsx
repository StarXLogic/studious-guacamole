import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { crafts } from "@/lib/cultureData";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CultureLearningPage() {
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [craftList, setCraftList] = useState(crafts);

  const toggleFavorite = (id: number) => {
    setCraftList(craftList.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
    toast.success(favoritesOnly ? "收藏状态已更新" : "已添加到收藏");
  };

  const renderContent = () => {
    const data = favoritesOnly 
      ? craftList.filter(item => item.isFavorite)
      : craftList;

    if (data.length === 0) {
      return <div className="text-center py-10">暂无数据</div>;
    }

    return (
      <div className="space-y-6">
        {data.map(craft => (
          <motion.div 
            key={craft.id}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-[#5E8C31]">{craft.title}</h3>
              <button 
                onClick={() => toggleFavorite(craft.id)}
                className="text-[#5E8C31] hover:text-yellow-500"
              >
                <i className={`fa-${craft.isFavorite ? "solid" : "regular"} fa-heart text-xl`}></i>
              </button>
            </div>
            <div className="border-l-4 border-[#5E8C31] pl-4 mt-2">
              <p className="text-gray-700 whitespace-pre-line">{craft.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col md:flex-row">
        {/* 左侧导航 */}
        <div className="w-full md:w-64 bg-[#5E8C31] text-white p-4">
          <h2 className="text-xl font-bold mb-6">竹工艺分类</h2>
          
          <div className="mt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox text-[#5E8C31]" 
                checked={favoritesOnly}
                onChange={() => setFavoritesOnly(!favoritesOnly)}
              />
              <span>仅显示收藏</span>
            </label>
          </div>
        </div>

        {/* 右侧内容区 */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#5E8C31]">竹工艺</h2>
            <div className="text-sm text-gray-500">
              共 {favoritesOnly 
                ? craftList.filter(item => item.isFavorite).length
                : craftList.length} 条数据
            </div>
          </div>

          {/* 竹刻纹样分隔线 */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#5E8C31]/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F5F5DC] px-4 text-[#5E8C31]">
                <i className="fa-solid fa-bamboo"></i>
                <i className="fa-solid fa-bamboo mx-2"></i>
                <i className="fa-solid fa-bamboo"></i>
              </span>
            </div>
          </div>

          {/* 内容区域 */}
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
}