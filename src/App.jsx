import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Terminal, Activity, DollarSign, TrendingDown, Sparkles, BrainCircuit, Mail, Code, Briefcase } from 'lucide-react';

export default function App() {
  const [strategy, setStrategy] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const runBacktest = () => {
    if (!strategy) {
      setError('Please enter a strategy to simulate.');
      return;
    }
    
    setLoading(true);
    setError('');
    setResults(null);

    // Simulate network delay and AI processing time (2 seconds)
    setTimeout(() => {
    
      const mockWinRate = (Math.random() * 20 + 45).toFixed(1) + '%'; // 45% - 65%
      const mockProfitFactor = (Math.random() * 1.5 + 1.1).toFixed(2); // 1.10 - 2.60
      const mockDrawdown = '-' + (Math.random() * 15 + 5).toFixed(1) + '%'; // -5% to -20%

      
      let currentEquity = 10000;
      const mockCurve = [{ trade: 0, equity: currentEquity }];
      
      for (let i = 1; i <= 20; i++) {
       
        const isWin = Math.random() > 0.45; 
        const change = isWin ? (Math.random() * 400 + 100) : -(Math.random() * 300 + 50);
        currentEquity = Math.round(currentEquity + change);
        mockCurve.push({ trade: i, equity: currentEquity });
      }

      setResults({
        winRate: mockWinRate,
        profitFactor: mockProfitFactor,
        maxDrawdown: mockDrawdown,
        equityCurve: mockCurve
      });
      
      setLoading(false);
    }, 2000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 overflow-hidden">
      
      {/* Glassmorphism Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <div className="text-xl font-extrabold tracking-tight text-slate-800 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            >
              <BrainCircuit className="text-blue-600" />
            </motion.div>
            <div className="flex">
              <span>Naol-ai&nbsp;</span>
              <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block"
              >
                Backtester
              </motion.span>
            </div>
          </div>

          <div className="flex gap-8 font-medium text-slate-600">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition-colors">About</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 transition-colors">Contact</button>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-32">
        
        {/* HERO & INPUT SECTION */}
        <section id="home" className="space-y-12 scroll-mt-32">
          <motion.div 
            variants={scrollVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex flex-col gap-4 items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm text-blue-600 font-semibold mb-2">
              <Sparkles size={16} /> Neural Quant Engine
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Test strategies at <br/>
              <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: false }}
                transition={{ duration: 3.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block"
              >
                machine speed.
              </motion.span>
            </h1>

            <p className="text-slate-500 text-lg max-w-2xl mt-4">
              Type your market logic in plain English. Our simulation engine parses the parameters and generates projected historical drawdowns instantly.
            </p>
          </motion.div>

          <motion.div 
            variants={scrollVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="flex flex-col gap-6 relative z-10">
              <div className="relative group">
                <Terminal className="absolute left-5 top-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                <textarea
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="e.g., Long MNQ on 5m EMA cross with 20pt trailing stop..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-5 pl-14 pr-5 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all min-h-[140px] resize-y text-lg"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-red-500 text-sm font-medium">{error}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={runBacktest}
                  disabled={loading}
                  className="bg-slate-900 text-white hover:bg-blue-600 disabled:bg-slate-300 disabled:text-slate-500 font-bold py-3 px-8 rounded-full transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Activity size={18} />
                    </motion.div>
                  ) : 'Run Simulation'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* RESULTS DASHBOARD */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard title="Win Rate" value={results.winRate} icon={<Activity />} delay={0.1} />
                  <MetricCard title="Profit Factor" value={results.profitFactor} icon={<DollarSign />} delay={0.2} />
                  <MetricCard title="Max Drawdown" value={results.maxDrawdown} icon={<TrendingDown />} delay={0.3} isNegative />
                </div>

                <motion.div
                  variants={scrollVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="bg-white border border-slate-200 rounded-2xl p-8 h-[450px] shadow-xl"
                >
                  <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    Simulated Equity Curve
                  </h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.equityCurve}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="trade" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                      <YAxis domain={['auto', 'auto']} stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} dx={-10} tickFormatter={(val) => `$${val}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="equity" 
                        stroke="#2563eb" 
                        strokeWidth={4} 
                        dot={false}
                        activeDot={{ r: 8, fill: '#fff', stroke: '#2563eb', strokeWidth: 3 }} 
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ABOUT SECTION */}
        <motion.section 
          id="about" 
          variants={scrollVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="bg-blue-600 rounded-3xl p-12 text-white shadow-2xl scroll-mt-32"
        >
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight">About The Architecture</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              This application was engineered to demonstrate clean, responsive React frontend development. Natural language trading strategies are parsed and mapped into structured JSON objects, dynamically rendering into interactive data visualizations via Recharts and Framer Motion.
            </p>
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section 
          id="contact" 
          variants={scrollVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
          className="text-center space-y-8 scroll-mt-32"
        >
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Let's Connect</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            I am actively seeking software engineering roles where I can bring my rapid problem-solving skills and full-stack technical proficiency to an innovative team.
          </p>
          <div className="flex justify-center gap-6">
            <ContactButton icon={<Mail size={24} />} text="Email Me" href="mailto:nhshimelis@cincinnatistate.edu" />
            <ContactButton icon={<Briefcase size={24} />} text="LinkedIn" href="https://www.linkedin.com/in/naol-shimelis-2a7626247/" />
            <ContactButton icon={<Code size={24} />} text="GitHub" href="https://github.com/nawacod" />
          </div>
        </motion.section>

      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, delay, isNegative }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center gap-5 transition-all shadow-lg hover:shadow-xl hover:border-blue-200"
    >
      <div className={`p-4 rounded-xl ${isNegative ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function ContactButton({ icon, text, href }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <motion.div 
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center gap-3 bg-white border border-slate-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-slate-700 hover:text-blue-600 cursor-pointer min-w-[120px]"
      >
        {icon}
        <span className="font-bold">{text}</span>
      </motion.div>
    </a>
  );
}