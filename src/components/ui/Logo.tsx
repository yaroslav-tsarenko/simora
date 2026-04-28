export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1"/>
          <stop offset="100%" stopColor="#4F46E5"/>
        </linearGradient>
        <linearGradient id="logoAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4"/>
          <stop offset="100%" stopColor="#22D3EE"/>
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#logoBg)"/>
      <path d="M22 8a12 12 0 0 1 0 16" stroke="url(#logoAccent)" strokeWidth="1.8" fill="none" opacity="0.5" strokeLinecap="round"/>
      <path d="M19 10.5a8 8 0 0 1 0 11" stroke="url(#logoAccent)" strokeWidth="1.8" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M16 13a4 4 0 0 1 0 6" stroke="url(#logoAccent)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <text x="11.5" y="22.5" textAnchor="middle" fontFamily="system-ui,-apple-system,sans-serif" fontWeight="700" fontSize="17" fill="white">s</text>
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="text-xl font-bold text-text">simora</span>
    </span>
  );
}
