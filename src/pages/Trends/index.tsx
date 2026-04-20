import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { elections, candidates } from '../../data';
import type { ElectionType } from '../../types';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend, ScatterChart,
  Scatter, ZAxis, Cell,
} from 'recharts';

export default function Trends() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = (searchParams.get('type') ?? 'all') as ElectionType | 'all';

  const setFilterType = (val: string) => {
    setSearchParams(prev => { prev.set('type', val); return prev; }, { replace: true });
  };

  const sorted = useMemo(
    () => [...elections]
      .filter(e => filterType === 'all' || e.type === filterType)
      .sort((a, b) => a.year - b.year),
    [filterType]
  );

  // Turnout data
  const turnoutData = sorted.map(e => ({
    year: e.year,
    eligible: e.eligibleVoters ?? 0,
    votes: e.totalVotesCast ?? 0,
    pct: e.eligibleVoters && e.totalVotesCast
      ? +((e.totalVotesCast / e.eligibleVoters) * 100).toFixed(1)
      : null,
  }));

  // Candidates per election
  const candidatesData = sorted.map(e => ({
    year: e.year,
    count: candidates.filter(c => c.elections.some(ce => ce.electionId === e.id)).length,
    seats: e.seats,
  }));

  // Gender diversity per election
  const genderData = sorted.map(e => {
    const ec = candidates.filter(c => c.elections.some(ce => ce.electionId === e.id));
    const total = ec.length;
    const f = ec.filter(c => c.gender === 'F').length;
    const m = ec.filter(c => c.gender === 'M').length;
    return {
      year: e.year,
      F: total ? +((f / total) * 100).toFixed(0) : 0,
      M: total ? +((m / total) * 100).toFixed(0) : 0,
    };
  });

  // Regional diversity
  const regionData = sorted.map(e => {
    const ec = candidates.filter(c => c.elections.some(ce => ce.electionId === e.id));
    return { year: e.year, regions: new Set(ec.map(c => c.region ?? 'Other')).size };
  });

  // Repeat candidates
  const repeatCandidates = useMemo(
    () => candidates.filter(c => c.elections.length >= 2).sort((a, b) => b.elections.length - a.elections.length),
    []
  );

  // Affiliate analysis
  const affiliateStats = useMemo(() => {
    const map: Record<string, { appearances: number; wins: number }> = {};
    candidates.forEach(c => {
      const aff = c.affiliate ?? 'Independent';
      if (!map[aff]) map[aff] = { appearances: 0, wins: 0 };
      map[aff].appearances += c.elections.length;
      map[aff].wins += c.elections.filter(e => e.elected).length;
    });
    return Object.entries(map)
      .map(([name, stats]) => ({ name, ...stats }))
      .sort((a, b) => b.appearances - a.appearances)
      .slice(0, 10);
  }, []);

  // Scatter: edit count vs votes (one dot per candidate-election entry)
  const scatterData = useMemo(() => {
    const points: { editCount: number; votes: number; name: string; year: number; elected: boolean }[] = [];
    candidates.forEach(c => {
      if (!c.editCount) return;
      c.elections.forEach(entry => {
        if (!entry.votesReceived) return;
        const election = elections.find(e => e.id === entry.electionId);
        points.push({
          editCount: c.editCount!,
          votes: entry.votesReceived,
          name: c.name,
          year: election?.year ?? 0,
          elected: entry.elected,
        });
      });
    });
    return points;
  }, []);

  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-white border border-wmf-border rounded shadow-sm px-3 py-2 text-xs">
        <div className="font-semibold">{d.name}</div>
        <div className="text-wmf-muted">{d.year} · {d.elected ? '✓ elected' : 'not elected'}</div>
        <div>{(d.editCount as number).toLocaleString()} edits → {(d.votes as number).toLocaleString()} votes</div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-wmf-text">{t('trends.title')}</h1>
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
      </div>

      {/* Turnout */}
      <div className="bg-white rounded-lg border border-wmf-border p-5">
        <h2 className="text-base font-semibold mb-4">{t('trends.turnout_over_time')}</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={turnoutData} margin={{ top: 8, right: 40, bottom: 4, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" unit="%" tick={{ fontSize: 11 }} domain={[0, 50]} />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="eligible" stroke="#a2a9b1" name="Eligible" strokeWidth={1.5} dot={false} />
            <Line yAxisId="left" type="monotone" dataKey="votes" stroke="#0645ad" name="Votes cast" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="pct" stroke="#14866d" name="Turnout %" strokeWidth={2} strokeDasharray="5 3" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidates per election */}
        <div className="bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">{t('trends.candidates_over_time')}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={candidatesData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Candidates" fill="#0645ad" radius={[3, 3, 0, 0]} />
              <Bar dataKey="seats" name="Seats" fill="#a2a9b1" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender diversity */}
        <div className="bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">{t('trends.gender_over_time')}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={genderData} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" />
              <Tooltip formatter={(v) => [`${v}%`, '']} />
              <Legend />
              <Bar dataKey="F" name="Female" stackId="g" fill="#db2777" />
              <Bar dataKey="M" name="Male" stackId="g" fill="#0645ad" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional diversity */}
        <div className="bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">{t('trends.region_over_time')}</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={regionData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="regions" name="Unique regions" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Repeat candidates */}
        <div className="bg-white rounded-lg border border-wmf-border p-5">
          <h2 className="text-base font-semibold mb-4">{t('trends.repeat_candidates')}</h2>
          <div className="space-y-2">
            {repeatCandidates.map(c => {
              const wins = c.elections.filter(e => e.elected).length;
              return (
                <div key={c.id} className="flex items-center gap-3 text-sm">
                  <span className="text-wmf-muted w-6 text-right font-mono">{c.elections.length}×</span>
                  <div className="flex-1 bg-wmf-gray rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full bg-wmf-blue rounded-full"
                      style={{ width: `${(c.elections.length / 10) * 100}%` }}
                    />
                  </div>
                  <span className="font-medium w-32 truncate">{c.name}</span>
                  <span className="text-wmf-muted text-xs">{wins}W</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Affiliate analysis ── */}
      <div className="bg-white rounded-lg border border-wmf-border p-5">
        <h2 className="text-base font-semibold mb-1">{t('trends.affiliate_analysis')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-sm font-medium text-wmf-muted mb-3">{t('trends.top_affiliates_candidates')}</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={affiliateStats}
                layout="vertical"
                margin={{ left: 120, right: 40, top: 4, bottom: 4 }}
              >
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={115} />
                <Tooltip />
                <Bar dataKey="appearances" name="Appearances" fill="#0645ad" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-sm font-medium text-wmf-muted mb-3">{t('trends.top_affiliates_wins')}</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={[...affiliateStats].sort((a, b) => b.wins - a.wins)}
                layout="vertical"
                margin={{ left: 120, right: 40, top: 4, bottom: 4 }}
              >
                <XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={115} />
                <Tooltip />
                <Bar dataKey="wins" name="Wins" fill="#14866d" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Scatter: edit count vs votes ── */}
      <div className="bg-white rounded-lg border border-wmf-border p-5">
        <h2 className="text-base font-semibold mb-1">{t('trends.scatter_title')}</h2>
        <p className="text-xs text-wmf-muted mb-4">{t('trends.scatter_note')}</p>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ top: 8, right: 16, bottom: 24, left: 16 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              dataKey="editCount"
              name={t('trends.scatter_x')}
              tick={{ fontSize: 11 }}
              tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
              label={{ value: t('trends.scatter_x'), position: 'insideBottom', offset: -12, fontSize: 11, fill: '#54595d' }}
            />
            <YAxis
              type="number"
              dataKey="votes"
              name={t('trends.scatter_y')}
              tick={{ fontSize: 11 }}
              label={{ value: t('trends.scatter_y'), angle: -90, position: 'insideLeft', fontSize: 11, fill: '#54595d' }}
            />
            <ZAxis range={[40, 40]} />
            <Tooltip content={<CustomScatterTooltip />} />
            <Scatter data={scatterData} fill="#0645ad">
              {scatterData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.elected ? '#0645ad' : '#a2a9b1'}
                  fillOpacity={0.75}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 text-xs text-wmf-muted">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block bg-wmf-blue" /> Elected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full inline-block bg-wmf-border" /> Not elected
          </span>
        </div>
      </div>
    </div>
  );
}
