import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { candidates, elections } from '../../data';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

function countryFlag(code: string) {
  return code.toUpperCase().split('').map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))).join('');
}

export default function CandidateProfile() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const candidate = candidates.find(c => c.id === id);
  if (!candidate) {
    return (
      <div className="text-center py-20 text-wmf-muted">
        <p className="text-xl mb-4">Candidate not found.</p>
        <Link to="/candidates" className="text-wmf-blue hover:underline">← {t('common.back')}</Link>
      </div>
    );
  }

  const electionHistory = [...candidate.elections]
    .sort((a, b) => {
      const ya = elections.find(e => e.id === a.electionId)?.year ?? 0;
      const yb = elections.find(e => e.id === b.electionId)?.year ?? 0;
      return ya - yb;
    })
    .map(entry => {
      const election = elections.find(e => e.id === entry.electionId);
      return { ...entry, election };
    });

  const chartData = electionHistory
    .filter(e => e.votesReceived != null)
    .map(e => ({
      year: e.election?.year ?? 0,
      votes: e.votesReceived ?? 0,
      elected: e.elected,
    }));

  const totalWins = candidate.elections.filter(e => e.elected).length;

  return (
    <div className="space-y-6">
      <Link to="/candidates" className="text-wmf-blue hover:underline text-sm">← {t('common.back')}</Link>

      {/* Header card */}
      <div className="bg-white rounded-lg border border-wmf-border p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-wmf-text">{candidate.name}</h1>
            <p className="text-wmf-muted text-sm mt-0.5">
              @{candidate.username}
              {candidate.wikiProject && <span className="ml-2 font-mono text-xs bg-wmf-gray px-1.5 py-0.5 rounded">{candidate.wikiProject}</span>}
            </p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-wmf-blue">{candidate.elections.length}</div>
              <div className="text-xs text-wmf-muted mt-0.5">{t('candidates.elections_count')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-wmf-blue">{totalWins}</div>
              <div className="text-xs text-wmf-muted mt-0.5">{t('candidates.wins')}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-wmf-border">
          <div>
            <div className="text-xs text-wmf-muted">{t('candidates.country')}</div>
            <div className="font-medium mt-0.5">
              {countryFlag(candidate.countryCode)} {candidate.countryCode}
              {candidate.region && <span className="text-wmf-muted text-xs ml-1.5">({candidate.region})</span>}
            </div>
          </div>
          <div>
            <div className="text-xs text-wmf-muted">{t('candidates.affiliate')}</div>
            <div className="font-medium mt-0.5">{candidate.affiliate ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-wmf-muted">{t('candidates.edit_count')}</div>
            <div className="font-medium mt-0.5">{candidate.editCount?.toLocaleString() ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-wmf-muted">{t('candidates.account_since')}</div>
            <div className="font-medium mt-0.5">{candidate.accountCreated ?? '—'}</div>
          </div>
        </div>
      </div>

      {/* Vote history chart */}
      {chartData.length >= 2 && (
        <div className="bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">Votes received per election</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData} margin={{ top: 8, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v) => [`${v} ${t('common.votes')}`, '']} />
              <Line
                type="monotone"
                dataKey="votes"
                stroke="#0645ad"
                strokeWidth={2}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      key={`dot-${payload.year}`}
                      cx={cx}
                      cy={cy}
                      r={5}
                      fill={payload.elected ? '#0645ad' : '#ffffff'}
                      stroke="#0645ad"
                      strokeWidth={2}
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-wmf-muted mt-2">Filled dot = elected · Empty dot = not elected</p>
        </div>
      )}

      {/* Election history table */}
      <div className="bg-white rounded-lg border border-wmf-border overflow-hidden">
        <div className="px-5 py-3 border-b border-wmf-border">
          <h2 className="text-base font-semibold">{t('candidates.profile.election_history')}</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-wmf-gray border-b border-wmf-border text-left">
              <th className="px-4 py-3 font-semibold">{t('elections.year')}</th>
              <th className="px-4 py-3 font-semibold">{t('elections.system')}</th>
              <th className="px-4 py-3 font-semibold text-right">{t('elections.votes_cast')}</th>
              <th className="px-4 py-3 font-semibold">{t('common.elected')}</th>
              <th className="px-4 py-3 font-semibold">{t('candidates.profile.experience')}</th>
            </tr>
          </thead>
          <tbody>
            {electionHistory.map(({ election, votesReceived, elected, experience }) => (
              <tr key={election?.id} className={`border-b border-wmf-border last:border-0 hover:bg-wmf-gray/60 transition-colors ${elected ? 'bg-blue-50/30' : ''}`}>
                <td className="px-4 py-3">
                  {election ? (
                    <Link to={`/elections/${election.id}`} className="text-wmf-blue hover:underline font-semibold">
                      {election.year}
                    </Link>
                  ) : '—'}
                </td>
                <td className="px-4 py-3 text-xs text-wmf-muted">{election?.votingSystem ?? '—'}</td>
                <td className="px-4 py-3 text-right font-medium">
                  {votesReceived?.toLocaleString() ?? '—'}
                </td>
                <td className="px-4 py-3">
                  {elected
                    ? <span className="text-wmf-blue font-semibold text-xs">✓</span>
                    : <span className="text-wmf-muted text-xs">—</span>
                  }
                </td>
                <td className="px-4 py-3 text-xs text-wmf-muted">
                  {experience?.previousBoardTerms != null && (
                    <span className="mr-3">{experience.previousBoardTerms} prev. terms</span>
                  )}
                  {experience?.yearsInAffiliate != null && (
                    <span className="mr-3">{experience.yearsInAffiliate}y in affiliate</span>
                  )}
                  {experience?.otherRoles?.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
