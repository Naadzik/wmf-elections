import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { candidates } from '../../data';
import type { ElectionType, Gender } from '../../types';

function countryFlag(code: string) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  ).join('');
}

export default function Candidates() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('q') ?? '';
  const filterCountry = searchParams.get('country') ?? 'all';
  const filterGender = (searchParams.get('gender') ?? 'all') as Gender | 'all';
  const filterType = (searchParams.get('type') ?? 'all') as ElectionType | 'all';

  const setParam = (key: string, val: string) => {
    setSearchParams(prev => { prev.set(key, val); return prev; }, { replace: true });
  };

  const countries = useMemo(
    () => [...new Set(candidates.map(c => c.countryCode))].sort(),
    []
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return candidates.filter(c => {
      if (q && !c.name.toLowerCase().includes(q) && !c.username.toLowerCase().includes(q)) return false;
      if (filterCountry !== 'all' && c.countryCode !== filterCountry) return false;
      if (filterGender !== 'all' && c.gender !== filterGender) return false;
      if (filterType !== 'all' && !c.elections.some(e => e.type === filterType)) return false;
      return true;
    });
  }, [search, filterCountry, filterGender, filterType]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-wmf-text">{t('candidates.title')}</h1>
        <div className="flex flex-wrap gap-2">
          <input
            type="search"
            placeholder={t('candidates.search_placeholder')}
            value={search}
            onChange={e => setParam('q', e.target.value)}
            className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue w-48"
          />
          <select
            value={filterType}
            onChange={e => setParam('type', e.target.value)}
            className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue"
          >
            <option value="all">{t('board.all_types')}</option>
            <option value="community">{t('board.type_community_elected')}</option>
            <option value="affiliate">{t('board.type_affiliate_selected')}</option>
            <option value="mixed">{t('elections.type_mixed')}</option>
          </select>
          <select
            value={filterCountry}
            onChange={e => setParam('country', e.target.value)}
            className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue"
          >
            <option value="all">{t('candidates.all_countries')}</option>
            {countries.map(c => (
              <option key={c} value={c}>{countryFlag(c)} {c}</option>
            ))}
          </select>
          <select
            value={filterGender}
            onChange={e => setParam('gender', e.target.value)}
            className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue"
          >
            <option value="all">{t('candidates.all_genders')}</option>
            {(['M', 'F', 'NB', 'unknown'] as Gender[]).map(g => (
              <option key={g} value={g}>{t(`candidates.gender_${g}`)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg border border-wmf-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-wmf-gray border-b border-wmf-border text-left">
              <th className="px-4 py-3 font-semibold">{t('candidates.name')}</th>
              <th className="px-4 py-3 font-semibold">{t('candidates.country')}</th>
              <th className="px-4 py-3 font-semibold">{t('candidates.affiliate')}</th>
              <th className="px-4 py-3 font-semibold">{t('candidates.project')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('candidates.edit_count')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('candidates.elections_count')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('candidates.wins')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => {
              const visibleElections = filterType === 'all' ? c.elections : c.elections.filter(e => e.type === filterType);
              const wins = visibleElections.filter(e => e.elected).length;
              return (
                <tr key={c.id} className="border-b border-wmf-border last:border-0 hover:bg-wmf-gray/60 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/candidates/${c.id}`} className="text-wmf-blue hover:underline font-medium">
                      {c.name}
                    </Link>
                    <span className="text-wmf-muted text-xs ml-1.5">@{c.username}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-lg mr-1">{countryFlag(c.countryCode)}</span>
                    <span className="text-xs text-wmf-muted">{c.countryCode}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-wmf-muted">{c.affiliate ?? '—'}</td>
                  <td className="px-4 py-3 text-xs font-mono text-wmf-muted">{c.wikiProject ?? '—'}</td>
                  <td className="px-4 py-3 text-right">{c.editCount?.toLocaleString() ?? '—'}</td>
                  <td className="px-4 py-3 text-right">{visibleElections.length}</td>
                  <td className="px-4 py-3 text-right">
                    {wins > 0
                      ? <span className="text-wmf-blue font-semibold">{wins}</span>
                      : <span className="text-wmf-muted">0</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-wmf-muted">{filtered.length} / {candidates.length} candidates</p>
    </div>
  );
}
