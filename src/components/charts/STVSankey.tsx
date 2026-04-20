import { useMemo, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import type { STVRound, Candidate } from '../../types';

interface Props {
  rounds: STVRound[];
  candidates: Candidate[];
  note?: string;
  width?: number;
}

const COLORS = d3.schemeTableau10;

export default function STVSankey({ rounds, candidates, width = 700 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const candidateMap = useMemo(
    () => Object.fromEntries(candidates.map(c => [c.id, c])),
    [candidates]
  );

  // Collect all candidate IDs that appear in any round
  const allCandidateIds = useMemo(() => {
    const ids = new Set<string>();
    rounds.forEach(r => Object.keys(r.counts).forEach(id => ids.add(id)));
    return Array.from(ids);
  }, [rounds]);

  const colorMap = useMemo(
    () => Object.fromEntries(allCandidateIds.map((id, i) => [id, COLORS[i % COLORS.length]])),
    [allCandidateIds]
  );

  const height = Math.max(300, allCandidateIds.length * 60 + 40);
  const margin = { top: 20, right: 160, bottom: 20, left: 160 };
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  useEffect(() => {
    if (!svgRef.current || rounds.length < 2) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colW = innerW / (rounds.length - 1);
    const quota = rounds[0].quota ?? undefined;

    // For each round, build y-positions for each candidate (sorted by vote count desc)
    const roundLayouts = rounds.map((round, _ri) => {
      const entries = Object.entries(round.counts).sort((a, b) => b[1] - a[1]);
      const total = entries.reduce((s, [, v]) => s + v, 0);
      let y = 0;
      return entries.map(([id, votes]) => {
        const h = (votes / total) * innerH;
        const result = { id, votes, y, h };
        y += h + 4;
        return result;
      });
    });

    // Draw flows between consecutive rounds
    for (let ri = 0; ri < rounds.length - 1; ri++) {
      const leftLayout = roundLayouts[ri];
      const rightLayout = roundLayouts[ri + 1];

      leftLayout.forEach(left => {
        const right = rightLayout.find(r => r.id === left.id);
        if (!right) return; // candidate eliminated this round

        const x0 = ri * colW + colW * 0.3;
        const x1 = (ri + 1) * colW - colW * 0.3;
        const y0 = left.y + left.h / 2;
        const y1 = right.y + right.h / 2;
        const hy0 = Math.min(left.h, right.h) * 0.85;
        const hy1 = hy0;

        g.append('path')
          .attr('d', `
            M ${x0} ${y0 - hy0 / 2}
            C ${(x0 + x1) / 2} ${y0 - hy0 / 2}, ${(x0 + x1) / 2} ${y1 - hy1 / 2}, ${x1} ${y1 - hy1 / 2}
            L ${x1} ${y1 + hy1 / 2}
            C ${(x0 + x1) / 2} ${y1 + hy1 / 2}, ${(x0 + x1) / 2} ${y0 + hy0 / 2}, ${x0} ${y0 + hy0 / 2}
            Z
          `)
          .attr('fill', colorMap[left.id])
          .attr('opacity', 0.35);
      });
    }

    // Draw bars for each round
    rounds.forEach((round, ri) => {
      const layout = roundLayouts[ri];
      const x = ri * colW;

      layout.forEach(({ id, votes, y, h }) => {
        const isElected = Array.isArray(round.elected) ? round.elected.includes(id) : round.elected === id;
        const isEliminated = round.eliminated === id;

        g.append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', colW * 0.28)
          .attr('height', Math.max(h - 4, 2))
          .attr('rx', 3)
          .attr('fill', colorMap[id])
          .attr('opacity', isEliminated ? 0.3 : 0.85)
          .attr('stroke', isElected ? '#f59e0b' : 'none')
          .attr('stroke-width', 2);

        // Label
        if (ri === 0) {
          const name = candidateMap[id]?.name ?? id;
          g.append('text')
            .attr('x', x - 8)
            .attr('y', y + h / 2 + 4)
            .attr('text-anchor', 'end')
            .attr('font-size', 11)
            .attr('fill', 'currentColor')
            .text(name.split(' ')[0]);
        }

        // Votes label
        g.append('text')
          .attr('x', x + colW * 0.14)
          .attr('y', y + h / 2 + 4)
          .attr('text-anchor', 'middle')
          .attr('font-size', 10)
          .attr('fill', '#fff')
          .attr('font-weight', '600')
          .text(votes);

        // Elected/eliminated badge
        if (isElected) {
          g.append('text')
            .attr('x', x + colW * 0.28 + 4)
            .attr('y', y + h / 2 + 4)
            .attr('font-size', 10)
            .attr('fill', '#f59e0b')
            .text('★ elected');
        }
        if (isEliminated) {
          g.append('text')
            .attr('x', x + colW * 0.28 + 4)
            .attr('y', y + h / 2 + 4)
            .attr('font-size', 10)
            .attr('fill', '#d73333')
            .text('✗ eliminated');
        }
      });

      // Round label at top
      g.append('text')
        .attr('x', x + colW * 0.14)
        .attr('y', -6)
        .attr('text-anchor', 'middle')
        .attr('font-size', 11)
        .attr('fill', 'currentColor')
        .attr('opacity', 0.6)
        .attr('font-weight', '600')
        .text(`R${round.round}`);

      // Quota line
      if (quota) {
        const total = Object.values(round.counts).reduce((s, v) => s + v, 0);
        const qH = (quota / total) * innerH;
        g.append('line')
          .attr('x1', x).attr('x2', x + colW * 0.28)
          .attr('y1', qH).attr('y2', qH)
          .attr('stroke', '#d73333')
          .attr('stroke-dasharray', '4 2')
          .attr('stroke-width', 1);
      }
    });

    // Final round right-side labels
    const lastLayout = roundLayouts[roundLayouts.length - 1];
    const lastX = (rounds.length - 1) * colW + colW * 0.28;
    lastLayout.forEach(({ id, y, h }) => {
      const name = candidateMap[id]?.name ?? id;
      g.append('text')
        .attr('x', lastX + 8)
        .attr('y', y + h / 2 + 4)
        .attr('font-size', 11)
        .attr('fill', 'currentColor')
        .text(name.split(' ')[0]);
    });

  }, [rounds, candidateMap, colorMap, innerH, innerW, margin, rounds.length]);

  if (rounds.length < 2) {
    return <p className="text-wmf-muted text-sm">Not enough STV round data to render diagram.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ fontFamily: 'sans-serif', display: 'block' }}
      />
    </div>
  );
}
