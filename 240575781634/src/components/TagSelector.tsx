import { motion } from "framer-motion";

interface TagSelectorProps {
  tags: { id: number; name: string }[];
  selectedTags: string[];
  onSelect: (tags: string[]) => void;
  onClose: () => void;
}

export default function TagSelector({
  tags,
  selectedTags,
  onSelect,
  onClose,
}: TagSelectorProps) {
  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onSelect(selectedTags.filter(tag => tag !== tagName));
    } else {
      onSelect([...selectedTags, tagName]);
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-[#F5F5DC] p-6 rounded-lg w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#5E8C31]">选择文化标签</h3>
          <button onClick={onClose}>
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag.id}
              className={`p-2 rounded ${selectedTags.includes(tag.name) ? 'bg-[#5E8C31] text-white' : 'bg-white border border-[#5E8C31]'}`}
              onClick={() => toggleTag(tag.name)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <button 
          className="w-full bg-[#5E8C31] text-white py-2 rounded"
          onClick={onClose}
        >
          确认选择
        </button>
      </motion.div>
    </motion.div>
  );
}