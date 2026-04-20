export type VotingSystem =
  | 'STV'
  | 'approval'
  | 'plurality'
  | 'condorcet'
  | 'other';

export type ElectionType = 'community' | 'affiliate' | 'mixed';

export type Gender = 'M' | 'F' | 'NB' | 'unknown';

export type BoardMemberType =
  | 'community-elected'
  | 'affiliate-selected'
  | 'appointed'
  | 'staff';

// ── Candidates ─────────────────────────────────────────────────────────────

export interface CandidateExperience {
  education?: string;
  yearsInAffiliate?: number;
  previousBoardTerms?: number;
  otherRoles?: string[];
  notes?: string;
}

export interface CandidateElectionEntry {
  electionId: string;
  type: ElectionType;
  votesReceived?: number;
  elected: boolean;
  experience?: CandidateExperience;
  statementUrl?: string;
}

export interface Candidate {
  id: string;
  name: string;
  username: string;
  gender?: Gender;
  countryCode: string;        // ISO 3166-1 alpha-2
  region?: string;            // e.g. "Northern Europe"
  affiliate?: string;         // Wikimedia affiliate name
  wikiProject?: string;       // primary project, e.g. "enwiki"
  nativeLanguage?: string;
  accountCreated?: string;    // ISO date
  editCount?: number;
  elections: CandidateElectionEntry[];
}

// ── Elections ───────────────────────────────────────────────────────────────

export interface ShortlistingProcess {
  description: string;
  body?: string;              // e.g. "ASBS", "CAC"
  totalNominated?: number;
  shortlisted?: number;
  notes?: string;
}

export interface STVRound {
  round: number;
  counts: Record<string, number>;   // candidateId → vote count
  eliminated?: string;
  elected?: string | string[];      // single or multiple (STV can elect multiple in one round)
  surplus?: number;
  quota?: number;
}

export interface ElectionResult {
  candidateIds: string[];           // ordered by final standing
  voteCounts: Record<string, number>; // candidateId → total votes
  /** STV ballot rounds for Sankey/flowchart */
  stvRounds?: STVRound[];
  /** Raw ballot dump URL if publicly available */
  dumpUrl?: string;
  notes?: string;
}

export interface Election {
  id: string;
  year: number;
  startDate: string;          // ISO date
  endDate: string;            // ISO date
  type: ElectionType;
  votingSystem: VotingSystem;
  seats: number;
  eligibleVoters?: number;
  totalVotesCast?: number;
  winnerIds: string[];
  candidateIds: string[];
  shortlisting?: ShortlistingProcess;
  result?: ElectionResult;
  notes?: string;
  metaUrl?: string;
}

// ── Board composition ────────────────────────────────────────────────────────

export interface BoardTerm {
  start: string;              // ISO date
  end?: string;               // ISO date, undefined = current
  type: BoardMemberType;
  role?: string;              // e.g. "Chair", "Treasurer"
  electionId?: string;        // if elected
}

export interface BoardMember {
  /** Links to Candidate if elected at some point; standalone for appointed members */
  candidateId?: string;
  name: string;
  username?: string;
  countryCode?: string;
  gender?: Gender;
  terms: BoardTerm[];
}

// ── App-level helpers ────────────────────────────────────────────────────────

export interface AppData {
  elections: Election[];
  candidates: Candidate[];
  boardMembers: BoardMember[];
}
