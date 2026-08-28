import React, { useState, useRef, useEffect } from 'react';
import { Mail, Send, Loader2, CheckCircle2, AlertTriangle, MapPin, Github } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Auto-dismiss toast notification after 5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const validateForm = (): boolean => {
    const tempErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      tempErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = "Please enter a valid email address.";
      }
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message cannot be empty.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for that field when typing
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setToast(null);

    // Prepare mailto fallback parameters
    const mailtoRecipient = 'jophtgrph@gmail.com';
    const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${mailtoRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();

        if (response.ok && data.success) {
          setToast({
            type: 'success',
            message: data.message || 'Message sent successfully!'
          });
          // Reset form
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            honeypot: '',
          });
        } else {
          setToast({
            type: 'error',
            message: `${data.message || 'Failed to send message.'} Opening your email client to send instead...`
          });
          setTimeout(() => {
            window.location.href = mailtoUrl;
          }, 1500);
        }
      } else {
        // Response is not JSON (likely HTML from static server on a 404/Vercel)
        setToast({
          type: 'error',
          message: 'Mail server not configured. Opening your local email client as a fallback...'
        });
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 1500);
      }
    } catch (err) {
      setToast({
        type: 'error',
        message: 'Could not connect to the mail server. Opening your email client as a fallback...'
      });
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-section-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div 
          id="toast-notification"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border backdrop-blur-md animate-bounce max-w-sm ${
            toast.type === 'success' 
              ? 'bg-slate-905/95 border-blue-500/30 text-white' 
              : 'bg-red-950/95 border-red-500/30 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <div className="flex-1 text-xs">
            <p className="font-semibold font-sans">{toast.type === 'success' ? 'Success' : 'Error'}</p>
            <p className="text-gray-300 mt-0.5 leading-relaxed font-sans">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToast(null)} 
            className="text-gray-400 hover:text-white transition-colors ml-2 cursor-pointer font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Info Panel: Span 5 (Styled like the let's connect block but larger) */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-8 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl relative overflow-hidden text-white shadow-xl shadow-blue-950/20">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 blur-3xl rounded-full pointer-events-none" />
        
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-blue-200">Connect</span>
            <h3 className="text-2xl font-sans font-bold text-white tracking-tight">Let's Connect</h3>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed font-sans">
            I'm currently looking for new opportunities, developer internships, and exciting open-source collaborations. Feel free to shoot me a message—I'll do my best to get back to you!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-white/10 border border-white/20 rounded-2xl text-white group-hover:bg-white/20 transition-all">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-blue-200">Location</p>
              <p className="text-sm font-sans text-white">Trichy, Tamil Nadu, India</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-white/10 border border-white/20 rounded-2xl text-white group-hover:bg-white/20 transition-all">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-blue-200">Email Address</p>
              <a href="mailto:jophtgrph@gmail.com" className="text-sm font-sans text-white hover:underline block">
                jophtgrph@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 bg-white/10 border border-white/20 rounded-2xl text-white group-hover:bg-white/20 transition-all">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wider text-blue-200">GitHub Profile</p>
              <a 
                href="https://github.com/jophotohub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm font-sans text-white hover:underline block"
              >
                github.com/jophotohub
              </a>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-[11px] text-blue-200 font-mono">
          © {new Date().getFullYear()} Jothiranjan U. Trichy.
        </div>
      </div>

      {/* Form Panel: Span 7 (Bento Card Style with Slate 900 / Border Slate 800 / Rounded 3xl) */}
      <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 p-8 rounded-3xl relative overflow-hidden backdrop-blur-sm shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Honeypot anti-spam field - completely hidden from visual users */}
          <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              value={formData.honeypot}
              onChange={handleInputChange}
              placeholder="Leave this field blank"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name-input" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Jothiranjan U"
                className={`w-full bg-slate-800/50 border ${
                  errors.name ? 'border-red-500/50' : 'border-slate-700'
                } rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all font-sans`}
              />
              {errors.name && (
                <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                  <AlertTriangle className="w-3 h-3" /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email-input" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="jophtgrph@gmail.com"
                className={`w-full bg-slate-800/50 border ${
                  errors.email ? 'border-red-500/50' : 'border-slate-700'
                } rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all font-sans`}
              />
              {errors.email && (
                <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                  <AlertTriangle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="subject-input" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              id="subject-input"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Project Collaboration / Internship Opportunity"
              className={`w-full bg-slate-800/50 border ${
                errors.subject ? 'border-red-500/50' : 'border-slate-700'
              } rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all font-sans`}
            />
            {errors.subject && (
              <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                <AlertTriangle className="w-3 h-3" /> {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message-input" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message-input"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="How can we build together?"
              className={`w-full bg-slate-800/50 border ${
                errors.message ? 'border-red-500/50' : 'border-slate-700'
              } rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500 transition-all resize-none font-sans leading-relaxed`}
            />
            {errors.message && (
              <p className="text-[10px] text-red-400 mt-1 flex items-center gap-1 font-sans">
                <AlertTriangle className="w-3 h-3" /> {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
