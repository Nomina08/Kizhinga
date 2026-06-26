interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Логотип Кижинги"
    >
      <rect width="48" height="48" rx="12" className="fill-buryat-green dark:fill-buryat-green" />
      <path
        d="M14 36V12h4l6 14 6-14h4v24h-4V22l-5 12h-2l-5-12v14h-4z"
        fill="#c9a227"
      />
      <path
        d="M10 10h28M10 38h28"
        stroke="#0057a8"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="24" cy="8" r="2" fill="#0057a8" opacity="0.8" />
      <circle cx="8" cy="24" r="1.5" fill="#c9a227" opacity="0.7" />
      <circle cx="40" cy="24" r="1.5" fill="#c9a227" opacity="0.7" />
      <path
        d="M20 6c2-1 4-1 6 0M18 42c3 1 6 1 9 0"
        stroke="#c9a227"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}
