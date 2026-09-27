import React, { useState } from 'react';
import {
  Send,
  Mail,
  MessageCircle,
  Instagram,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ContactCTAProps {
  initialService?: string;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ initialService }) => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    projectType: initialService || 'AI Video Advertising',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const RECIPIENT_EMAIL = 'oluwatobilobaodedoyin@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const emailSubject = `New Project Inquiry from ${formData.name || 'Client'}: ${formData.projectType}`;
    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nBrand / Company: ${formData.brand || 'N/A'}\nService Focus: ${formData.projectType}\n\nProject Details:\n${formData.message}`;

    try {
      // Send directly to oluwatobilobaodedoyin@gmail.com via FormSubmit AJAX service
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          brand: formData.brand || 'Not specified',
          serviceFocus: formData.projectType,
          message: formData.message,
          _subject: emailSubject,
          _template: 'table',
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitted(true);
        return;
      }
      throw new Error('Direct service response was not ok');
    } catch (err) {
      console.warn('FormSubmit AJAX fallback initiated:', err);
      // Fallback: Open mailto directly prefilled with all details to ensure delivery
      const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projectTypes = [
    'AI Video Advertising',
    'Product Commercials',
    'Fashion & Beauty Content',
    'AI Product Visuals',
    'Social Media Ads',
    'Creative Campaigns',
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 scroll-mt-20 relative overflow-hidden">
      {/* Subtle background golden glow */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px] pointer-events-none ${
          theme === 'dark' ? 'bg-[#F5C542]/10 opacity-70' : 'bg-[#F5C542]/15 opacity-40'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Headline & Direct Social Channels */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5C542] mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Your Campaign</span>
              </div>

              <h2
                className={`font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-neutral-950'
                }`}
                style={{ textWrap: 'balance' }}
              >
                Have an Idea?{' '}
                <span className="text-[#F5C542]">Let's Turn It Into an AI Video.</span>
              </h2>

              <p
                className={`mt-6 text-base sm:text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'
                }`}
              >
                Tell me what you're building, what you're selling, or what you want people to
                see — and let's turn the idea into something visual.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#inquiry-box"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] active:scale-95 transition-all shadow-lg shadow-[#F5C542]/25"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={scrollToWork}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all border ${
                  theme === 'dark'
                    ? 'border-white/20 text-white bg-white/5 hover:bg-white/10'
                    : 'border-neutral-300 text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
                }`}
              >
                <span>View My Work</span>
              </button>
            </div>

            {/* Direct Connect Options: WhatsApp, Email, Instagram */}
            <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-4">
                Fast Response Channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://wa.me/2348126561993"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-white/10 hover:border-[#25D366]/60 text-white'
                      : 'bg-white border-black/10 hover:border-[#25D366] text-neutral-900'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#25D366]/20 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>WhatsApp Direct</span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                    </div>
                    <div className="text-[11px] text-neutral-400 truncate">08126561993 • Chat in DM</div>
                  </div>
                </a>

                <a
                  href="mailto:oluwatobilobaodedoyin@gmail.com"
                  className={`p-3.5 rounded-xl border flex items-center gap-3 transition-colors ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-white/10 hover:border-[#F5C542]/60 text-white'
                      : 'bg-white border-black/10 hover:border-[#F5C542] text-neutral-900'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#F5C542]/20 flex items-center justify-center text-[#F5C542] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold">Direct Email</div>
                    <div className="text-[11px] text-neutral-400 truncate">oluwatobilobaodedoyin@gmail.com</div>
                  </div>
                </a>
              </div>

              {/* Instagram Direct Link */}
              <div className="mt-3">
                <a
                  href="https://www.instagram.com/zentra_creator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    theme === 'dark'
                      ? 'bg-neutral-900 border-white/10 hover:border-[#E1306C]/70 text-white group'
                      : 'bg-white border-black/10 hover:border-[#E1306C]/70 text-neutral-900 group'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#FD1D1D]/20 via-[#E1306C]/20 to-[#405DE6]/20 flex items-center justify-center text-[#E1306C] shrink-0 group-hover:scale-105 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold group-hover:text-[#F5C542] transition-colors">
                        Instagram
                      </div>
                      <div className="text-[11px] text-neutral-400 truncate">@zentra_creator</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#F5C542] group-hover:translate-x-0.5 transition-transform flex items-center gap-1 shrink-0">
                    <span>Visit Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Project Inquiry Form Box */}
          <div id="inquiry-box" className="lg:col-span-6">
            <div
              className={`p-7 sm:p-9 rounded-3xl border shadow-2xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-[#121217] border-white/10 shadow-black/80'
                  : 'bg-white border-black/10 shadow-xl shadow-black/5'
              }`}
            >
              {submitted ? (
                <div className="py-10 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#F5C542]/20 text-[#F5C542] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3
                    className={`font-display text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-neutral-950'
                    }`}
                  >
                    Brief Sent Directly!
                  </h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-white">{formData.name || 'there'}</span>.
                    Your brief for <span className="text-[#F5C542] font-semibold">{formData.projectType}</span> has been dispatched to{' '}
                    <span className="font-mono text-neutral-300">oluwatobilobaodedoyin@gmail.com</span>.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
                        `Project Inquiry: ${formData.projectType} — ${formData.name}`
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nEmail: ${formData.email}\nBrand: ${formData.brand || 'N/A'}\nService: ${formData.projectType}\n\n${formData.message}`
                      )}`}
                      className="px-5 py-2.5 rounded-full text-xs font-bold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] transition-all flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Your Email App</span>
                    </a>

                    <a
                      href={`https://wa.me/2348126561993?text=${encodeURIComponent(
                        `Hi Oluwatobiloba, I just submitted an inquiry for ${formData.projectType}. My name is ${formData.name} (${formData.email}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Follow Up on WhatsApp</span>
                    </a>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-neutral-400 hover:text-neutral-200 underline underline-offset-4"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4">
                    <div>
                      <h3
                        className={`font-display text-xl font-bold ${
                          theme === 'dark' ? 'text-white' : 'text-neutral-950'
                        }`}
                      >
                        Project Inquiry
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Typical response time: Under 12 hours
                      </p>
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-neutral-400 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Elena Vance"
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#F5C542] transition-colors ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-neutral-400 uppercase tracking-wider">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@brand.com"
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#F5C542] transition-colors ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Brand & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-neutral-400 uppercase tracking-wider">
                        Brand / Company
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="e.g. Maison Lumière"
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#F5C542] transition-colors ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1.5 text-neutral-400 uppercase tracking-wider">
                        Service Focus
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#F5C542] transition-colors ${
                          theme === 'dark'
                            ? 'bg-neutral-900 border-white/10 text-white'
                            : 'bg-neutral-50 border-neutral-300 text-neutral-900'
                        }`}
                      >
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5 text-neutral-400 uppercase tracking-wider">
                      Project Goals & Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your product, target audience, deliverables (e.g. 3x 15s reels for Instagram, 1x website hero), or timeline requirements..."
                      className={`w-full px-4 py-3 rounded-xl text-sm border focus:outline-none focus:ring-2 focus:ring-[#F5C542] transition-colors resize-none ${
                        theme === 'dark'
                          ? 'bg-neutral-900 border-white/10 text-white placeholder-neutral-500'
                          : 'bg-neutral-50 border-neutral-300 text-neutral-900 placeholder-neutral-400'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full text-sm font-bold bg-[#F5C542] text-neutral-950 hover:bg-[#e5b634] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#F5C542]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-neutral-950 border-t-transparent animate-spin" />
                        <span>Sending Project Brief...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Brief</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
