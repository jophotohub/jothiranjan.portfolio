import React, { useState } from 'react';
import { QrCode, Download, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface InteractiveQRCodeProps {
  onClose?: () => void;
}

export default function InteractiveQRCode({ onClose }: InteractiveQRCodeProps) {
  const [inputText, setInputText] = useState('https://github.com/jophotohub');
  const [size, setSize] = useState('250x250');
  const [color, setColor] = useState('000000'); // black hex
  const [bgColor, setBgColor] = useState('ffffff'); // white hex
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrUrl, setQrUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent('https://github.com/jophotohub')}`);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsGenerating(true);
    // Construct QR server API URL
    const baseUrl = 'https://api.qrserver.com/v1/create-qr-code/';
    const queryParams = `?size=${size}&color=${color}&bgcolor=${bgColor}&data=${encodeURIComponent(inputText)}`;
    const finalUrl = `${baseUrl}${queryParams}`;

    // Simulate short network delay for nice UX spinner
    setTimeout(() => {
      setQrUrl(finalUrl);
      setIsGenerating(false);
    }, 450);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `jothiranjan-qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback if CORS prevents direct download, open in new tab
      window.open(qrUrl, '_blank');
    }
  };

  return (
    <div id="qr-playground-container" className="p-6 bg-slate-900/60 border border-slate-800 rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden backdrop-blur-md">
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl" />

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/10 rounded-lg border border-blue-500/20">
            <QrCode className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-white text-sm tracking-tight flex items-center gap-1.5">
              QR Code Generator
              <span className="text-[10px] uppercase tracking-wider bg-blue-600/25 text-blue-400 px-1.5 py-0.5 rounded font-mono">Live Demo</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">Enter text or URL to generate instantly</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-xs font-semibold px-2 py-1 rounded hover:bg-white/5"
          >
            Close
          </button>
        )}
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="qr-input" className="block text-[11px] text-slate-400 font-mono mb-1.5 uppercase tracking-wider">Input Text or URL</label>
          <input
            id="qr-input"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g. https://github.com/jophotohub"
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all font-sans"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="qr-color" className="block text-[11px] text-slate-400 font-mono mb-1.5 uppercase tracking-wider">QR Color</label>
            <select
              id="qr-color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="000000" className="bg-[#0f172a] text-white">Classic Black</option>
              <option value="2563eb" className="bg-[#0f172a] text-white">Vibrant Blue</option>
              <option value="0f172a" className="bg-[#0f172a] text-white">Dark Slate</option>
              <option value="4f46e5" className="bg-[#0f172a] text-white">Indigo Royal</option>
            </select>
          </div>
          <div>
            <label htmlFor="qr-bg" className="block text-[11px] text-slate-400 font-mono mb-1.5 uppercase tracking-wider">Background</label>
            <select
              id="qr-bg"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="ffffff" className="bg-[#0f172a] text-white">Pure White</option>
              <option value="f1f5f9" className="bg-[#0f172a] text-white">Light Gray</option>
              <option value="dbeafe" className="bg-[#0f172a] text-white">Soft Blue Glow</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !inputText.trim()}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:scale-100"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Generate QR Code
            </>
          )}
        </button>
      </form>

      <div className="mt-5 flex flex-col items-center justify-center p-4 bg-slate-800/30 border border-slate-800 rounded-2xl">
        <div className="relative p-2 bg-white rounded-lg shadow-inner overflow-hidden flex items-center justify-center w-[180px] h-[180px]">
          {isGenerating && (
            <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center">
              <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mb-1" />
              <span className="text-[10px] text-gray-600 font-mono">RENDERING</span>
            </div>
          )}
          <img
            src={qrUrl}
            alt="Generated Custom QR Code"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        <button
          onClick={handleDownload}
          className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer bg-blue-600/10 px-3 py-1.5 rounded-lg border border-blue-500/20 hover:border-blue-500/50"
        >
          <Download className="w-3.5 h-3.5" />
          Download PNG
        </button>
      </div>
    </div>
  );
}
