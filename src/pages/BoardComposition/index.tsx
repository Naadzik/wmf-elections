import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { boardMembers } from '../../data';
import type { BoardMemberType } from '../../types';

const TYPE_I18N_KEY: Record<BoardMemberType, string> = {
  'community-elected': 'board.type_community_elected',
  'affiliate-selected': 'board.type_affiliate_selected',
  'appointed': 'board.type_appointed',
  'staff': 'board.type_staff',
};

const TYPE_COLORS: Record<BoardMemberType, string> = {
  'community-elected': '#0645ad',
  'affiliate-selected': '#14866d',
  'appointed': '#d97706',
  'staff': '#6b7280',
};

const TYPE_BG: Record<BoardMemberType, string> = {
  'community-elected': 'bg-blue-100 text-blue-800',
  'affiliate-selected': 'bg-green-100 text-green-800',
  'appointed': 'bg-amber-100 text-amber-800',
  'staff': 'bg-gray-100 text-gray-700',
};

const YEARS = Array.from({ length: 2025 - 2005 + 1 }, (_, i) => 2005 + i);
const MIN_YEAR = YEARS[0];
const MAX_YEAR = YEARS[YEARS.length - 1] + 1; // 2026

function parseYear(dateStr: string) {
  return parseInt(dateStr.slice(0, 4));
}

function countryFlag(code?: string) {
  if (!code) return '';
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  ).join('');
}

const TODAY = '2026-04-19';
const types: BoardMemberType[] = ['community-elected', 'affiliate-selected', 'appointed', 'staff'];

export default function BoardComposition() {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState<BoardMemberType | 'all'>('all');

  // Current members
  const current = useMemo(
    () => boardMembers.filter(m =>
      m.terms.some(t2 => (!t2.end || t2.end > TODAY) &&
        (filterType === 'all' || t2.type === filterType))
    ),
    [filterType]
  );

  // Gantt: one row per board member, showing all their matching terms as bars
  const ganttRows = useMemo(() => {
    return boardMembers
      .filter(m =>
        filterType === 'all'
          ? true
          : m.terms.some(t2 => t2.type === filterType)
      )
      .map(m => ({
        member: m,
        terms: filterType === 'all'
          ? m.terms
          : m.terms.filter(t2 => t2.type === filterType),
      }))
      .filter(r => r.terms.length > 0)
      .sort((a, b) => {
        const aFirst = a.terms.reduce((min, t2) => t2.start < min ? t2.start : min, a.terms[0].start);
        const bFirst = b.terms.reduce((min, t2) => t2.start < min ? t2.start : min, b.terms[0].start);
        return aFirst.localeCompare(bFirst);
      });
  }, [filterType]);

  const totalSpan = MAX_YEAR - MIN_YEAR;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-wmf-text">{t('board.title')}</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm text-wmf-muted">{t('board.filter_type')}:</label>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as BoardMemberType | 'all')}
            className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue"
          >
            <option value="all">{t('board.all_types')}</option>
            {types.map(tp => (
              <option key={tp} value={tp}>{t(TYPE_I18N_KEY[tp])}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current composition */}
      <div className="bg-white rounded-lg border border-wmf-border p-5">
        <h2 className="text-base font-semibold mb-4">{t('board.current')}</h2>
        <div className="flex flex-wrap gap-3">
          {current.map(m => {
            const activeTerms = m.terms.filter(t2 =>
              (!t2.end || t2.end > TODAY) && (filterType === 'all' || t2.type === filterType)
            );
            return activeTerms.map(t2 => (
              <div
                key={`${m.name}-${t2.start}`}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-wmf-border bg-wmf-gray text-sm"
              >
                <span className="text-base">{countryFlag(m.countryCode)}</span>
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${TYPE_BG[t2.type]}`}>
                      {t(TYPE_I18N_KEY[t2.type])}
                    </span>
                    {t2.role && <span className="text-wmf-muted text-xs">{t2.role}</span>}
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
      </div>

      {/* Gantt timeline — one row per person, multiple bars per term */}
      <div className="bg-white rounded-lg border border-wmf-border p-5 overflow-x-auto">
        <h2 className="text-base font-semibold mb-4">{t('board.timeline')}</h2>
        <div style={{ minWidth: 700 }}>
          {/* Year axis */}
          <div className="flex mb-3">
            <div className="shrink-0" style={{ width: 160 }} />
            <div className="flex-1 flex relative">
              {YEARS.filter((_, i) => i % 4 === 0).map(year => (
                <div
                  key={year}
                  className="absolute text-xs text-wmf-muted"
                  style={{ left: `${((year - MIN_YEAR) / totalSpan) * 100}%` }}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>

          {/* Separator line */}
          <div className="flex mb-2">
            <div className="shrink-0 border-r border-wmf-border" style={{ width: 160 }} />
            <div className="flex-1 h-px bg-wmf-border" />
          </div>

          {/* Rows */}
          {ganttRows.map(({ member, terms }) => (
            <div key={member.name} className="flex items-center mb-2 group">
              <div
                className="shrink-0 text-xs text-wmf-text truncate pr-3 text-right"
                style={{ width: 160 }}
                title={member.name}
              >
                <span className="mr-1">{countryFlag(member.countryCode)}</span>
                {member.name}
              </div>
              <div className="flex-1 relative h-6">
                {terms.map((term, ti) => {
                  const startYear = parseYear(term.start);
                  const endYear = term.end ? parseYear(term.end) : 2026;
                  const left = ((startYear - MIN_YEAR) / totalSpan) * 100;
                  const width = Math.max(((endYear - startYear) / totalSpan) * 100, 0.5);
                  const isActive = !term.end || term.end > TODAY;

                  return (
                    <div
                      key={ti}
                      className="absolute h-full rounded flex items-center px-1.5 overflow-hidden"
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        background: TYPE_COLORS[term.type],
                        opacity: isActive ? 1 : 0.65,
                        border: isActive ? '2px solid rgba(255,255,255,0.4)' : 'none',
                      }}
                      title={`${t(TYPE_I18N_KEY[term.type])}${term.role ? ` · ${term.role}` : ''} · ${term.start.slice(0, 4)}–${term.end ? term.end.slice(0, 4) : t('board.term_current')}`}
                    >
                      {width > 8 && (
                        <span className="text-white text-xs truncate leading-none">
                          {term.role ?? term.start.slice(0, 4)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="shrink-0 text-xs text-wmf-muted ml-2 w-16 text-right">
                {terms.length > 1 && `${terms.length}×`}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-wmf-border">
          {types.map(tp => (
            <span key={tp} className="flex items-center gap-1.5 text-xs text-wmf-muted">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: TYPE_COLORS[tp] }} />
              {t(TYPE_I18N_KEY[tp])}
            </span>
          ))}
          <span className="flex items-center gap-1.5 text-xs text-wmf-muted ml-2">
            <span className="w-3 h-3 rounded-sm inline-block bg-wmf-blue opacity-60" />
            Past term
          </span>
          <span className="flex items-center gap-1.5 text-xs text-wmf-muted">
            <span className="w-3 h-3 rounded-sm inline-block bg-wmf-blue" style={{ border: '2px solid rgba(255,255,255,0.4)' }} />
            Active term
          </span>
        </div>
      </div>
    </div>
  );
}
