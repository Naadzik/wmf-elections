import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { candidates, elections } from '../../data';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
];

const NAV_LINKS = [
  { to: '/elections', key: 'nav.elections' },
  { to: '/candidates', key: 'nav.candidates' },
  { to: '/board', key: 'nav.board' },
  { to: '/trends', key: 'nav.trends' },
  { to: '/map', key: 'nav.map' },
  { to: '/about', key: 'nav.about' },
];

interface SearchResult {
  type: 'candidate' | 'election';
  id: string;
  label: string;
  sub: string;
  to: string;
}

function useGlobalSearch(query: string): SearchResult[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();

  const candidateResults: SearchResult[] = candidates
    .filter(c => c.name.toLowerCase().includes(q) || c.username.toLowerCase().includes(q))
    .slice(0, 5)
    .map(c => ({
      type: 'candidate',
      id: c.id,
      label: c.name,
      sub: `@${c.username} · ${c.countryCode}`,
      to: `/candidates/${c.id}`,
    }));

  const electionResults: SearchResult[] = elections
    .filter(e => String(e.year).includes(q) || e.votingSystem.toLowerCase().includes(q))
    .slice(0, 4)
    .map(e => ({
      type: 'election',
      id: e.id,
      label: `${e.year} Board Election`,
      sub: `${e.votingSystem} · ${e.seats} seats`,
      to: `/elections/${e.id}`,
    }));

  return [...candidateResults, ...electionResults];
}

function useDarkMode() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch {}
    setDark(next);
  }, []);

  return { dark, toggle };
}

function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" strokeWidth={2} />
      <path strokeLinecap="round" strokeWidth={2} d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { dark, toggle: toggleDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useGlobalSearch(searchQuery);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setMobileOpen(false);
      }
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleResultClick = useCallback((to: string) => {
    navigate(to);
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);
  }, [navigate]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-wmf-blue text-white'
        : 'text-wmf-text hover:bg-wmf-blue/10 hover:text-wmf-blue'
    }`;

  return (
    <header className="bg-white border-b border-wmf-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14 gap-3">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-wmf-blue shrink-0">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Wikimedia-logo.svg/24px-Wikimedia-logo.svg.png" alt="" width={22} height={22} />
          <span className="hidden lg:inline text-sm">WMF Board Elections</span>
          <span className="lg:hidden text-sm">WMF Elections</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1">
          {NAV_LINKS.map(({ to, key }) => (
            <NavLink key={to} to={to} className={linkClass}>{t(key)}</NavLink>
          ))}
        </nav>

        {/* Search + lang + theme */}
        <div className="flex items-center gap-2">
          {/* Global search */}
          <div ref={searchRef} className="relative">
            <input
              ref={inputRef}
              type="search"
              placeholder={t('nav.search_placeholder')}
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
              className="hidden sm:block border border-wmf-border rounded-full px-3 py-1.5 text-xs bg-wmf-gray focus:outline-none focus:border-wmf-blue focus:bg-white w-44 transition-all focus:w-56"
            />
            <button
              className="sm:hidden p-2 text-wmf-muted hover:text-wmf-blue"
              onClick={() => { setSearchOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
              aria-label={t('search.placeholder')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {searchOpen && searchQuery.length >= 2 && (
              <div className="absolute top-full right-0 mt-1 w-72 bg-white border border-wmf-border rounded-lg shadow-lg overflow-hidden z-50">
                {results.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-wmf-muted">
                    {t('search.no_results')} "{searchQuery}"
                  </div>
                ) : (
                  <>
                    {results.filter(r => r.type === 'candidate').length > 0 && (
                      <div>
                        <div className="px-3 py-1.5 text-xs font-semibold text-wmf-muted bg-wmf-gray border-b border-wmf-border">
                          {t('search.in_candidates')}
                        </div>
                        {results.filter(r => r.type === 'candidate').map(r => (
                          <button
                            key={r.id}
                            onClick={() => handleResultClick(r.to)}
                            className="w-full text-left px-4 py-2.5 hover:bg-wmf-gray transition-colors border-b border-wmf-border/50 last:border-0"
                          >
                            <div className="text-sm font-medium text-wmf-text">{r.label}</div>
                            <div className="text-xs text-wmf-muted">{r.sub}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    {results.filter(r => r.type === 'election').length > 0 && (
                      <div>
                        <div className="px-3 py-1.5 text-xs font-semibold text-wmf-muted bg-wmf-gray border-b border-wmf-border">
                          {t('search.in_elections')}
                        </div>
                        {results.filter(r => r.type === 'election').map(r => (
                          <button
                            key={r.id}
                            onClick={() => handleResultClick(r.to)}
                            className="w-full text-left px-4 py-2.5 hover:bg-wmf-gray transition-colors border-b border-wmf-border/50 last:border-0"
                          >
                            <div className="text-sm font-medium text-wmf-text">{r.label}</div>
                            <div className="text-xs text-wmf-muted">{r.sub}</div>
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="px-4 py-1.5 text-xs text-wmf-muted bg-wmf-gray text-right">
                      {t('search.press_esc')}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Language toggle */}
          <div className="hidden sm:flex items-center gap-1">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`px-2 py-1 text-xs rounded font-mono cursor-pointer border transition-colors ${
                  i18n.language === code
                    ? 'bg-wmf-blue text-white border-wmf-blue'
                    : 'border-wmf-border text-wmf-muted hover:border-wmf-blue hover:text-wmf-blue'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded text-wmf-muted hover:text-wmf-blue hover:bg-wmf-gray transition-colors"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded text-wmf-muted hover:text-wmf-blue hover:bg-wmf-gray transition-colors"
            aria-label={mobileOpen ? t('nav.close_menu') : t('nav.open_menu')}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-wmf-border bg-white px-4 py-3 space-y-1">
          <input
            type="search"
            placeholder={t('nav.search_placeholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            className="w-full border border-wmf-border rounded px-3 py-2 text-sm mb-2 focus:outline-none focus:border-wmf-blue bg-wmf-gray text-wmf-text"
          />
          {NAV_LINKS.map(({ to, key }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                  isActive ? 'bg-wmf-blue text-white' : 'text-wmf-text hover:bg-wmf-gray'
                }`
              }
            >
              {t(key)}
            </NavLink>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t border-wmf-border mt-2">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`px-3 py-1 text-xs rounded font-mono cursor-pointer border transition-colors ${
                  i18n.language === code
                    ? 'bg-wmf-blue text-white border-wmf-blue'
                    : 'border-wmf-border text-wmf-muted'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={toggleDark}
              className="ml-auto p-1.5 rounded text-wmf-muted hover:text-wmf-blue border border-wmf-border"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
