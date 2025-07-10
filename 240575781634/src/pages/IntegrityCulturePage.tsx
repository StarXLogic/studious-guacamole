import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { integrityStories, bambooPoems, quizQuestions } from "@/lib/integrityData";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function IntegrityCulturePage() {
  const [activeTab, setActiveTab] = useState("stories");
  const [stories, setStories] = useState(integrityStories);
  const [poems, setPoems] = useState(bambooPoems);
  const [questions, setQuestions] = useState(quizQuestions);
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // 朗读故事
  const readStory = (id: number) => {
    const story = stories.find(s => s.id === id);
    if (story) {
      const utterance = new SpeechSynthesisUtterance(story.content);
      speechSynthesis.speak(utterance);
      setStories(stories.map(s => 
        s.id === id ? { ...s, hasRead: true } : s
      ));
    }
  };

  // 收藏故事或诗句
  const toggleFavorite = (type: 'story' | 'poem', id: number) => {
    if (type === 'story') {
      setStories(stories.map(s => 
        s.id === id ? { ...s, isFavorite: !s.isFavorite } : s
      ));
    } else {
      setPoems(poems.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      ));
    }
    toast.success("收藏状态已更新");
  };

  // 标记诗句为已练习
  const markAsPracticed = (id: number) => {
    setPoems(poems.map(p => 
      p.id === id ? { ...p, practiced: true } : p
    ));
    toast.success("已标记为练习过");
  };

  // 回答问题
  const answerQuestion = (questionId: number, answerIndex: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = answerIndex === question.answer;
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, answered: true, isCorrect } 
        : q
    ));

    if (isCorrect) {
      toast.success("回答正确!");
    } else {
      toast.error(`回答错误，正确答案是: ${question.options[question.answer]}`);
    }
  };

  // 渲染故事馆内容
  const renderStories = () => (
    <div className="space-y-4">
      {stories.map(story => (
        <motion.button 
          key={story.id}
          className={`bg-[#F5F5DC] p-4 rounded-lg border-l-8 ${selectedStory === story.id ? 'border-[#9C4A1A]' : 'border-[#5E8C31]'} shadow-md w-full text-left`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => setSelectedStory(story.id === selectedStory ? null : story.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-[#5E8C31]">{story.title}</h3>
              <span className="text-sm text-[#9C4A1A] bg-[#F5F5DC] px-2 py-1 rounded-full">
                {story.category}
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite('story', story.id);
              }}
              className="text-[#9C4A1A] hover:text-[#BC2C1A] active:text-[#D45D4C]"
            >
              <i className={`fa-${story.isFavorite ? "solid" : "regular"} fa-heart`}></i>
            </button>
          </div>
          
          {selectedStory === story.id && (
            <motion.div 
              className="mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-700 mb-3">{story.content}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  readStory(story.id);
                }}
                className="bg-[#5E8C31] text-white px-3 py-1 rounded text-sm hover:bg-[#4A7327] active:bg-[#365A1D]"
              >
                <i className="fa-solid fa-volume-high mr-1"></i> 朗读故事
              </button>
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );

  // 渲染诗词集内容
  const renderPoems = () => (
    <div className="space-y-6">
      {poems.map(poem => (
        <motion.div 
          key={poem.id}
          className="bg-[#F5F5DC] p-6 rounded-lg shadow-lg border-2 border-[#5E8C31]/30 relative"
          whileHover={{ y: -5 }}
        >
          <div className="absolute top-2 right-2 flex space-x-2">
            <button 
              onClick={() => toggleFavorite('poem', poem.id)}
              className="text-[#9C4A1A] hover:text-[#BC2C1A]"
            >
              <i className={`fa-${poem.isFavorite ? "solid" : "regular"} fa-heart`}></i>
            </button>
            <button 
              onClick={() => markAsPracticed(poem.id)}
              className="text-[#5E8C31] hover:text-[#2C5E1A]"
            >
              <i className="fa-solid fa-pen-fancy"></i>
            </button>
          </div>
          
          <h3 className="text-xl font-bold text-[#5E8C31] text-center mb-2">{poem.title}</h3>
          <p className="text-[#9C4A1A] text-center mb-4">{poem.author} · {poem.dynasty}</p>
          
          <div className="border-t border-[#5E8C31]/30 pt-4">
            <p className="text-gray-700 whitespace-pre-line text-center">{poem.content}</p>
          </div>
          
          {poem.practiced && (
            <div className="mt-4 text-sm text-[#9C4A1A] flex items-center justify-center">
              <i className="fa-solid fa-check-circle mr-1"></i> 已练习
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  // 渲染互动区内容
  const renderQuiz = () => {
    if (questions.length === 0) {
      return (
        <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-lg border-2 border-[#5E8C31] text-center">
          <h3 className="text-xl font-bold text-[#5E8C31] mb-4">廉政知识问答</h3>
          <p className="text-gray-700 mb-4">暂无题目，请稍后再试</p>
          <button 
            className="bg-[#5E8C31] text-white px-4 py-2 rounded"
            onClick={() => {
              // 重新加载题目
              setQuestions(quizQuestions);
              setCurrentQuestion(0);
            }}
          >
            <i className="fa-solid fa-rotate-right mr-2"></i>刷新题目
          </button>
        </div>
      );
    }

    const question = questions[currentQuestion];
    
    return (
      <div className="bg-[#F5F5DC] p-6 rounded-lg shadow-lg border-2 border-[#5E8C31]">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-[#5E8C31] mb-2">廉政知识问答</h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#5E8C31] h-2 rounded-full" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            第 {currentQuestion + 1} 题 / 共 {questions.length} 题
          </p>
        </div>
        
        <h4 className="text-lg font-medium text-[#5E8C31] mb-4">{question.question}</h4>
        
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full text-left p-3 rounded border ${question.answered 
                ? index === question.answer 
                  ? 'bg-[#5E8C31]/10 border-[#5E8C31]' 
                  : 'bg-gray-100 border-gray-300'
                : 'bg-white border-[#5E8C31]/50 hover:bg-[#5E8C31]/10'}`}
              onClick={() => !question.answered && answerQuestion(question.id, index)}
              disabled={question.answered}
            >
              {option}
              {question.answered && index === question.answer && (
                <span className="ml-2 text-[#5E8C31]">
                  <i className="fa-solid fa-check"></i> 正确答案
                </span>
              )}
              {question.answered && index !== question.answer && question.isCorrect && (
                <span className="ml-2 text-gray-500">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            className="bg-[#5E8C31] text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            上一题
          </button>
          <button
            className="bg-[#5E8C31] text-white px-4 py-2 rounded disabled:opacity-50"
            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
            disabled={currentQuestion === questions.length - 1}
          >
            下一题
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col">
      <Header />
      
      <div className="flex-1 p-4">
        {/* 导航标签 */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeTab === 'stories' ? 'bg-[#5E8C31] text-white' : 'bg-white text-[#5E8C31] border border-[#5E8C31]'}`}
              onClick={() => setActiveTab('stories')}
            >
              <i className="fa-solid fa-book mr-2"></i> 故事馆
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'poems' ? 'bg-[#5E8C31] text-white' : 'bg-white text-[#5E8C31] border-t border-b border-[#5E8C31]'}`}
              onClick={() => setActiveTab('poems')}
            >
              <i className="fa-solid fa-scroll mr-2"></i> 诗词集
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeTab === 'quiz' ? 'bg-[#5E8C31] text-white' : 'bg-white text-[#5E8C31] border border-[#5E8C31]'}`}
              onClick={() => setActiveTab('quiz')}
            >
              <i className="fa-solid fa-question mr-2"></i> 互动区
            </button>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'stories' && renderStories()}
          {activeTab === 'poems' && renderPoems()}
          {activeTab === 'quiz' && renderQuiz()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
