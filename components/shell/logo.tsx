import Link from 'next/link'

export function LogoMark({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="12" fill="#12345A" />
      <path d="M7 27c4-9 9-13 13-13s9 4 13 13" fill="none" stroke="#BFE8E1" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 28h28" stroke="#FFF9F0" strokeWidth="3" strokeLinecap="round" />
      <path d="M13 21v7M20 14v14M27 21v7" stroke="#0D9488" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ href = '/dashboard' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-4 focus-visible:ring-ring/30">
      <LogoMark />
      <span className="font-heading text-xl font-semibold tracking-tight">
        Seekh<span className="text-teal">Setu</span>
      </span>
    </Link>
  )
}
