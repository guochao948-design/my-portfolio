import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LucideLayers, LucideCpu, LucideWind, LucideArrowUpRight, 
  LucideMousePointer2, LucideBox, LucideDownload, LucideMail,
  LucideVideo, LucideImage, LucideMonitorPlay, LucideSparkles,
  LucideVolume2, LucideRefreshCw
} from 'lucide-react';

/**
 * 顶级 Antigravity Portfolio v3.0 (Linear / Apple HIG 质感)
 * 更新：全面剔除黄色，改用极致黑白灰阶、Linear高光与全新 3D 悬浮玻璃阵列
 */

// --- 基础 UI 组件库 ---

const SectionHeader = ({ num, title, highlight, subtitle }) => (
  <div className="mb-16 md:mb-24">
    <motion.div 
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="flex items-center gap-4 mb-6"
    >
      <span className="font-mono text-[10px] tracking-widest text-white/30">{num}</span>
      <div className="h-[1px] w-12 bg-white/20" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-white/80 uppercase">{subtitle}</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-sans font-bold tracking-normal leading-normal md:leading-snug py-2 text-white"
    >
      {title}
      {highlight && (
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 ml-2 md:ml-4 font-black">
          {highlight}
        </span>
      )}
    </motion.h2>
  </div>
);

const GlassCard = ({ title, desc, icon, category, tags = [], image = null, className = "" }) => (
  <motion.div
    whileHover={{ y: -8 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className={`group relative h-full p-8 md:p-10 rounded-[32px] overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 ${className}`}
  >
    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl saturate-150 z-0" />
    
    {image && (
      <div className="absolute inset-0 z-[5] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-luminosity group-hover:mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent" />
      </div>
    )}

    {/* Linear 风格极致高光倒角 */}
    <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
    
    <div className="relative z-20 h-full flex flex-col">
      <div className="flex justify-between items-start mb-10">
        <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-500`}>
          {icon}
        </div>
        {category && <span className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">{category}</span>}
      </div>
      
      <h3 className="text-xl md:text-2xl font-sans font-bold mb-4 text-white/90 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-white/40 text-sm leading-loose font-light flex-grow">
        {desc}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-8">
          {tags.map(tag => (
            <span key={tag} className="font-mono text-[9px] tracking-widest px-3 py-1.5 rounded-full border border-white/10 text-white/50 bg-white/5">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    {/* 悬停微弱内发光 */}
    <div className="absolute -inset-px bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
  </motion.div>
);

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-white/40 pointer-events-none z-[9999] items-center justify-center mix-blend-screen hidden md:flex"
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.2 }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
};

// 🌟 全新重构：极致高级感 3D 悬浮阵列与透视网格 (Linear/Apple HIG 风格)
const PremiumHeroGraphics = () => {
  return (
    <div className="absolute right-0 top-0 w-full md:w-[60%] h-full z-0 pointer-events-none flex items-center justify-center overflow-hidden" style={{ perspective: '1000px' }}>
      
      {/* 极简高级的中心环境漫反射光 */}
      <motion.div
        animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] rounded-full bg-white blur-[120px]"
      />

      {/* 3D 空间透视同心圆/雷达网格 */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute flex items-center justify-center"
        style={{ transform: 'rotateX(60deg) translateY(100px)', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute w-[80vw] h-[80vw] md:w-[800px] md:h-[800px] rounded-full border border-white/5" />
        <div className="absolute w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] rounded-full border border-white/[0.08] border-t-white/20" />
        <div className="absolute w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] rounded-full border border-white/5 border-b-white/10" />
      </motion.div>

      {/* 悬浮 Mica 材质玻璃板 - 主体 */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotateX: [10, 15, 10], rotateZ: [-5, -2, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-64 md:w-64 md:h-80 rounded-[32px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.03)] translate-x-12 -translate-y-12 flex flex-col justify-between p-6"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50"><LucideLayers size={14}/></div>
        <div className="space-y-2">
          <div className="h-1 w-12 bg-white/20 rounded-full" />
          <div className="h-1 w-8 bg-white/10 rounded-full" />
        </div>
      </motion.div>

      {/* 悬浮 Mica 材质玻璃板 - 侧配 */}
      <motion.div
        animate={{ y: [15, -15, 15], rotateY: [-10, -5, -10], rotateZ: [5, 8, 5] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-32 h-40 md:w-48 md:h-56 rounded-[24px] bg-gradient-to-tr from-white/[0.01] to-white/[0.05] backdrop-blur-2xl border border-white/[0.08] shadow-2xl -translate-x-32 translate-y-24 flex items-end p-5"
        style={{ transformStyle: 'preserve-3d' }}
      >
         <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
      </motion.div>
    </div>
  );
};


// --- 页面主体 ---

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      className="min-h-screen bg-[#060608] text-white font-sans selection:bg-white/20 selection:text-white overflow-x-hidden"
    >
      <CustomCursor />

      {/* 环境光 & 噪点 */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04) 0%, transparent 100%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 50%)
          `
        }}
      />
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 导航栏：统一内边距，确保 Logo 与底部一致对齐 */}
      <nav className={`fixed top-0 w-full z-50 px-6 md:px-24 py-6 transition-all duration-500 ${scrolled ? 'bg-[#060608]/70 backdrop-blur-2xl border-b border-white/5 py-4' : ''}`}>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-3 font-sans text-lg font-bold text-white/90">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
            风男视觉
          </div>
          <div className="hidden md:flex gap-2 p-1.5 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-xl shadow-black/50">
            {['About', 'Lab', 'Works', 'Downloads', 'Contact'].map(item => (
              <motion.a 
                whileHover={{ scale: 1.1 }}
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="px-5 py-2 rounded-full font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>

      {/* 1. HERO 区域 */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 overflow-hidden">
        {/* 全新极致高级感 3D 悬浮网格 */}
        <PremiumHeroGraphics />

        <div className="max-w-5xl z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-8 bg-white/40" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/80 uppercase font-bold">3D Designer · Indie Developer</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-6xl md:text-[8vw] font-sans font-black leading-[0.9] tracking-tighter mb-6 text-white">
            Walk With<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">the Wind.</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl md:text-3xl font-light text-white/40 tracking-[0.1em] mb-8">
            走路带风的男人
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-md text-white/40 text-sm md:text-base leading-loose font-light mb-12">
            用 3D 视觉与 AI 技术构建下一代创作体验。<br/>
            Creative Lab 创始人，集成三大引擎的 AI 绘图工具。
          </motion.p>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-12 left-6 md:left-24 flex items-center gap-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Ticker (无限滚动条) */}
      <div className="w-full overflow-hidden border-y border-white/5 bg-white/[0.01] py-4 z-10 relative backdrop-blur-sm">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex whitespace-nowrap w-max"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 px-6 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
              <span>3D Design <em className="text-white/60 ml-2 not-italic">✦</em></span>
              <span>AI Image Gen <em className="text-white/60 ml-2 not-italic">✦</em></span>
              <span>Creative Lab <em className="text-white/60 ml-2 not-italic">✦</em></span>
              <span>风男视觉 <em className="text-white/60 ml-2 not-italic">✦</em></span>
              <span>Indie Developer <em className="text-white/60 ml-2 not-italic">✦</em></span>
              <span>Motion Design <em className="text-white/60 ml-2 not-italic">✦</em></span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 2. 关于我 ABOUT */}
      <section id="about" className="px-6 md:px-24 py-32 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 sticky top-32">
            <div className="aspect-[3/4] rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-500 saturate-0 opacity-80 group-hover:opacity-100">🌬️</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase font-bold">Creator</span>
              </div>
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
            </div>
          </div>
          
          <div className="md:col-span-8 md:pl-12">
            <SectionHeader num="01" subtitle="About Me" title="3D 设计师与" highlight="独立开发者" />
            
            <div className="space-y-6 text-white/50 text-sm leading-loose font-light max-w-2xl">
              <p>我是走路带风的男人，专注于 3D 视觉创作与 AI 工具开发的独立创作者。多年来深耕数字艺术领域，我始终相信技术与创意之间没有边界。</p>
              <p>凭借对美学的极致追求，我创建了 Creative Lab —— 一款将三大业界顶尖 AI 引擎整合于单一工作流的绘图工具，同时配备 AI 配音功能，让每位创作者都能轻松掌握 AI 的力量。</p>
            </div>
            
            <div className="h-[1px] w-full bg-white/5 my-12" />
            
            <div className="flex flex-wrap gap-3">
              {['3D Modeling', 'AI Image Gen', 'Motion Design', 'Indie Dev', 'C4D', 'ComfyUI', 'AI Dubbing'].map((skill, i) => (
                <span key={skill} className={`font-mono text-[10px] tracking-widest px-4 py-2 rounded-full border ${i % 2 === 0 ? 'border-white/20 text-white bg-white/5 font-bold' : 'border-white/5 text-white/40 bg-transparent'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. CREATIVE LAB */}
      <section id="lab" className="px-6 md:px-24 py-32 border-y border-white/5 bg-white/[0.01] relative">
        <SectionHeader num="02" subtitle="My Product" title="Creative" highlight="Lab." />
        <p className="text-white/40 max-w-lg mb-16 leading-loose text-sm">集成三大 AI 引擎的专业绘图平台。生图、改图、扩图、AI配音，一站式完成所有创作。已支持 Windows / macOS。</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <GlassCard 
              category="001 / CORE" icon={<LucideCpu />} title="三大引擎，一体化工作流"
              desc="深度整合三款业界顶尖 AI 绘图引擎，以统一界面覆盖从提示词生图、图生图、局部重绘到智能扩图的完整流程。无需在多个工具间切换。"
              tags={['文生图', '局部重绘', '批量生成']} className="bg-gradient-to-br from-white/[0.03] to-transparent"
            />
          </div>
          <GlassCard 
            category="002 / AUDIO" icon={<LucideVolume2 />} title="AI 配音功能"
            desc="内置高质量 AI 配音模块，支持多音色多情感，一键为视觉作品赋予声音维度。"
          />
          <GlassCard 
            category="003 / UX" icon={<LucideSparkles />} title="为创作者设计"
            desc="直觉化交互，极简学习曲线。无论是专业设计师还是内容创作者，都能快速驾驭。"
          />
          <div className="md:col-span-2">
            <GlassCard 
              category="004 / EVOLUTION" icon={<LucideRefreshCw />} title="持续进化的能力边界"
              desc="保持高频更新迭代，持续整合最新 AI 模型与工作流技术，让你的创作工具始终站在技术前沿。开箱即用。"
              tags={['Windows', 'macOS', 'Auto Update']}
            />
          </div>
        </div>
      </section>

      {/* 4. WORKS 作品 */}
      <section id="works" className="px-6 md:px-24 py-32 z-10 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SectionHeader num="03" subtitle="Selected Works" title="Featured" highlight="Projects" />
          <div className="text-right hidden md:block">
            <div className="font-sans font-bold text-6xl text-white/5 mb-2">06</div>
            <div className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Curated Case Studies</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[280px]">
          <div className="md:col-span-8 md:row-span-2">
            <GlassCard 
              category="3D · C4D" title="星际边界" desc="探索非线性光影在 3D 空间中的折射表现，利用渲染引擎实现极致的色散质感。这是一个关于维度纠缠的视觉实验。" icon={<LucideLayers/>} className="bg-white/[0.01]" 
              image="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=2000&auto=format&fit=crop"
            />
          </div>
          <div className="md:col-span-4">
            <GlassCard 
              category="AI · Creative Lab" title="量子空间" desc="基于多模态大模型的参数化生成艺术" icon={<LucideSparkles/>} 
              image="https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
          <div className="md:col-span-4">
            <GlassCard 
              category="3D · Motion" title="熔岩地形" desc="流体物理与地形侵蚀模拟" icon={<LucideWind/>} 
              image="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
          <div className="md:col-span-4">
            <GlassCard 
              category="AI · Image Gen" title="幽境森林" desc="环境概念氛围图与暗调光影重构" icon={<LucideImage/>} 
              image="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
          <div className="md:col-span-4">
            <GlassCard 
              category="3D · VFX" title="赛博圣殿" desc="次世代环境与全局光照研究" icon={<LucideMonitorPlay/>} 
              image="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
          <div className="md:col-span-4">
            <GlassCard 
              category="AI · ComfyUI" title="数字生命" desc="全自动化节点式工作流产出" icon={<LucideCpu/>} 
              image="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* 5. DOWNLOADS 下载 */}
      <section id="downloads" className="px-6 md:px-24 py-32 border-y border-white/5 bg-white/[0.01] relative">
        <SectionHeader num="04" subtitle="Resources" title="Free" highlight="Downloads." />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: 'C4D 场景源文件包', d: '多套完整 C4D 工程文件，覆盖科幻场景、自然地貌等风格。', s: '~280 MB', i: <LucideBox/>, link: 'https://space.bilibili.com/430797768' },
            { t: 'ComfyUI 工作流模板', d: '精心整理的工作流合集，文生图、局部重绘常用管线，开箱即用。', s: '~45 MB', i: <LucideCpu/>, link: 'https://gkqxmddvvj.feishu.cn/wiki/UH2WwjshxiLOV8kLQKgcdXRinP5' },
            { t: 'Creative Lab 安装包', d: '最新版，集成三大引擎与AI配音，支持 Win / Mac。', s: '~1.2 GB', i: <LucideDownload/>, link: 'https://space.bilibili.com/430797768' },
            { t: 'AI 提示词合集', d: '实战验证的 Prompt 宝典，覆盖材质、光效等类别。', s: '~8 MB', i: <LucideImage/>, link: 'https://gkqxmddvvj.feishu.cn/wiki/UH2WwjshxiLOV8kLQKgcdXRinP5' },
            { t: '3D 设计系列教程', d: '系统化 3D 学习课程，视频讲解+配套工程文件。', s: 'Video', i: <LucideVideo/>, link: 'https://space.bilibili.com/430797768' },
            { t: 'HDR 光照贴图素材', d: '高质量 HDR 环境贴图，直接用于 C4D / UE5。', s: '~600 MB', i: <LucideSparkles/>, link: 'https://gkqxmddvvj.feishu.cn/wiki/UH2WwjshxiLOV8kLQKgcdXRinP5' }
          ].map((item, idx) => (
            <motion.a 
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={idx} 
              whileHover={{ y: -5 }}
              className="p-8 rounded-[24px] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col cursor-pointer group block"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="text-white/40 group-hover:text-white transition-colors">{item.i}</div>
                <span className="text-[9px] font-mono border border-white/20 text-white/80 px-2 py-1 rounded bg-white/5 font-bold">FREE</span>
              </div>
              <h4 className="font-sans font-bold text-lg mb-2 text-white/90 group-hover:text-white">{item.t}</h4>
              <p className="text-xs text-white/40 leading-relaxed flex-grow mb-6">{item.d}</p>
              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="font-mono text-[9px] text-white/30">{item.s}</span>
                <span className="font-mono text-[9px] text-white/60 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 group-hover:text-white transition-all font-bold">
                  Get <LucideArrowUpRight size={12}/>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* 6. CONTACT 联系 */}
      <section id="contact" className="px-6 md:px-24 py-32 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <SectionHeader num="05" subtitle="Get in Touch" title="Let's" highlight="Connect." />
            <p className="text-white/40 text-sm leading-loose mb-12">有合作意向、创作咨询，或者只是想打个招呼？<br/>通过以下方式都可以找到我。</p>
            
            <div className="space-y-2">
              {[
                { name: '哔哩哔哩', handle: 'space.bilibili.com/430797768', icon: <LucideMonitorPlay size={20}/>, link: 'https://space.bilibili.com/430797768' },
                { name: '站酷 ZCOOL', handle: 'zcool.com.cn/u/17233702', icon: <LucideImage size={20}/>, link: '#' },
                { name: '微信公众号', handle: '风男视觉 — 微信搜索', icon: <LucideMousePointer2 size={20}/>, link: '#' }
              ].map(social => (
                <a key={social.name} href={social.link} target={social.link !== '#' ? "_blank" : "_self"} rel="noopener noreferrer" className="flex items-center gap-6 p-4 -ml-4 rounded-2xl hover:bg-white/[0.03] transition-colors group">
                  <div className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all duration-300">
                    {social.icon}
                  </div>
                  <div>
                    <div className="font-sans font-bold text-white/80 group-hover:text-white transition-colors">{social.name}</div>
                    <div className="font-mono text-[10px] text-white/30 mt-1">{social.handle}</div>
                  </div>
                  <LucideArrowUpRight className="ml-auto text-white/10 group-hover:text-white transition-colors" size={20}/>
                </a>
              ))}
            </div>
          </div>

          {/* 毛玻璃表单 */}
          <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.02)]">
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <h3 className="font-sans font-bold text-2xl mb-8 text-white/90">Send Message</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors" placeholder="你的名字" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Email</label>
                <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase">Message</label>
                <textarea rows="4" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 transition-colors resize-none" placeholder="说点什么..." />
              </div>
              <button type="button" className="w-full bg-white hover:bg-gray-200 text-black font-mono text-[10px] tracking-widest uppercase font-bold py-4 rounded-xl transition-all duration-300 flex justify-center items-center gap-2 mt-4 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                Send Message <LucideMail size={14}/>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER - 统一内边距 */}
      <footer className="px-6 md:px-24 py-12 border-t border-white/5 bg-[#060608] flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3 font-sans text-lg font-bold text-white/90">
            <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" /> 风男视觉
          </div>
          {/* 底部新增邮箱入口 */}
          <a href="mailto:571982349@qq.com" className="font-mono text-[10px] tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2 border border-white/10 px-4 py-2 rounded-full bg-white/[0.02]">
            <LucideMail size={12}/> 571982349@qq.com
          </a>
        </div>
        
        <div className="font-mono text-[9px] tracking-widest text-white/20 uppercase">
          © 2026 走路带风的男人 · All Rights Reserved
        </div>
        
        <a href="#" className="font-mono text-[9px] tracking-widest text-white/50 uppercase hover:text-white font-bold transition-colors">
          ↑ Back to Top
        </a>
      </footer>
    </div>
  );
}
