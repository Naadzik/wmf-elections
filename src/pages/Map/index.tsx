import { useState, useMemo, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { elections, candidates } from '../../data';

// ── ISO numeric → Alpha-2 (world-atlas 110m) ───────────────────────────────
const ISO_NUM: Record<number, string> = {
  4:'AF', 8:'AL', 12:'DZ', 24:'AO', 28:'AG', 31:'AZ', 32:'AR', 36:'AU', 40:'AT',
  44:'BS', 48:'BH', 50:'BD', 51:'AM', 52:'BB', 56:'BE', 64:'BT', 68:'BO', 70:'BA',
  76:'BR', 84:'BZ', 96:'BN', 100:'BG', 104:'MM', 108:'BI', 116:'KH', 120:'CM',
  124:'CA', 132:'CV', 140:'CF', 144:'LK', 148:'TD', 152:'CL', 156:'CN', 158:'TW',
  170:'CO', 174:'KM', 178:'CG', 180:'CD', 188:'CR', 191:'HR', 192:'CU', 196:'CY',
  203:'CZ', 204:'BJ', 208:'DK', 214:'DO', 218:'EC', 222:'SV', 226:'GQ', 231:'ET',
  232:'ER', 233:'EE', 242:'FJ', 246:'FI', 250:'FR', 266:'GA', 268:'GE', 270:'GM',
  275:'PS', 276:'DE', 288:'GH', 300:'GR', 308:'GD', 320:'GT', 324:'GN', 328:'GY',
  332:'HT', 340:'HN', 344:'HK', 348:'HU', 356:'IN', 360:'ID', 364:'IR', 368:'IQ',
  372:'IE', 376:'IL', 380:'IT', 384:'CI', 388:'JM', 392:'JP', 398:'KZ', 400:'JO',
  404:'KE', 408:'KP', 410:'KR', 414:'KW', 417:'KG', 418:'LA', 422:'LB', 426:'LS',
  428:'LV', 430:'LR', 434:'LY', 440:'LT', 442:'LU', 450:'MG', 454:'MW', 458:'MY',
  462:'MV', 466:'ML', 478:'MR', 484:'MX', 496:'MN', 498:'MD', 499:'ME', 504:'MA',
  508:'MZ', 516:'NA', 524:'NP', 528:'NL', 548:'VU', 554:'NZ', 558:'NI', 562:'NE',
  566:'NG', 578:'NO', 586:'PK', 591:'PA', 598:'PG', 600:'PY', 604:'PE', 608:'PH',
  616:'PL', 620:'PT', 624:'GW', 626:'TL', 634:'QA', 642:'RO', 643:'RU', 646:'RW',
  686:'SN', 688:'RS', 694:'SL', 702:'SG', 703:'SK', 705:'SI', 706:'SO', 710:'ZA',
  716:'ZW', 724:'ES', 728:'SS', 729:'SD', 740:'SR', 752:'SE', 756:'CH', 760:'SY',
  762:'TJ', 764:'TH', 768:'TG', 776:'TO', 780:'TT', 784:'AE', 788:'TN', 792:'TR',
  795:'TM', 800:'UG', 804:'UA', 807:'MK', 818:'EG', 826:'GB', 834:'TZ', 840:'US',
  858:'UY', 860:'UZ', 862:'VE', 882:'WS', 887:'YE', 894:'ZM',
};

// ── WMF regional groupings ─────────────────────────────────────────────────
const REGIONS: Record<string, { label: string; countries: Set<string> }> = {
  'north-america': {
    label: 'North America',
    countries: new Set(['US','CA','MX','GT','BZ','HN','SV','NI','CR','PA',
                        'CU','JM','HT','DO','TT','BB','GD','AG','BS','LC','KN','VC','DM']),
  },
  'latin-america': {
    label: 'Latin America',
    countries: new Set(['BR','AR','CL','CO','VE','PE','EC','BO','PY','UY','GY','SR']),
  },
  'western-europe': {
    label: 'Western Europe',
    countries: new Set(['GB','DE','FR','NL','BE','SE','IT','ES','PT','AT','CH',
                        'DK','NO','FI','IE','LU','IS','MT','CY','GR','AD','LI','SM','MC']),
  },
  'cee': {
    label: 'Central & Eastern Europe',
    countries: new Set(['PL','UA','RU','RS','CZ','SK','HU','RO','BG','HR','SI',
                        'BA','MK','AL','ME','MD','LT','LV','EE','BY','GE','AM','AZ',
                        'KZ','KG','TJ','TM','UZ']),
  },
  'mena': {
    label: 'MENA',
    countries: new Set(['EG','TN','DZ','MA','LY','IL','PS','JO','IQ','SA',
                        'AE','QA','KW','LB','SY','YE','IR','TR','OM','BH']),
  },
  'sub-saharan': {
    label: 'Sub-Saharan Africa',
    countries: new Set(['NG','ZA','TZ','KE','GH','ET','CD','BI','CI','NA','CM',
                        'SN','UG','RW','MZ','ZM','ZW','MW','MG','AO','GA','CG','TD',
                        'CF','ER','SO','SS','SD','ML','NE','GN','SL','LR','TG','BJ',
                        'GW','GQ','LS','BW','GM','CV']),
  },
  'south-asia': {
    label: 'South & Central Asia',
    countries: new Set(['IN','BD','PK','NP','LK','AF','MV','BT']),
  },
  'east-asia': {
    label: 'East & SE Asia',
    countries: new Set(['JP','CN','TW','KR','HK','ID','PH','TH','VN','MY',
                        'SG','MM','KH','LA','MN','KP','BN','TL']),
  },
  'oceania': {
    label: 'Oceania',
    countries: new Set(['AU','NZ','PG','FJ','SB','VU','WS','TO']),
  },
};

function getRegionKey(code: string): string | null {
  for (const [key, r] of Object.entries(REGIONS)) {
    if (r.countries.has(code)) return key;
  }
  return null;
}

function countryName(code: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) ?? code;
  } catch { return code; }
}

