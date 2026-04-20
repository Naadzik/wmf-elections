import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { elections, candidates, boardMembers } from '../../data';

const FEATURES = [
  {
    icon: '📊',
    key: 'elections',
    to: '/elections',
  },
  {
    icon: '👤',
    key: 'candidates',
    to: '/candidates',
  },
  {
    icon: '🗺️',
    key: 'map',
    to: '/map',
  },
  {
    icon: '📈',
    key: 'trends',
    to: '/trends',
  },
  {
    icon: '🏛️',
    key: 'board',
    to: '/board',
  },
  {
    icon: 'ℹ️',
    key: 'about',
    to: '/about',
  },
];

function countryFlag(code: string) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  ).join('');
}

export default function Home() {
  const { t } = useTranslation();

  const communityElections = elections.filter(e => e.type === 'community' || e.type === 'mixed');
  const uniqueCountries = new Set(candidates.map(c => c.countryCode)).size;
  const currentMembers = boardMembers.filter(m => m.terms.some(t => !t.end));

  return (
    <div className="space-y-0">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="py-14 text-center max-w-2xl mx-auto px-4">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border mb-6"
          style={{
            background: 'rgba(74, 222, 128, 0.08)',
            borderColor: 'rgba(74, 222, 128, 0.25)',
            color: '#16a34a',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-wmf-blue animate-pulse inline-block" />
          {t('home.badge')}
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4 text-wmf-text" style={{ letterSpacing: '-0.03em' }}>
          {t('home.hero_title')}<br />
          <em className="not-italic text-wmf-blue">{t('home.hero_accent')}</em>
        </h1>

        <p className="text-wmf-muted text-lg leading-relaxed max-w-xl mx-auto mb-8">
          {t('home.subtitle')}
        </p>

        <Link
          to="/elections"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-bold text-white text-base transition-all hover:-translate-y-0.5"
          style={{ background: '#16a34a', boxShadow: '0 4px 20px rgba(22,163,74,0.35)' }}
        >
          {t('home.cta')}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            { value: communityElections.length, label: t('home.stats.elections'), green: true },
            { value: candidates.length, label: t('home.stats.candidates'), green: false },
            { value: uniqueCountries, label: t('home.stats.countries'), green: false },
          ].map(({ value, label, green }) => (
            <div key={label} className="text-center">
              <span className={`block text-4xl font-extrabold tracking-tight ${green ? 'text-wmf-blue' : 'text-wmf-text'}`}
                style={{ letterSpacing: '-0.03em' }}>
                {value}
              </span>
              <span className="block text-xs text-wmf-muted uppercase tracking-wider mt-1">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ──────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <p className="text-xs font-bold text-wmf-muted uppercase tracking-widest mb-4">{t('home.features_label')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 border border-wmf-border rounded-xl overflow-hidden">
          {FEATURES.map(({ icon, key, to }) => (
            <Link
              key={to}
              to={to}
              className="bg-white p-6 transition-colors hover:bg-wmf-gray group border-b border-r border-wmf-border last:border-r-0"
              style={{ borderRight: undefined }}
            >
              <span className="text-2xl block mb-2">{icon}</span>
              <h3 className="text-sm font-bold text-wmf-text mb-1 group-hover:text-wmf-blue transition-colors">
                {t(`nav.${key}`)}
              </h3>
              <p className="text-xs text-wmf-muted leading-relaxed">{t(`home.feature_${key}`)}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Current board ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-14">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-wmf-muted uppercase tracking-widest">{t('home.current_board')}</p>
          <Link to="/board" className="text-xs text-wmf-blue hover:underline">{t('home.view_all')} →</Link>
        </div>
        <div className="bg-white border border-wmf-border rounded-xl p-4 flex flex-wrap gap-2">
          {currentMembers.map(m => {
            const isCommunity = m.terms.some(t => t.type === 'community-elected' && !t.end);
            return (
              <span
                key={m.name}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm border border-wmf-border"
              >
                {m.countryCode && (
                  <span className="text-base leading-none">{countryFlag(m.countryCode)}</span>
                )}
                <span className="text-wmf-text font-medium">{m.name}</span>
                {isCommunity && (
                  <span className="text-wmf-blue text-xs">✓</span>
                )}
              </span>
            );
          })}
        </div>
        <p className="text-xs text-wmf-muted mt-2">✓ {t('home.community_elected_note')}</p>
      </section>
    </div>
  );
}
