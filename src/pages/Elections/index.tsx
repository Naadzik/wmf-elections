import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { elections, candidates } from '../../data';
import type { VotingSystem, ElectionType } from '../../types';

const SYSTEMS: VotingSystem[] = ['STV', 'approval', 'plurality', 'condorcet', 'other'];

const SYSTEM_BADGE: Record<VotingSystem, string> = {
  STV:       'bg-blue-100 text-blue-800',
  approval:  'bg-green-100 text-green-800',
  plurality: 'bg-red-100 text-red-800',
  condorcet: 'bg-purple-100 text-purple-800',
  other:     'bg-gray-100 text-gray-700',
};

function turnoutPct(votes?: number, eligible?: number) {
  if (!votes || !eligible) return null;
  return ((votes / eligible) * 100).toFixed(1) + '%';
}

function countryFlag(code: string) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  ).join('');
}

function StatRow({ label, a, b }: { label: string; a: React.ReactNode; b: React.ReactNode }) {
  return (
    <tr className="border-b border-wmf-border last:border-0">
      <td className="py-2 pr-4 text-sm text-wmf-muted font-medium w-32">{label}</td>
      <td className="py-2 pr-4 text-sm text-center">{a}</td>
      <td className="py-2 text-sm text-center">{b}</td>
    </tr>
  );
}