function countryFlag(code: string) {
  return code.toUpperCase().split('').map(c =>
    String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))
  ).join('');
}

type ShowMode = 'candidates' | 'winners';

const PROJ = d3.geoNaturalEarth1().scale(153).translate([480, 250]);
const PATH = d3.geoPath(PROJ);

// ── Component ──────────────────────────────────────────────────────────────
export default function MapPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [topology, setTopology] = useState<any>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [tooltipXY, setTooltipXY] = useState({ x: 0, y: 0 });
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const selectedElection = searchParams.get('election') ?? 'all';
  const showMode = (searchParams.get('mode') ?? 'candidates') as ShowMode;
  const filterType = (searchParams.get('type') ?? 'all') as import('../../types').ElectionType | 'all';

  const setParam = (key: string, val: string) => {
    setSearchParams(prev => { prev.set(key, val); return prev; }, { replace: true });
  };

  const sortedElections = useMemo(
    () => [...elections]
      .filter(e => filterType === 'all' || e.type === filterType)
      .sort((a, b) => a.year - b.year),
    [filterType]
  );
  const ALL_YEARS = sortedElections.map(e => e.year);

  const sliderVal = selectedElection === 'all'
    ? -1
    : ALL_YEARS.indexOf(parseInt(selectedElection.split('-')[0]));

  const handleSlider = (val: number) => {
    if (val === -1) setParam('election', 'all');
    else { const e = sortedElections[val]; if (e) setParam('election', e.id); }
  };

  const currentElection = selectedElection !== 'all'
    ? elections.find(e => e.id === selectedElection)
    : null;

  // Fetch topology once
  useEffect(() => {
    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
      .then(setTopology)
      .catch(console.error);
  }, []);

  // Build country features
  const countries = useMemo(() => {
    if (!topology) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const geo = topojson.feature(topology, topology.objects.countries) as any;
    return geo.features as GeoJSON.Feature[];
  }, [topology]);

  // Active candidates filtered by election + mode + type
  const activeCandidates = useMemo(() => {
    if (selectedElection === 'all') {
      return candidates.filter(c => {
        const entries = filterType === 'all' ? c.elections : c.elections.filter(e => e.type === filterType);
        if (entries.length === 0) return false;
        return showMode === 'winners' ? entries.some(e => e.elected) : true;
      });
    }
    return candidates.filter(c => {
      const entry = c.elections.find(ce => ce.electionId === selectedElection);
      if (!entry) return false;
      return showMode === 'winners' ? entry.elected : true;
    });
  }, [selectedElection, showMode, filterType]);

  // Group by country
  const byCountry = useMemo(() => {
    const map: Record<string, typeof activeCandidates> = {};
    activeCandidates.forEach(c => {
      if (!map[c.countryCode]) map[c.countryCode] = [];
      map[c.countryCode].push(c);
    });
    return map;
  }, [activeCandidates]);

  const maxCount = Math.max(...Object.values(byCountry).map(v => v.length), 1);

  // Color scale: green
  const colorScale = useMemo(
    () => d3.scaleSequentialSqrt()
      .domain([0, maxCount])
      .interpolator(d3.interpolate('#bbf7d0', '#15803d')),
    [maxCount]
  );

  const getCountryColor = useCallback((iso2: string | undefined) => {
    if (!iso2) return 'var(--color-wmf-border)';
    if (activeRegion && getRegionKey(iso2) !== activeRegion) return 'var(--color-wmf-border)';
    const count = byCountry[iso2]?.length ?? 0;
    if (count === 0) return 'var(--color-wmf-gray)';
    return colorScale(count);
  }, [byCountry, colorScale, activeRegion]);

  const selectedCandidates = selected ? (byCountry[selected] ?? []) : [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-wmf-text">{t('map.title')}</h1>
        <div className="flex flex-wrap items-center gap-2">
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
          <div className="flex border border-wmf-border rounded overflow-hidden text-sm">
            <button
              onClick={() => setParam('mode', 'candidates')}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${showMode === 'candidates' ? 'bg-wmf-blue text-white' : 'bg-white text-wmf-muted hover:bg-wmf-gray'}`}
            >{t('map.show_candidates')}</button>
            <button
              onClick={() => setParam('mode', 'winners')}
              className={`px-3 py-1.5 border-l border-wmf-border transition-colors cursor-pointer ${showMode === 'winners' ? 'bg-wmf-blue text-white' : 'bg-white text-wmf-muted hover:bg-wmf-gray'}`}
            >{t('map.show_winners')}</button>
          </div>
        </div>
      </div>

      {/* Year slider */}
      <div className="bg-white rounded-lg border border-wmf-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setParam('election', 'all')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${selectedElection === 'all' ? 'bg-wmf-blue text-white border-wmf-blue' : 'bg-white text-wmf-text border-wmf-border hover:border-wmf-blue'}`}
          >{t('map.all_elections_short')}</button>
          <input
            type="range" min={0} max={ALL_YEARS.length - 1}
            value={sliderVal < 0 ? 0 : sliderVal}
            onChange={e => handleSlider(parseInt(e.target.value))}
            className="flex-1 accent-wmf-blue cursor-pointer"
          />
          <span className="text-sm font-semibold text-wmf-blue w-28 text-right shrink-0">
            {selectedElection === 'all'
              ? '—'
              : `${currentElection?.year ?? ''} (${currentElection?.votingSystem ?? ''})`}
          </span>
        </div>
        <div className="flex mt-1 ml-16">
          <div className="flex-1 flex justify-between text-xs text-wmf-muted px-1">
            {ALL_YEARS.filter((_, i) => i % 4 === 0).map(y => <span key={y}>{y}</span>)}
            <span>{ALL_YEARS[ALL_YEARS.length - 1]}</span>
          </div>
        </div>
      </div>

      {/* Region filter chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveRegion(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${activeRegion === null ? 'bg-wmf-blue text-white border-wmf-blue' : 'bg-white text-wmf-text border-wmf-border hover:border-wmf-blue'}`}
        >{t('map.all_regions')}</button>
        {Object.entries(REGIONS).map(([key, r]) => (
          <button key={key}
            onClick={() => setActiveRegion(activeRegion === key ? null : key)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${activeRegion === key ? 'bg-wmf-blue text-white border-wmf-blue' : 'bg-white text-wmf-text border-wmf-border hover:border-wmf-blue'}`}
          >{r.label}</button>
        ))}
      </div>

      {/* Map + detail panel */}
      <div className="bg-white rounded-lg border border-wmf-border overflow-hidden relative">
        {/* SVG map */}
        <div className="relative">
          {!topology && (
            <div className="absolute inset-0 flex items-center justify-center text-wmf-muted text-sm">{t('common.loading')}</div>
          )}
          <svg
            viewBox="0 0 960 500"
            className="w-full"
            style={{ display: 'block', background: 'var(--color-wmf-gray)' }}
          >
            {countries.map(feature => {
              const numId = typeof feature.id === 'string' ? parseInt(feature.id) : (feature.id as number);
              const iso2 = ISO_NUM[numId];
              const count = iso2 ? (byCountry[iso2]?.length ?? 0) : 0;
              const isSelected = iso2 === selected;
              const isHovered = iso2 === hovered;
              const pathD = PATH(feature);
              if (!pathD) return null;
              return (
                <path
                  key={feature.id ?? numId}
                  d={pathD}
                  fill={getCountryColor(iso2)}
                  stroke={isSelected ? '#15803d' : 'var(--color-wmf-border)'}
                  strokeWidth={isSelected ? 2.5 : 0.5}
                  opacity={isHovered ? 0.8 : 1}
                  style={{ cursor: count > 0 || iso2 ? 'pointer' : 'default', transition: 'fill 0.2s, opacity 0.15s' }}
                  onClick={() => {
                    if (!iso2) return;
                    setSelected(prev => prev === iso2 ? null : iso2);
                  }}
                  onMouseEnter={e => {
                    if (!iso2) return;
                    setHovered(iso2);
                    const rect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect();
                    setTooltipXY({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }}
                  onMouseMove={e => {
                    const rect = (e.currentTarget.closest('svg') as SVGElement).getBoundingClientRect();
                    setTooltipXY({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                  }}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}
          </svg>

          {/* Hover tooltip */}
          {hovered && (
            <div
              className="absolute pointer-events-none text-xs rounded px-2.5 py-1.5 shadow-lg z-10"
              style={{ left: tooltipXY.x + 12, top: tooltipXY.y - 36, whiteSpace: 'nowrap', background: '#1f2328', color: '#e6edf3' }}
            >
              <span className="mr-1">{countryFlag(hovered)}</span>
              <strong>{countryName(hovered)}</strong>
              {(byCountry[hovered]?.length ?? 0) > 0 && (
                <span className="ml-2" style={{ color: '#4ade80' }}>
                  {byCountry[hovered].length} {byCountry[hovered].length === 1 ? t('map.candidate_one') : t('map.candidate_other')}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Selected country panel */}
        {selected && (
          <div className="border-t border-wmf-border p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-wmf-text flex items-center gap-2">
                <span className="text-xl">{countryFlag(selected)}</span>
                {countryName(selected)}
                <span className="text-sm font-normal text-wmf-muted ml-1">
                  ({selectedCandidates.length} {t('map.legend_count')})
                </span>
              </h3>
              <button onClick={() => setSelected(null)} className="text-wmf-muted hover:text-wmf-text cursor-pointer text-lg leading-none">✕</button>
            </div>
            {selectedCandidates.length === 0 ? (
              <p className="text-sm text-wmf-muted">{t('map.no_candidates')}</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {selectedCandidates.map(c => {
                  const entry = c.elections.find(ce => ce.electionId === selectedElection);
                  const isWinner = selectedElection === 'all'
                    ? c.elections.some(e => e.elected)
                    : entry?.elected ?? false;
                  return (
                    <Link key={c.id} to={`/candidates/${c.id}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-wmf-border hover:border-wmf-blue transition-colors text-sm"
                    >
                      <span className={`w-2 h-2 rounded-full ${isWinner ? 'bg-wmf-blue' : 'bg-wmf-muted'}`} />
                      <span className="font-medium text-wmf-text">{c.name}</span>
                      {isWinner && <span className="text-xs text-wmf-blue font-medium">{t('common.elected')}</span>}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Country summary */}
      <div className="bg-white rounded-lg border border-wmf-border p-4">
        <h2 className="text-sm font-semibold mb-3 text-wmf-text">{t('map.legend_count')} by country</h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(byCountry)
            .filter(([code]) => !activeRegion || getRegionKey(code) === activeRegion)
            .sort((a, b) => b[1].length - a[1].length)
            .map(([code, group]) => (
              <button key={code}
                onClick={() => setSelected(prev => prev === code ? null : code)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-sm border transition-colors cursor-pointer ${selected === code ? 'border-wmf-blue bg-wmf-blue/10 text-wmf-blue' : 'border-wmf-border bg-wmf-gray hover:border-wmf-blue hover:bg-wmf-blue/10'}`}
              >
                <span>{countryFlag(code)}</span>
                <span className="text-xs font-medium">{code}</span>
                <span className="font-bold">{group.length}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
