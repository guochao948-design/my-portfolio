import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  LucideLayers, LucideCpu, LucideWind, LucideArrowUpRight, 
  LucideMousePointer2, LucideBox, LucideDownload, LucideMail,
  LucideVideo, LucideImage, LucideMonitorPlay, LucideSparkles,
  LucideVolume2, LucideRefreshCw, LucidePenTool, LucideSun, LucideMoon
} from 'lucide-react';

/**
 * 顶级 Antigravity Portfolio v4.0 (Linear / Apple HIG / Fluent 终极版)
 * 提升：Magic UI 光影追踪、云母材质内发光、极简网格透视、高级排版律动
 */

// --- 基础 UI 组件库 ---

const SectionHeader = ({ num, title, highlight, subtitle }) => (
  <div className="mb-16 md:mb-24 relative z-10">
    <motion.div 
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="flex items-center gap-4 mb-6"
    >
      <span className="font-mono text-[10px] tracking-widest text-black/40 dark:text-white/40">{num}</span>
      <motion.div 
        initial={{ width: 0 }} whileInView={{ width: 48 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="h-[1px] bg-gradient-to-r from-black/20 to-transparent dark:from-white/20 dark:to-transparent" 
      />
      <span className="font-mono text-[10px] tracking-[0.25em] text-black/60 dark:text-white/60 uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-sans font-bold tracking-tight leading-tight md:leading-snug py-2 text-[#0d0d0d] dark:text-white/90"
    >
      {title}
      {highlight && (
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#0d0d0d] to-black/40 dark:from-white dark:to-white/40 ml-2 md:ml-4 font-black">
          {highlight}
        </span>
      )}
    </motion.h2>
  </div>
);

// 🔥 核心重构：Magic UI / Linear 风格鼠标追踪高光卡片
const SpotlightCard = ({ title, desc, icon, category, tags = [], image = null, className = "", isDarkMode }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => { setIsFocused(true); setOpacity(1); };
  const handleBlur = () => { setIsFocused(false); setOpacity(0); };
  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  // 根据主题动态调整高光颜色
  const spotlightColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
  const borderColor = isDarkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";

  return (
    <motion.div
      ref={divRef}
      whileHover={{ y: -6 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative h-full p-8 md:p-10 rounded-[32px] overflow-hidden cursor-pointer border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-colors duration-500 ${className}`}
    >
      {/* 鼠标跟随的高光层 (Radial Gradient) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* 鼠标跟随的边框高光层 */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 40%)`,
          WebkitMaskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='2' stroke-dasharray='100%25' stroke-dashoffset='0'/%3E%3C/svg%3E")`,
          maskImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='2' stroke-dasharray='100%25' stroke-dashoffset='0'/%3E%3C/svg%3E")`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />

      {image && (
        <div className="absolute inset-0 z-[5] overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-[0.25] dark:opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-luminosity group-hover:mix-blend-normal saturate-50 group-hover:saturate-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0ede8] via-[#f0ede8]/80 dark:from-[#060608] dark:via-[#060608]/80 to-transparent" />
        </div>
      )}

      {/* Fluent 设计规范：顶部极细物理高光倒角 */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent z-10 opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-20 h-full flex flex-col pointer-events-none">
        <div className="flex justify-between items-start mb-10">
          <div className={`w-12 h-12 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 flex items-center justify-center text-black/70 dark:text-white/70 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:scale-110 group-hover:rotate-3 shadow-sm transition-all duration-500`}>
            {icon}
          </div>
          {category && <span className="font-mono text-[9px] tracking-[0.25em] text-black/40 dark:text-white/40 uppercase font-semibold">{category}</span>}
        </div>
        
        <h3 className="text-xl md:text-2xl font-sans font-semibold tracking-tight mb-4 text-[#0d0d0d] dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-black/60 dark:text-white/50 text-sm leading-relaxed font-normal flex-grow">
          {desc}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {tags.map(tag => (
              <span key={tag} className="font-mono text-[9px] tracking-widest px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/60 dark:text-white/50 bg-black/5 dark:bg-white/[0.03]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-black/30 dark:border-white/30 pointer-events-none z-[9999] items-center justify-center mix-blend-difference hidden md:flex"
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.1 }}
    >
      <div className="w-1 h-1 bg-black dark:bg-white rounded-full" />
    </motion.div>
  );
};

// 🌟 微动效：动态书写悬浮牌
const PenWritingEffect = ({ isDarkMode }) => {
  return (
    <motion.div
      animate={{ y: [-8, 8, -8], rotateX: [5, -5, 5], rotateZ: [-2, 2, -2] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute w-64 h-16 rounded-[20px] bg-white/20 dark:bg-[#1a1a1a]/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] translate-x-20 translate-y-40 md:translate-x-32 md:translate-y-52 flex items-center justify-center z-30"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent opacity-50" />
      <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />

      <div className="relative w-[150px] h-6 flex items-center">
        <motion.div
          animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)", "inset(0 100% 0 0)"] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 0.8, 1] }}
          className="absolute inset-0 flex items-center font-serif italic text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#0d0d0d] to-black/50 dark:from-white/90 dark:to-white/40 tracking-widest"
        >
          走路带风，随心而动
        </motion.div>
        
        <motion.div
          animate={{ left: ["0%", "100%", "100%", "0%", "0%"], opacity: [0, 1, 1, 0, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 0.8, 1] }}
          className="absolute top-0 bottom-0 flex items-center justify-center -ml-2"
        >
          <LucidePenTool size={14} className="text-black/80 dark:text-white/80 drop-shadow-md" />
          <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-[#0d0d0d] dark:bg-white rounded-full blur-[2px]" />
        </motion.div>

        <svg width="150" height="10" viewBox="0 0 150 10" className="absolute -bottom-2 left-0 overflow-visible opacity-40 dark:opacity-60">
          <motion.path
            d="M 0,5 Q 40,0 80,5 T 150,2" fill="transparent" stroke="url(#gradient-line)" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0, 0], opacity: [0, 1, 1, 0, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 0.8, 1] }}
          />
          <defs>
            <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="50%" stopColor={isDarkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
}

// 🌟 重构：极致高级感 3D 悬浮阵列与透视网格
const PremiumHeroGraphics = ({ isDarkMode }) => {
  return (
    <div className="absolute right-0 top-0 w-full md:w-[60%] h-full z-0 pointer-events-none flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
      
      {/* 中心环境漫反射光 - 更柔和 */}
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[60vw] h-[60vw] md:w-[700px] md:h-[700px] rounded-full bg-black dark:bg-white blur-[140px]"
      />

      {/* 3D 空间透视同心圆/雷达网格 - Apple 式极简线框 */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute flex items-center justify-center"
        style={{ transform: 'rotateX(65deg) translateY(100px)', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-[90vw] h-[90vw] md:w-[900px] md:h-[900px] rounded-full border border-black/[0.03] dark:border-white/[0.03]" />
        <div className="absolute w-[65vw] h-[65vw] md:w-[650px] md:h-[650px] rounded-full border border-black/[0.05] border-t-black/10 dark:border-white/[0.05] dark:border-t-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_40px_rgba(255,255,255,0.02)]" />
        <div className="absolute w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] rounded-full border border-dashed border-black/[0.05] dark:border-white/[0.05]" />
      </motion.div>

      {/* 空间悬浮粒子 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{ y: [0, -120], opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
          className="absolute w-[2px] h-[2px] bg-black dark:bg-white rounded-full blur-[0.5px]"
          style={{ 
            left: `${20 + Math.random() * 60}%`, top: `${40 + Math.random() * 30}%`,
            transformStyle: 'preserve-3d', transform: `translateZ(${Math.random() * 200 - 100}px)`
          }}
        />
      ))}

      {/* 悬浮 Mica 主板 */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotateX: [12, 16, 12], rotateZ: [-4, -1, -4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-64 md:w-64 md:h-80 rounded-[32px] bg-white/30 dark:bg-white/[0.02] backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] translate-x-12 -translate-y-12 flex flex-col justify-between p-6 z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
        <div className="w-10 h-10 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/60 dark:text-white/60 shadow-sm"><LucideLayers size={16}/></div>
        <div className="space-y-3">
          <div className="h-1.5 w-16 bg-gradient-to-r from-black/30 to-black/10 dark:from-white/30 dark:to-white/10 rounded-full" />
          <div className="h-1 w-10 bg-black/10 dark:bg-white/10 rounded-full" />
        </div>
      </motion.div>

      {/* 悬浮侧板 */}
      <motion.div
        animate={{ y: [12, -12, 12], rotateY: [-12, -6, -12], rotateZ: [4, 7, 4] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-32 h-40 md:w-48 md:h-56 rounded-[24px] bg-gradient-to-tr from-white/10 to-white/40 dark:from-white/[0.01] dark:to-white/[0.04] backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl -translate-x-32 translate-y-24 flex items-end p-5 z-20 overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
         <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
         <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -skew-x-12 z-0" />
         <div className="h-1 w-full bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent rounded-full z-10" />
      </motion.div>

      <PenWritingEffect isDarkMode={isDarkMode} />
    </div>
  );
};


// --- 页面主体 ---

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="min-h-screen bg-[#f4f2f0] dark:bg-[#060608] text-[#0d0d0d] dark:text-white/90 font-sans selection:bg-black/20 dark:selection:bg-white/20 selection:text-black dark:selection:text-white overflow-x-hidden transition-colors duration-700"
    >
      <CustomCursor />

      {/* 🚀 提升：全局背景系统 (Mica 基础 + 透视网格 + 噪点) */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-50 dark:opacity-40 transition-colors duration-700"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'} 0%, transparent 100%)`
        }}
      />
      {/* 细微科技网格纹理 */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] dark:opacity-[0.02]" 
           style={{ backgroundImage: `linear-gradient(${isDarkMode ? 'white' : 'black'} 1px, transparent 1px), linear-gradient(90deg, ${isDarkMode ? 'white' : 'black'} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      {/* SVG 噪点层 */}
      <div className="fixed inset-0 pointer-events-none z-[2] opacity-[0.04] dark:opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 导航栏：Apple HIG “灵动”质感 */}
      <nav className={`fixed top-0 w-full z-50 px-6 md:px-24 transition-all duration-500 ease-out ${scrolled ? 'py-4' : 'py-8'}`}>
        <div className={`w-full flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/60 dark:bg-[#1a1a1c]/60 backdrop-blur-2xl border border-black/5 dark:border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.3)] rounded-full px-6 py-3' : ''}`}>
          <div className="flex items-center gap-3 font-sans text-lg font-bold tracking-tight text-[#0d0d0d] dark:text-white/90">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-black dark:bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] dark:shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
            />
            风男视觉
          </div>
          <div className="flex items-center">
            {/* 导航按钮 */}
            <div className="hidden md:flex gap-1 p-1 rounded-full bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 shadow-inner">
              {['About', 'Lab', 'Works', 'Downloads', 'Contact'].map(item => (
                <motion.a 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  key={item} href={`#${item.toLowerCase()}`} 
                  className="px-5 py-2 rounded-full font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 shadow-sm hover:shadow-md transition-all"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* 昼夜切换按钮 */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`ml-4 p-3 rounded-full border transition-all duration-300 ${scrolled ? 'bg-black/5 border-transparent dark:bg-white/10' : 'bg-white/50 border-black/5 shadow-sm dark:bg-white/5 dark:border-white/10'} text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <LucideSun size={16} /> : <LucideMoon size={16} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* 1. HERO 区域 */}
      <section className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-24 pt-20 overflow-hidden">
        <PremiumHeroGraphics isDarkMode={isDarkMode} />

        <div className="max-w-5xl z-10 pointer-events-none">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-black/40 dark:bg-white/40" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-black/70 dark:text-white/70 uppercase font-bold">3D Designer · Indie Developer</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[5rem] md:text-[8vw] font-sans font-black leading-[0.9] tracking-tighter mb-6 text-[#0d0d0d] dark:text-white pointer-events-auto relative drop-shadow-sm">
            Walk With<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#0d0d0d] to-black/30 dark:from-white dark:to-white/40">the Wind.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-3xl font-light text-black/60 dark:text-white/50 tracking-[0.1em] mb-8">
            走路带风的男人
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-md text-black/60 dark:text-white/50 text-sm md:text-base leading-relaxed font-normal mb-12 pointer-events-auto">
            用 3D 视觉与 AI 技术构建下一代创作体验。<br/>
            Creative Lab 创始人，集成三大引擎的 AI 绘图工具。
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4">
          <motion.div 
            animate={{ scaleY: [1, 1.5, 1], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-12 bg-gradient-to-b from-black/40 dark:from-white/40 to-transparent rounded-full" 
          />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-black/40 dark:text-white/40 font-semibold">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Ticker */}
      <div className="w-full overflow-hidden border-y border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 py-4 z-10 relative backdrop-blur-md">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap w-max"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 font-mono text-[10px] tracking-[0.25em] text-black/50 dark:text-white/40 uppercase font-semibold">
              <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">3D Design <em className="text-black/30 dark:text-white/30 ml-4 not-italic">✦</em></span>
              <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">AI Image Gen <em className="text-black/30 dark:text-white/30 ml-4 not-italic">✦</em></span>
              <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">Creative Lab <em className="text-black/30 dark:text-white/30 ml-4 not-italic">✦</em></span>
              <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">风男视觉 <em className="text-black/30 dark:text-white/30 ml-4 not-italic">✦</em></span>
              <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">Indie Developer <em className="text-black/30 dark:text-white/30 ml-4 not-italic">✦</em></span>
              <span className="hover:text-black dark:hover:text-white transition-colors cursor-default">Motion Design <em className="text-black/30 dark:text-white/30 ml-4 not-italic">✦</em></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. 关于我 ABOUT */}
      <section id="about" className="px-6 md:px-24 py-32 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start max-w-[1400px] mx-auto">
          <div className="md:col-span-4 sticky top-32">
            <div className="aspect-[3/4] rounded-[32px] border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.02] backdrop-blur-3xl overflow-hidden relative group shadow-sm transition-colors">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] dark:from-white/[0.02] to-transparent" />
              <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
              
              <motion.div 
                animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-black/10 dark:border-white/10 opacity-50 pointer-events-none" 
              />
              
              <motion.div 
                animate={{ y: [-8, 8, -8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-700 saturate-0 opacity-80 group-hover:opacity-100 drop-shadow-xl">🌬️</span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-black/60 dark:text-white/60 uppercase font-bold">Creator</span>
              </motion.div>
              
              <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-black/20 dark:border-white/20" />
              <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-black/20 dark:border-white/20" />
            </div>
          </div>
          
          <div className="md:col-span-8 md:pl-12">
            <SectionHeader num="01" subtitle="About Me" title="3D 设计师与" highlight="独立开发者" />
            
            <div className="space-y-8 text-black/70 dark:text-white/60 text-base md:text-lg leading-relaxed font-normal max-w-2xl">
              <p>我是走路带风的男人，专注于 3D 视觉创作与 AI 工具开发的独立创作者。多年来深耕数字艺术领域，我始终相信技术与创意之间没有边界。</p>
              <p>凭借对美学的极致追求，我创建了 Creative Lab —— 一款将三大业界顶尖 AI 引擎整合于单一工作流的绘图工具，同时配备 AI 配音功能，让每位创作者都能轻松掌握 AI 的力量。</p>
            </div>
            
            <div className="h-[1px] w-full bg-black/10 dark:bg-white/10 my-12" />
            
            <div className="flex flex-wrap gap-3">
              {['3D Modeling', 'AI Image Gen', 'Motion Design', 'Indie Dev', 'C4D', 'ComfyUI', 'AI Dubbing'].map((skill, i) => (
                <span key={skill} className={`font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border ${i % 2 === 0 ? 'border-black/20 text-black bg-white dark:border-white/20 dark:text-white dark:bg-white/10 shadow-sm font-bold' : 'border-black/10 text-black/60 bg-transparent dark:border-white/10 dark:text-white/50'} transition-all cursor-default hover:-translate-y-0.5 hover:shadow-md`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREATIVE LAB */}
      <section id="lab" className="px-6 md:px-24 py-32 border-y border-black/5 dark:border-white/5 bg-white/30 dark:bg-black/20 relative backdrop-blur-sm transition-colors">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader num="02" subtitle="My Product" title="Creative" highlight="Lab." />
          <p className="text-black/60 dark:text-white/50 max-w-lg mb-16 leading-relaxed text-base">集成三大 AI 引擎的专业绘图平台。生图、改图、扩图、AI配音，一站式完成所有创作。已完美适配 Windows 与 macOS。</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <SpotlightCard isDarkMode={isDarkMode}
                category="001 / CORE" icon={<LucideCpu />} title="三大引擎，一体化工作流"
                desc="深度整合三款业界顶尖 AI 绘图引擎，以统一界面覆盖从提示词生图、图生图、局部重绘到智能扩图的完整流程。告别繁琐的工具切换。"
                tags={['文生图', '局部重绘', '批量生成']} 
              />
            </div>
            <SpotlightCard isDarkMode={isDarkMode}
              category="002 / AUDIO" icon={<LucideVolume2 />} title="AI 配音模块"
              desc="内置高质量 AI 配音引擎，支持多音色与多情感调节，一键赋予视觉作品声音维度。"
            />
            <SpotlightCard isDarkMode={isDarkMode}
              category="003 / UX" icon={<LucideSparkles />} title="极简交互设计"
              desc="直觉化交互操作，极简学习曲线。无论是专业设计师还是自媒体创作者都能光速上手。"
            />
            <div className="md:col-span-2">
              <SpotlightCard isDarkMode={isDarkMode}
                category="004 / EVOLUTION" icon={<LucideRefreshCw />} title="持续进化的能力边界"
                desc="保持高频更新迭代，持续为创作者接入最新的 AI 模型与工作流技术，确保你的创作武库永远处于业界前沿。真正做到开箱即用。"
                tags={['Windows', 'macOS', 'Auto Update']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORKS 作品 */}
      <section id="works" className="px-6 md:px-24 py-32 z-10 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <SectionHeader num="03" subtitle="Selected Works" title="Featured" highlight="Projects" />
            <div className="text-right hidden md:block pb-4">
              <div className="font-sans font-black text-6xl tracking-tighter text-black/5 dark:text-white/5 mb-2">06</div>
              <div className="font-mono text-[9px] tracking-[0.25em] text-black/40 dark:text-white/30 uppercase font-semibold">Curated Case Studies</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            <div className="md:col-span-8 md:row-span-2">
              <SpotlightCard isDarkMode={isDarkMode}
                category="3D · C4D" title="Just do it" desc="放下完美主义，才是真正的成长开始，后面就是稳稳的改进，持续的坚持，你所有的付出终会潜移默化得给到你反馈。" icon={<LucideLayers/>} 
                image="/images/1.png"
              />
            </div>
            <div className="md:col-span-4">
              <SpotlightCard isDarkMode={isDarkMode}
                category="AI · Creative Lab" title="量子空间" desc="基于多模态大模型的参数化生成艺术" icon={<LucideSparkles/>} 
                image="/images/2.png"
              />
            </div>
            <div className="md:col-span-4">
              <SpotlightCard isDarkMode={isDarkMode}
                category="3D · Motion" title="熔岩地形" desc="流体物理与地形侵蚀动态模拟" icon={<LucideWind/>} 
                image="/images/3.png"
              />
            </div>
            <div className="md:col-span-4">
              <SpotlightCard isDarkMode={isDarkMode}
                category="AI · Image Gen" title="幽境森林" desc="环境概念氛围图与暗调光影重构" icon={<LucideImage/>} 
                image="/images/4.png"
              />
            </div>
            <div className="md:col-span-4">
              <SpotlightCard isDarkMode={isDarkMode}
                category="3D · VFX" title="赛博圣殿" desc="次世代环境与全局光照研究" icon={<LucideMonitorPlay/>} 
                image="/images/5.png"
              />
            </div>
            <div className="md:col-span-4">
              <SpotlightCard isDarkMode={isDarkMode}
                category="AI · ComfyUI" title="GT3 RS CGI" desc="全自动化节点式工作流产出" icon={<LucideCpu/>} 
                image="/images/6.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. DOWNLOADS 下载 */}
      <section id="downloads" className="px-6 md:px-24 py-32 border-y border-black/5 dark:border-white/5 bg-white/30 dark:bg-black/20 relative backdrop-blur-sm transition-colors">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader num="04" subtitle="Resources" title="Free" highlight="Downloads." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { t: 'C4D 场景源文件包', d: '多套完整 C4D 工程文件，覆盖科幻场景、自然地貌等风格。', s: '~1.6 GB', i: <LucideBox size={24}/>, link: 'https://space.bilibili.com/430797768' },
              { t: 'ComfyUI 工作流模板', d: '精心整理的工作流合集，文生图、局部重绘常用管线，开箱即用。', s: '~45 MB', i: <LucideCpu size={24}/>, link: 'https://gkqxmddvvj.feishu.cn/wiki/UH2WwjshxiLOV8kLQKgcdXRinP5' },
              { t: 'Creative Lab 安装包', d: '最新版，集成三大引擎与AI配音，支持 Win / Mac。', s: '~.exe / .dmg', i: <LucideDownload size={24}/>, link: 'https://space.bilibili.com/430797768' },
              { t: 'AI 提示词合集', d: '实战验证的 Prompt 宝典，覆盖材质、光效等核心出图维度。', s: '~8 MB', i: <LucideImage size={24}/>, link: 'https://gkqxmddvvj.feishu.cn/wiki/UH2WwjshxiLOV8kLQKgcdXRinP5' },
              { t: '3D 设计系列教程', d: '系统化 3D 学习课程，视频讲解+配套工程文件源码。', s: 'Video Series', i: <LucideVideo size={24}/>, link: 'https://space.bilibili.com/430797768' },
              { t: 'HDR 光照贴图素材', d: '高质量工业级 HDR 环境贴图，直接用于 C4D / UE5。', s: '~600 MB', i: <LucideSparkles size={24}/>, link: 'https://gkqxmddvvj.feishu.cn/wiki/UH2WwjshxiLOV8kLQKgcdXRinP5' }
            ].map((item, idx) => (
              <motion.a 
                href={item.link} target="_blank" rel="noopener noreferrer" key={idx} 
                whileHover={{ y: -6, scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative p-8 md:p-10 rounded-[32px] bg-white/40 dark:bg-white/[0.02] backdrop-blur-2xl border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all flex flex-col cursor-pointer group block overflow-hidden"
              >
                <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
                <motion.div animate={{ x: ['-200%', '200%'] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 + idx, ease: "easeInOut" }} className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-black/[0.03] dark:via-white/[0.03] to-transparent -skew-x-12 z-0 pointer-events-none" />
                
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors">{item.i}</div>
                  <span className="text-[9px] font-mono border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80 px-2 py-1 rounded bg-black/5 dark:bg-white/5 font-bold shadow-sm">FREE</span>
                </div>
                <h4 className="relative z-10 font-sans font-bold text-lg mb-3 text-[#0d0d0d] dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors">{item.t}</h4>
                <p className="relative z-10 text-sm text-black/60 dark:text-white/50 leading-relaxed flex-grow mb-8">{item.d}</p>
                <div className="relative z-10 flex justify-between items-center pt-5 border-t border-black/10 dark:border-white/10">
                  <span className="font-mono text-[10px] text-black/40 dark:text-white/40 font-semibold">{item.s}</span>
                  <span className="font-mono text-[10px] text-black/60 dark:text-white/60 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 group-hover:text-black dark:group-hover:text-white transition-all font-bold">
                    Get <LucideArrowUpRight size={14}/>
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT 联系 */}
      <section id="contact" className="px-6 md:px-24 py-32 z-10 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <SectionHeader num="05" subtitle="Get in Touch" title="Let's" highlight="Connect." />
            <p className="text-black/60 dark:text-white/50 text-base leading-relaxed mb-12 max-w-md">有合作意向、创作咨询，或者只是想打个招呼？<br/>通过以下方式都可以随时找到我。</p>
            
            <div className="space-y-3">
              {[
                { name: '哔哩哔哩', handle: 'space.bilibili.com/430797768', icon: <LucideMonitorPlay size={20}/>, link: 'https://space.bilibili.com/430797768' },
                { name: '站酷 ZCOOL', handle: 'zcool.com.cn/u/17233702', icon: <LucideImage size={20}/>, link: '#' },
                { name: '微信公众号', handle: '风男视觉 — 微信搜索', icon: <LucideMousePointer2 size={20}/>, link: '#' }
              ].map(social => (
                <a key={social.name} href={social.link} target={social.link !== '#' ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-6 p-4 -ml-4 rounded-2xl hover:bg-white/60 dark:hover:bg-white/[0.03] transition-colors group">
                  <div className="w-14 h-14 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 flex items-center justify-center text-black/50 dark:text-white/50 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:shadow-lg transition-all duration-300">
                    {social.icon}
                  </div>
                  <div>
                    <div className="font-sans font-bold text-lg tracking-tight text-[#0d0d0d] dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors">{social.name}</div>
                    <div className="font-mono text-[11px] text-black/50 dark:text-white/40 mt-1">{social.handle}</div>
                  </div>
                  <LucideArrowUpRight className="ml-auto text-black/20 dark:text-white/20 group-hover:text-black dark:group-hover:text-white transition-colors" size={24}/>
                </a>
              ))}
            </div>
          </div>

          {/* 高级质感表单 */}
          <div className="bg-white/50 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[40px] p-8 md:p-14 relative overflow-hidden shadow-2xl dark:shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 dark:via-white/20 to-transparent" />
            <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] pointer-events-none" />
            
            <h3 className="font-sans font-bold text-3xl tracking-tight mb-10 text-[#0d0d0d] dark:text-white/90">Send Message</h3>
            <form className="space-y-6 relative z-10">
              <div className="space-y-3">
                <label className="font-mono text-[10px] tracking-[0.25em] text-black/50 dark:text-white/50 uppercase font-semibold">Name</label>
                <input type="text" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-base text-[#0d0d0d] dark:text-white focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all shadow-inner" placeholder="你的名字" />
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[10px] tracking-[0.25em] text-black/50 dark:text-white/50 uppercase font-semibold">Email</label>
                <input type="email" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-base text-[#0d0d0d] dark:text-white focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all shadow-inner" placeholder="your@email.com" />
              </div>
              <div className="space-y-3">
                <label className="font-mono text-[10px] tracking-[0.25em] text-black/50 dark:text-white/50 uppercase font-semibold">Message</label>
                <textarea rows="4" className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-base text-[#0d0d0d] dark:text-white focus:outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 transition-all resize-none shadow-inner" placeholder="说点什么..." />
              </div>
              <button type="button" className="group w-full bg-gradient-to-b from-[#2a2a2a] to-[#0d0d0d] hover:from-[#404040] hover:to-[#1a1a1a] dark:from-white dark:to-gray-200 dark:hover:from-gray-100 dark:hover:to-gray-300 text-white dark:text-black font-mono text-[11px] tracking-[0.25em] uppercase font-bold py-5 rounded-2xl transition-all duration-300 flex justify-center items-center gap-3 mt-8 shadow-lg hover:shadow-xl border border-black/20 dark:border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">Send Message <LucideMail size={16} className="group-hover:translate-x-1 transition-transform"/></span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-24 py-12 border-t border-black/10 dark:border-white/10 bg-[#e8e5e1] dark:bg-[#040406] flex flex-col md:flex-row justify-between items-center gap-8 relative z-10 transition-colors duration-700">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3 font-sans text-lg font-bold tracking-tight text-[#0d0d0d] dark:text-white/90">
            <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-2 h-2 rounded-full bg-black dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.4)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]" /> 
            风男视觉
          </div>
          <a href="mailto:1115914765@qq.com" className="font-mono text-[11px] tracking-[0.2em] text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2 border border-black/10 dark:border-white/10 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/[0.03] shadow-sm hover:shadow-md">
            <LucideMail size={14}/> 1115914765@qq.com
          </a>
        </div>
        
        <div className="font-mono text-[10px] tracking-[0.25em] text-black/40 dark:text-white/30 uppercase font-semibold">
          © 2026 走路带风的男人 · All Rights Reserved
        </div>
        
        <a href="#" className="font-mono text-[10px] tracking-[0.25em] text-black/60 dark:text-white/50 uppercase hover:text-black dark:hover:text-white font-bold transition-colors">
          ↑ Back to Top
        </a>
      </footer>
    </div>
  );
}