function CompareModal({ ids, onClose }: { ids: [string, string]; onClose: () => void }) {
  const { t } = useTranslation();
  const pair = ids.map(id => elections.find(e => e.id === id)!);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl border border-wmf-border shadow-xl max-w-2xl w-full p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold">{t('compare.title')}</h2>
          <button onClick={onClose} className="text-wmf-muted hover:text-wmf-text text-xl leading-none">✕</button>
        </div>

        {/* Headers */}
        <div className="flex mb-2">
          <div className="w-32" />
          {pair.map(e => (
            <div key={e.id} className="flex-1 text-center">
              <Link to={`/elections/${e.id}`} onClick={onClose} className="text-xl font-bold text-wmf-blue hover:underline">
                {e.year}
              </Link>
              <div className="text-xs text-wmf-muted">{t(`common.voting_system.${e.votingSystem}`)}</div>
            </div>
          ))}
        </div>

        <table className="w-full">
          <tbody>
            <StatRow
              label={t('compare.stat_seats')}
              a={<span className="font-semibold">{pair[0].seats}</span>}
              b={<span className="font-semibold">{pair[1].seats}</span>}
            />
            <StatRow
              label={t('compare.stat_eligible')}
              a={pair[0].eligibleVoters?.toLocaleString() ?? '—'}
              b={pair[1].eligibleVoters?.toLocaleString() ?? '—'}
            />
            <StatRow
              label={t('compare.stat_votes')}
              a={pair[0].totalVotesCast?.toLocaleString() ?? '—'}
              b={pair[1].totalVotesCast?.toLocaleString() ?? '—'}
            />
            <StatRow
              label={t('compare.stat_turnout')}
              a={turnoutPct(pair[0].totalVotesCast, pair[0].eligibleVoters) ?? '—'}
              b={turnoutPct(pair[1].totalVotesCast, pair[1].eligibleVoters) ?? '—'}
            />
            <StatRow
              label={t('compare.stat_candidates')}
              a={candidates.filter(c => c.elections.some(ce => ce.electionId === pair[0].id)).length}
              b={candidates.filter(c => c.elections.some(ce => ce.electionId === pair[1].id)).length}
            />
            <StatRow
              label={t('compare.stat_system')}
              a={<span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${SYSTEM_BADGE[pair[0].votingSystem]}`}>{pair[0].votingSystem}</span>}
              b={<span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${SYSTEM_BADGE[pair[1].votingSystem]}`}>{pair[1].votingSystem}</span>}
            />
            <StatRow
              label={t('compare.stat_shortlisting')}
              a={pair[0].shortlisting?.body ?? '—'}
              b={pair[1].shortlisting?.body ?? '—'}
            />
          </tbody>
        </table>

        {/* Winners side by side */}
        <div className="mt-5 pt-4 border-t border-wmf-border grid grid-cols-2 gap-4">
          {pair.map(e => {
            const winners = candidates.filter(c => e.winnerIds.includes(c.id));
            return (
              <div key={e.id}>
                <div className="text-xs font-semibold text-wmf-muted mb-2">{t('elections.winners')} {e.year}</div>
                {winners.map(w => (
                  <div key={w.id} className="flex items-center gap-1.5 text-sm mb-1">
                    <span>{countryFlag(w.countryCode)}</span>
                    <Link to={`/candidates/${w.id}`} onClick={onClose} className="text-wmf-blue hover:underline">
                      {w.name}
                    </Link>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Elections() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterSystem = (searchParams.get('system') ?? 'all') as VotingSystem | 'all';
  const filterType = (searchParams.get('type') ?? 'all') as ElectionType | 'all';
  const [selected, setSelected] = useState<string[]>([]);
  const [comparing, setComparing] = useState<[string, string] | null>(null);

  const setFilterSystem = (val: string) => {
    setSearchParams(prev => { prev.set('system', val); return prev; }, { replace: true });
  };
  const setFilterType = (val: string) => {
    setSearchParams(prev => { prev.set('type', val); return prev; }, { replace: true });
  };

  const sorted = [...elections].sort((a, b) => b.year - a.year);
  const filtered = sorted
    .filter(e => filterSystem === 'all' || e.votingSystem === filterSystem)
    .filter(e => filterType === 'all' || e.type === filterType);

  const toggleSelect = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  return (
    <div className="space-y-6">
      {comparing && (
        <CompareModal ids={comparing} onClose={() => setComparing(null)} />
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-wmf-text">{t('elections.title')}</h1>
        <div className="flex flex-wrap items-center gap-2">
          {selected.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-wmf-muted">
                {selected.length === 2
                  ? <button
                      onClick={() => setComparing(selected as [string, string])}
                      className="bg-wmf-blue text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-wmf-blue-dark transition-colors cursor-pointer"
                    >
                      {t('elections.compare_btn')}
                    </button>
                  : t('elections.compare_hint')
                }
              </span>
              <button
                onClick={() => setSelected([])}
                className="text-xs text-wmf-muted hover:text-wmf-red cursor-pointer"
              >
                {t('elections.compare_clear')}
              </button>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue"
            >
              <option value="all">{t('board.all_types')}</option>
              <option value="community">{t('board.type_community_elected')}</option>
              <option value="affiliate">{t('board.type_affiliate_selected')}</option>
              <option value="mixed">{t('elections.type_mixed')}</option>
            </select>
            <select
              value={filterSystem}
              onChange={e => setFilterSystem(e.target.value)}
              className="border border-wmf-border rounded px-3 py-1.5 text-sm bg-white focus:outline-none focus:border-wmf-blue"
            >
              <option value="all">{t('elections.all_systems')}</option>
              {SYSTEMS.map(s => (
                <option key={s} value={s}>{t(`common.voting_system.${s}`)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {selected.length > 0 && selected.length < 2 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm text-amber-700">
          {t('elections.compare_hint')} ({selected.length}/2)
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg border border-wmf-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-wmf-gray border-b border-wmf-border text-left">
              <th className="px-3 py-3 w-8">
                <span className="sr-only">{t('elections.compare_select')}</span>
              </th>
              <th className="px-4 py-3 font-semibold">{t('elections.year')}</th>
              <th className="px-4 py-3 font-semibold">{t('elections.system')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.seats')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.candidates_count')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.eligible')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.votes_cast')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.turnout')}</th>
              <th className="px-4 py-3 font-semibold">{t('elections.shortlisting')}</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(election => {
              const electionCandidates = candidates.filter(c =>
                c.elections.some(ce => ce.electionId === election.id)
              );
              const isSelected = selected.includes(election.id);
              return (
                <tr
                  key={election.id}
                  className={`border-b border-wmf-border last:border-0 transition-colors ${isSelected ? 'bg-blue-50' : 'hover:bg-wmf-gray/60'}`}
                >
                  <td className="px-3 py-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(election.id)}
                      disabled={!isSelected && selected.length >= 2}
                      className="rounded border-wmf-border accent-wmf-blue cursor-pointer"
                      title={t('elections.compare_select')}
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-wmf-blue">{election.year}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${SYSTEM_BADGE[election.votingSystem]}`}>
                      {election.votingSystem}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{election.seats}</td>
                  <td className="px-4 py-3 text-right">{electionCandidates.length}</td>
                  <td className="px-4 py-3 text-right">{election.eligibleVoters?.toLocaleString() ?? '—'}</td>
                  <td className="px-4 py-3 text-right">{election.totalVotesCast?.toLocaleString() ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    {turnoutPct(election.totalVotesCast, election.eligibleVoters) ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {election.shortlisting
                      ? <span className="inline-flex items-center gap-1 text-xs text-wmf-green font-medium">✓ {election.shortlisting.body ?? 'Yes'}</span>
                      : <span className="text-wmf-muted text-xs">—</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/elections/${election.id}`} className="text-wmf-blue hover:underline text-xs font-medium whitespace-nowrap">
                      {t('elections.details')} →
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
