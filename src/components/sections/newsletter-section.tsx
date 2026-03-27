'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <section
      id="contact"
      className="py-24 bg-[#0f0f0f] relative overflow-hidden"
    >
      {/* Decorative bg text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-black text-[20rem] uppercase text-white/[0.02] leading-none tracking-tight">
          SUB
        </span>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        {/* Badge */}
        <span className="inline-flex items-center border border-white/15 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/40 mb-7">
          Newsletter
        </span>

        <h2 className="font-display font-black text-[clamp(2.5rem,7vw,5.5rem)] uppercase tracking-tight leading-[0.9] text-white mb-5">
          Stay in
          <br />
          the Loop
        </h2>

        <p className="text-white/40 text-base mb-12 max-w-sm mx-auto leading-relaxed">
          Get the latest insights, project launches, and digital tips delivered
          straight to your inbox.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
            <CheckCircle2 size={22} className="text-[#F15A2B]" />
            <p className="font-semibold text-white">{message}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="w-full h-13 px-5 py-0 h-12 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[#F15A2B] focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="h-12 px-7 bg-[#F15A2B] hover:bg-[#F15A2B]/90 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all shrink-0 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Subscribe <Send size={14} />
                </>
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <div className="flex items-center justify-center gap-2 mt-4 text-red-400 text-sm">
            <AlertCircle size={14} />
            <span>{message}</span>
          </div>
        )}

        <p className="text-white/20 text-xs mt-6">
          No spam, ever. Unsubscribe at any time.
        </p>

        {/* Bottom stat row */}
        <div className="flex items-center justify-center gap-8 mt-16 pt-10 border-t border-white/5">
          {[
            { val: '12k+', label: 'Subscribers' },
            { val: '2×/mo', label: 'Frequency' },
            { val: '48%', label: 'Open rate' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-black text-2xl text-white">
                {s.val}
              </p>
              <p className="text-white/30 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
