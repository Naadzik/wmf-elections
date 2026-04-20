import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { elections, candidates } from '../../data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import STVSankey from '../../components/charts/STVSankey';

const ELECTED_COLOR = '#0645ad';
const NOT_ELECTED_COLOR = '#a2a9b1';

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-wmf-border last:border-0 text-sm">
      <span className="text-wmf-muted">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

function turnoutPct(votes?: number, eligible?: number) {
  if (!votes || !eligible) return null;
  return ((votes / eligible) * 100).toFixed(1) + '%';
}

export default function ElectionDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const election = elections.find(e => e.id === id);
  if (!election) {
    return (
      <div className="text-center py-20 text-wmf-muted">
        <p className="text-xl mb-4">Election not found.</p>
        <Link to="/elections" className="text-wmf-blue hover:underline">← {t('common.back')}</Link>
      </div>
    );
  }

  const electionCandidates = candidates.filter(c =>
    c.elections.some(ce => ce.electionId === election.id)
  );

  const chartData = electionCandidates
    .map(c => {
      const entry = c.elections.find(ce => ce.electionId === election.id)!;
      return {
        name: c.name,
        id: c.id,
        votes: entry.votesReceived ?? election.result?.voteCounts[c.id] ?? 0,
        elected: election.winnerIds.includes(c.id),
      };
    })
    .sort((a, b) => b.votes - a.votes);

  const stvCandidates = electionCandidates.filter(c =>
    election.result?.stvRounds?.some(r => c.id in r.counts)
  );
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:space-y-4" ref={printRef}>
      {/* Back + header */}
      <div className="print:hidden">
        <Link to="/elections" className="text-wmf-blue hover:underline text-sm">← {t('common.back')}</Link>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-wmf-text">
            {election.year} — {t(`common.voting_system.${election.votingSystem}`)}
          </h1>
          <div className="flex items-center gap-3">
            {election.metaUrl && (
              <a
                href={election.metaUrl}
                className="text-sm text-wmf-blue hover:underline print:hidden"
                target="_blank"
                rel="noreferrer"
              >
                {t('election_detail.meta_link')} ↗
              </a>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-sm text-wmf-muted hover:text-wmf-blue border border-wmf-border rounded px-3 py-1.5 hover:border-wmf-blue transition-colors print:hidden cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              {t('election_detail.print')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info panel */}
        <div className="bg-white rounded-lg border border-wmf-border p-5 space-y-0">
          <InfoRow label={t('elections.seats')} value={`${election.seats} ${t('common.seats')}`} />
          <InfoRow
            label={t('elections.eligible')}
            value={election.eligibleVoters?.toLocaleString() ?? '—'}
          />
          <InfoRow
            label={t('elections.votes_cast')}
            value={election.totalVotesCast?.toLocaleString() ?? '—'}
          />
          <InfoRow
            label={t('elections.turnout')}
            value={turnoutPct(election.totalVotesCast, election.eligibleVoters) ?? '—'}
          />
          <InfoRow
            label={t('elections.candidates_count')}
            value={electionCandidates.length}
          />
          <InfoRow
            label={t('elections.system')}
            value={
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                election.votingSystem === 'STV' ? 'bg-blue-100 text-blue-800' :
                election.votingSystem === 'approval' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-700'
              }`}>
                {election.votingSystem}
              </span>
            }
          />
          {election.shortlisting && (
            <>
              <InfoRow
                label={t('election_detail.shortlisting_info')}
                value={election.shortlisting.body ?? '—'}
              />
              {election.shortlisting.totalNominated && (
                <InfoRow
                  label={t('election_detail.nominated')}
                  value={election.shortlisting.totalNominated}
                />
              )}
              {election.shortlisting.shortlisted && (
                <InfoRow
                  label={t('election_detail.shortlisted')}
                  value={election.shortlisting.shortlisted}
                />
              )}
            </>
          )}
        </div>

        {/* Vote distribution bar chart */}
        <div className="md:col-span-2 bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">{t('election_detail.vote_distribution')}</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 100, right: 60, top: 4, bottom: 4 }}>
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={95} />
              <Tooltip formatter={(v) => [`${v} ${t('common.votes')}`, '']} />
              <Bar dataKey="votes" radius={[0, 3, 3, 0]}>
                <LabelList dataKey="votes" position="right" style={{ fontSize: 11, fill: '#54595d' }} />
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.elected ? ELECTED_COLOR : NOT_ELECTED_COLOR} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-wmf-muted">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm inline-block bg-wmf-blue" /> {t('common.elected')}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm inline-block bg-wmf-border" /> {t('common.not_elected')}
            </span>
          </div>
        </div>
      </div>

      {/* STV Sankey */}
      {election.votingSystem === 'STV' && election.result?.stvRounds && election.result.stvRounds.length >= 2 && (
        <div className="bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">{t('election_detail.sankey_title')}</h2>
          <STVSankey rounds={election.result.stvRounds} candidates={stvCandidates} width={700} />
          <p className="text-xs text-wmf-muted mt-3">{t('election_detail.sankey_note')}</p>
        </div>
      )}

      {/* Candidates table */}
      <div className="bg-white rounded-lg border border-wmf-border overflow-hidden">
        <div className="px-5 py-3 border-b border-wmf-border">
          <h2 className="text-base font-semibold">{t('elections.candidates_count')}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-wmf-gray border-b border-wmf-border text-left">
              <th className="px-4 py-3 font-semibold">{t('candidates.name')}</th>
              <th className="px-4 py-3 font-semibold">{t('candidates.country')}</th>
              <th className="px-4 py-3 font-semibold">{t('candidates.affiliate')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('candidates.edit_count')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.votes_cast')}</th>
              <th className="px-4 py-3 font-semibold">{t('common.elected')}</th>
            </tr>
          </thead>
          <tbody>
            {chartData.map(({ id, name, votes, elected }) => {
              const cand = candidates.find(c => c.id === id)!;
              return (
                <tr key={id} className={`border-b border-wmf-border last:border-0 hover:bg-wmf-gray/60 transition-colors ${elected ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-4 py-3">
                    <Link to={`/candidates/${id}`} className="text-wmf-blue hover:underline font-medium">
                      {name}
                    </Link>
                    {cand.username && <span className="text-wmf-muted text-xs ml-1.5">@{cand.username}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-lg mr-1" title={cand.countryCode}>
                      {countryFlag(cand.countryCode)}
                    </span>
                    <span className="text-xs text-wmf-muted">{cand.countryCode}</span>
                  </td>
                  <td className="px-4 py-3 text-wmf-muted text-xs">{cand.affiliate ?? '—'}</td>
                  <td className="px-4 py-3 text-right">{cand.editCount?.toLocaleString() ?? '—'}</td>
                  <td className="px-4 py-3 text-right font-medium">{votes.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {elected
                      ? <span className="text-wmf-blue font-semibold text-xs">✓ {t('common.elected')}</span>
                      : <span className="text-wmf-muted text-xs">—</span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {election.notes && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>{t('election_detail.notes')}:</strong> {election.notes}
        </div>
      )}
    </div>
  );
}

function countryFlag(code: string) {
  return code
    .toUpperCase()
    .split('')
    .map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
    .join('');
}
