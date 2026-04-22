'use client';

import { useState } from 'react';
import { 
  Search, Settings, Activity, Zap, Shield, ChevronRight, 
  BarChart3, Moon, Sun, X, Check, SearchCode 
} from 'lucide-react';

export default function Home() {
  const [bIsStarted, setBIsStarted] = useState(false);
  const [bShowSettings, setBShowSettings] = useState(false);
  const [bShowSearch, setBShowSearch] = useState(false);
  const [strSearchInput, setStrSearchInput] = useState('');
  const [strStrategyText, setStrStrategyText] = useState('');
  const [strSelectedAsset, setStrSelectedAsset] = useState('');
  const [objResults, setObjResults] = useState<any>(null);
  const [bIsLoading, setBIsLoading] = useState(false);
  const [strUserName, setStrUserName] = useState('Naol');
  const [bDarkMode, setBDarkMode] = useState(false);

  const lstAvailableAssets = [
    { id: 'MNQ', name: 'Micro Nasdaq 100', type: 'Futures' },
    { id: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF' },
    { id: 'MGC', name: 'Micro Gold', type: 'Commodity' },
    { id: 'EURUSD=X', name: 'EUR/USD', type: 'Forex' },
    { id: 'BTC-USD', name: 'Bitcoin', type: 'Crypto' },
  ];

  const lstFilteredAssets = lstAvailableAssets.filter(objAsset => 
    objAsset.name.toLowerCase().includes(strSearchInput.toLowerCase()) ||
    objAsset.id.toLowerCase().includes(strSearchInput.toLowerCase())
  );

  const handleRunBacktest = async () => {
    if (!strSelectedAsset) return;
    setBIsLoading(true);
    try {
     const objResponse = await fetch('https://backend-api-ukh5.onrender.com/api/run-backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: strStrategyText, asset: strSelectedAsset })
      });
      const objData = await objResponse.json();
      setObjResults(objData);
    } catch (objError) {
      console.error(objError);
    }
    setBIsLoading(false);
  };

  return (
    <main className={`min-h-screen font-sans transition-colors duration-300 ${bDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      <div className={`fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 transition-all duration-300 ${bShowSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => { setBShowSearch(false); setStrSearchInput(''); }}></div>
        <div className={`relative w-full max-w-xl rounded-3xl shadow-2xl border overflow-hidden transform transition-transform ${bShowSearch ? 'scale-100' : 'scale-95'} ${bDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center p-5 border-b border-slate-100/10">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input 
              className="flex-1 bg-transparent border-none outline-none text-lg"
              placeholder="Search assets..."
              value={strSearchInput}
              onChange={(e) => setStrSearchInput(e.target.value)}
              autoFocus
            />
          </div>
          <div className="p-3 max-h-[400px] overflow-y-auto">
            {lstFilteredAssets.length > 0 ? lstFilteredAssets.map((objItem) => (
              <div key={objItem.id} onClick={() => { setStrSelectedAsset(objItem.id); setBShowSearch(false); setStrSearchInput(''); }} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${bDarkMode ? 'hover:bg-slate-800' : 'hover:bg-blue-50'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center font-black text-blue-600">{objItem.id.substring(0, 3)}</div>
                  <div><p className="font-bold">{objItem.name}</p><p className="text-xs text-slate-500 uppercase tracking-widest">{objItem.type}</p></div>
                </div>
                {strSelectedAsset === objItem.id && <Check className="w-5 h-5 text-blue-600" />}
              </div>
            )) : <div className="p-10 text-center"><p className="text-slate-400 font-bold">No results found</p></div>}
          </div>
        </div>
      </div>

      <div className={`fixed inset-y-0 right-0 z-[100] w-80 shadow-2xl border-l p-8 transform transition-transform duration-500 ${bShowSettings ? 'translate-x-0' : 'translate-x-full'} ${bDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center justify-between mb-12">
          <h3 className="text-2xl font-black italic">Settings</h3>
          <button onClick={() => setBShowSettings(false)} className="p-2 text-slate-400"><X className="w-6 h-6" /></button>
        </div>
        <div className="space-y-10">
          <section>
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-6">Profile</label>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl">{strUserName.charAt(0)}</div>
              <input className="font-bold text-lg bg-transparent outline-none border-b border-transparent focus:border-blue-600" value={strUserName} onChange={(e) => setStrUserName(e.target.value)} />
            </div>
          </section>
          <section>
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest block mb-6">Theme</label>
            <button onClick={() => setBDarkMode(!bDarkMode)} className={`w-full flex items-center justify-between p-4 rounded-2xl ${bDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <div className="flex items-center gap-3 font-bold">{bDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}{bDarkMode ? 'Dark' : 'Light'}</div>
              <div className={`w-10 h-5 rounded-full p-1 ${bDarkMode ? 'bg-blue-600' : 'bg-slate-400'}`}><div className={`w-3 h-3 bg-white rounded-full transition-transform ${bDarkMode ? 'translate-x-5' : 'translate-x-0'}`} /></div>
            </button>
          </section>
        </div>
      </div>

      <nav className={`fixed top-0 w-full border-b z-50 backdrop-blur-xl h-20 flex items-center ${bDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setBIsStarted(false)}>
            <div className="bg-blue-600 p-2 rounded-xl"><Activity className="text-white w-6 h-6" /></div>
            <span className="text-2xl font-black tracking-tighter">Quant<span className="text-blue-600">OS</span></span>
          </div>
          <div className="flex items-center gap-6">
            <div onClick={() => setBShowSearch(true)} className={`hidden md:flex items-center gap-4 px-6 py-2.5 rounded-2xl cursor-pointer border ${bDarkMode ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-100 text-slate-400'}`}>
              <Search className="w-4 h-4" />
              <span className="text-sm font-bold">{strSelectedAsset || 'Select Asset...'}</span>
            </div>
            <button onClick={() => setBShowSettings(true)} className="p-3 hover:text-blue-600 transition-all"><Settings className="w-6 h-6" /></button>
          </div>
        </div>
      </nav>

      {!bIsStarted ? (
        <div className="pt-48 flex flex-col items-center px-8 text-center animate-in fade-in duration-700">
          <h1 className="text-7xl md:text-9xl font-black tracking-tightest leading-[0.85] mb-10">STRATEGY <br/> <span className="text-blue-600 underline decoration-indigo-500/30">DECODED.</span></h1>
          <p className="text-xl text-slate-500 max-w-xl font-medium mb-12">Professional-grade backtesting. Translate intuition into performance data in milliseconds.</p>
          <button onClick={() => setBIsStarted(true)} className="bg-blue-600 text-white font-black text-2xl px-16 py-6 rounded-3xl shadow-2xl shadow-blue-600/40 hover:scale-105 transition-all flex items-center gap-4">Launch Engine <ChevronRight className="w-8 h-8" /></button>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto pt-40 px-8 pb-32 animate-in slide-in-from-bottom-12 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            <div className={`p-8 rounded-[2rem] border ${bDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">Target</p>
              <div onClick={() => setBShowSearch(true)} className="flex items-center justify-between cursor-pointer">
                <div><h3 className="text-4xl font-black tracking-tighter">{strSelectedAsset || '---'}</h3><p className="text-sm text-slate-400 font-bold italic">Search</p></div>
                <SearchCode className="w-12 h-12 text-slate-100" />
              </div>
            </div>
            <div className={`lg:col-span-2 p-8 rounded-[2rem] border ${bDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'}`}>
              <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6 block">NLP Strategy</label>
              <textarea value={strStrategyText} onChange={(e) => setStrStrategyText(e.target.value)} placeholder="e.g., Buy QQQ with 1.5% take profit and 0.8% stop loss." className="w-full h-24 bg-transparent outline-none text-xl font-medium" />
            </div>
          </div>
          <button onClick={handleRunBacktest} disabled={bIsLoading || !strSelectedAsset} className="w-full bg-blue-600 text-white font-black py-7 rounded-[2rem] text-2xl shadow-2xl disabled:opacity-20 flex items-center justify-center gap-4">{bIsLoading ? <Activity className="animate-spin" /> : 'Execute Analysis'}</button>
          {objResults && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 animate-in fade-in duration-1000">
               {[
                 { label: 'Win Rate', val: `${objResults.data.win_rate}%`, color: objResults.data.win_rate > 50 ? 'text-emerald-500' : 'text-rose-500' },
                 { label: 'Net Return', val: `${objResults.data.return_pct}%`, color: objResults.data.return_pct > 0 ? 'text-emerald-500' : 'text-rose-500' },
                 { label: 'Total Trades', val: objResults.data.total_trades, color: bDarkMode ? 'text-white' : 'text-slate-800' }
               ].map((res, i) => (
                 <div key={i} className={`p-10 rounded-[2.5rem] border ${bDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xl'}`}>
                    <p className="text-slate-400 text-xs font-black uppercase mb-4">{res.label}</p>
                    <p className={`text-6xl font-black tracking-tighter ${res.color}`}>{res.val}</p>
                 </div>
               ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}