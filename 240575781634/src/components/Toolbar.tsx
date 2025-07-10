import { motion } from "framer-motion";

interface ToolbarProps {
  brushes: { id: number; name: string; size: number }[];
  colors: { id: number; name: string; value: string }[];
  selectedBrush: { id: number; name: string; size: number };
  selectedColor: { id: number; name: string; value: string };
  onBrushChange: (brush: any) => void;
  onColorChange: (color: any) => void;
  onSave: () => void;
  onTagClick: () => void;
}

export default function Toolbar({
  brushes,
  colors,
  selectedBrush,
  selectedColor,
  onBrushChange,
  onColorChange,
  onSave,
  onTagClick,
}: ToolbarProps) {
  return (
    <motion.div 
      className="bg-[#5E8C31] text-white p-4 rounded-lg shadow-lg w-full md:w-64"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold mb-4">绘画工具</h2>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">笔刷选择</h3>
        <div className="grid grid-cols-3 gap-2">
          {brushes.map((brush) => (
            <button
              key={brush.id}
              className={`p-2 rounded ${selectedBrush.id === brush.id ? 'bg-yellow-200 text-[#5E8C31]' : 'bg-white/20'}`}
              onClick={() => onBrushChange(brush)}
            >
              {brush.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium mb-2">颜色选择</h3>
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color.id}
              className="w-8 h-8 rounded-full border-2 border-white"
              style={{ backgroundColor: color.value }}
              onClick={() => onColorChange(color)}
            >
              {selectedColor.id === color.id && (
                <i className="fa-solid fa-check text-white"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button 
          className="bg-yellow-200 text-[#5E8C31] py-2 px-4 rounded font-medium"
          onClick={onTagClick}
        >
          添加标签
        </button>
        <button 
          className="bg-white/20 py-2 px-4 rounded font-medium"
          onClick={onSave}
        >
          保存作品
        </button>
      </div>
    </motion.div>
  );
}