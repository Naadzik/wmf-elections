import type { BoardMember } from '../types';

export const boardMembers: BoardMember[] = [

  // ── Current board members (2025–ongoing) ────────────────────────────────────

  {
    candidateId: 'cnd-shabangu',
    name: 'Bobby Shabangu',
    username: 'Bobbyshabangu',
    countryCode: 'ZA',
    terms: [
      { start: '2025-10-01', type: 'community-elected', electionId: '2025-board' },
    ],
  },
  {
    candidateId: 'cnd-buczynski',
    name: 'Michał Buczyński',
    username: 'Aegis Maelstrom',
    countryCode: 'PL',
    terms: [
      { start: '2025-10-01', type: 'community-elected', electionId: '2025-board' },
    ],
  },
  {
    candidateId: 'cnd-steigenberger',
    name: 'Christel Steigenberger',
    username: 'Kritzolina',
    countryCode: 'DE',
    terms: [
      { start: '2024-10-01', type: 'community-elected', electionId: '2024-board' },
    ],
  },
  {
    candidateId: 'cnd-nadzik',
    name: 'Maciej Nadzikiewicz',
    username: 'Nadzik',
    countryCode: 'PL',
    terms: [
      { start: '2024-10-01', type: 'community-elected', electionId: '2024-board' },
    ],
  },
  {
    candidateId: 'cnd-doronina',
    name: 'Victoria Doronina',
    username: 'Victoria',
    countryCode: 'DE',
    terms: [
      { start: '2021-10-01', end: '2024-10-01', type: 'community-elected', electionId: '2021-board' },
      { start: '2024-10-01', type: 'community-elected', electionId: '2024-board' },
    ],
  },
  {
    candidateId: 'cnd-losa',
    name: 'Lorenzo Losa',
    username: 'Laurentius',
    countryCode: 'IT',
    terms: [
      { start: '2021-10-01', end: '2024-10-01', type: 'community-elected', electionId: '2021-board' },
      { start: '2024-10-01', type: 'community-elected', electionId: '2024-board' },
    ],
  },

  // ── Permanent/long-serving appointed members ────────────────────────────────

  {
    name: 'Jimmy Wales',
    username: 'Jimbo Wales',
    countryCode: 'US',
    gender: 'M',
    terms: [
      { start: '2003-06-01', type: 'appointed', role: 'Founder' },
    ],
  },
  {
    name: 'Mayre Clark',
    countryCode: 'US',
    gender: 'F',
    terms: [
      { start: '2022-01-01', type: 'appointed', role: 'Trustee' },
    ],
  },
  {
    name: 'Raju Narisetti',
    countryCode: 'US',
    gender: 'M',
    terms: [
      { start: '2020-01-01', type: 'appointed', role: 'Trustee' },
    ],
  },
  {
    name: 'Kathy Collins',
    countryCode: 'US',
    gender: 'F',
    terms: [
      { start: '2021-01-01', type: 'appointed', role: 'Trustee' },
    ],
  },
  {
    name: 'Luis Bitencourt-Emilio',
    countryCode: 'BR',
    gender: 'M',
    terms: [
      { start: '2023-01-01', type: 'appointed', role: 'Trustee' },
    ],
  },

  // ── Former board members — 2022–2025 era ────────────────────────────────────

  {
    candidateId: 'cnd-evenstein',
    name: 'Shani Evenstein Sigalov',
    username: 'ShaniEvensteinSigalov',
    countryCode: 'IL',
    terms: [
      { start: '2019-06-01', end: '2022-10-01', type: 'affiliate-selected', electionId: '2019-affiliate' },
      { start: '2022-10-01', end: '2025-10-01', type: 'community-elected', electionId: '2022-board' },
    ],
  },
  {
    candidateId: 'cnd-peel',
    name: 'Mike Peel',
    username: 'Mike Peel',
    countryCode: 'GB',
    terms: [
      { start: '2022-10-01', end: '2025-10-01', type: 'community-elected', electionId: '2022-board' },
    ],
  },
  {
    candidateId: 'cnd-stephenson',
    name: 'Rosie Stephenson-Goodknight',
    username: 'Rosie Stephenson-Goodknight',
    countryCode: 'US',
    terms: [
      { start: '2021-10-01', end: '2024-10-01', type: 'community-elected', electionId: '2021-board' },
    ],
  },

  // ── Former board members — 2015–2021 era ────────────────────────────────────

  {
    candidateId: 'cnd-jemielniak',
    name: 'Dariusz Jemielniak',
    username: 'Pundit',
    countryCode: 'PL',
    terms: [
      { start: '2015-09-01', end: '2018-09-01', type: 'community-elected', electionId: '2015-board' },
      { start: '2017-09-01', end: '2020-09-01', type: 'community-elected', electionId: '2017-board' },
      { start: '2021-10-01', end: '2024-10-01', type: 'community-elected', electionId: '2021-board' },
    ],
  },
  {
    candidateId: 'cnd-tymkiv',
    name: 'Nataliia Tymkiv',
    username: 'NataliaTymkiv',
    countryCode: 'UA',
    terms: [
      { start: '2016-06-01', end: '2019-06-01', type: 'affiliate-selected', electionId: '2016-affiliate' },
      { start: '2019-06-01', end: '2022-06-01', type: 'affiliate-selected', electionId: '2019-affiliate' },
    ],
  },
  {
    candidateId: 'cnd-sefidari',
    name: 'María Sefidari',
    username: 'Raystorm',
    countryCode: 'ES',
    terms: [
      { start: '2013-07-01', end: '2016-09-01', type: 'community-elected', electionId: '2013-board' },
      { start: '2017-09-01', end: '2020-09-01', type: 'community-elected', electionId: '2017-board' },
    ],
  },
  {
    candidateId: 'cnd-heilman',
    name: 'James Heilman',
    username: 'Jmh649',
    countryCode: 'CA',
    terms: [
      { start: '2015-09-01', end: '2018-09-01', type: 'community-elected', electionId: '2015-board' },
      { start: '2017-09-01', end: '2020-09-01', type: 'community-elected', electionId: '2017-board' },
    ],
  },
  {
    candidateId: 'cnd-henner',
    name: 'Christophe Henner',
    username: 'ChristopheHenner',
    countryCode: 'FR',
    terms: [
      { start: '2016-06-01', end: '2019-06-01', type: 'affiliate-selected', electionId: '2016-affiliate' },
    ],
  },
  {
    candidateId: 'cnd-vrandecic',
    name: 'Denny Vrandečić',
    username: 'Denny',
    countryCode: 'DE',
    terms: [
      { start: '2015-09-01', end: '2018-09-01', type: 'community-elected', electionId: '2015-board' },
    ],
  },
  {
    name: 'Jan-Bart de Vreede',
    countryCode: 'NL',
    gender: 'M',
    terms: [
      { start: '2015-01-01', end: '2021-12-31', type: 'appointed', role: 'Chair' },
    ],
  },

  // ── Former board members — 2009–2016 era ────────────────────────────────────

  {
    candidateId: 'cnd-klein',
    name: 'Samuel Klein',
    username: 'SJ',
    countryCode: 'US',
    terms: [
      { start: '2009-09-01', end: '2012-09-01', type: 'community-elected', electionId: '2009-board' },
      { start: '2011-09-01', end: '2014-09-01', type: 'community-elected', electionId: '2011-board' },
      { start: '2013-07-01', end: '2016-09-01', type: 'community-elected', electionId: '2013-board' },
    ],
  },
  {
    candidateId: 'cnd-ayers',
    name: 'Phoebe Ayers',
    username: 'Phoebe Ayers',
    countryCode: 'US',
    terms: [
      { start: '2010-07-01', end: '2013-07-01', type: 'affiliate-selected', electionId: '2010-affiliate' },
      { start: '2013-07-01', end: '2016-09-01', type: 'community-elected', electionId: '2013-board' },
    ],
  },
  {
    candidateId: 'cnd-wiegand',
    name: 'Alice Wiegand',
    username: 'Lyzzy',
    countryCode: 'DE',
    terms: [
      { start: '2012-06-01', end: '2015-06-01', type: 'affiliate-selected', electionId: '2012-affiliate' },
    ],
  },
  {
    candidateId: 'cnd-lorente',
    name: 'Patricio Lorente',
    username: 'Patricio.lorente',
    countryCode: 'AR',
    terms: [
      { start: '2012-06-01', end: '2015-06-01', type: 'affiliate-selected', electionId: '2012-affiliate' },
      { start: '2014-06-01', end: '2017-06-01', type: 'affiliate-selected', electionId: '2014-affiliate' },
    ],
  },
  {
    candidateId: 'cnd-brioschi',
    name: 'Frieda Brioschi',
    username: 'Frieda',
    countryCode: 'IT',
    terms: [
      { start: '2007-09-01', end: '2010-09-01', type: 'community-elected', electionId: '2007-board' },
      { start: '2014-06-01', end: '2017-06-01', type: 'affiliate-selected', electionId: '2014-affiliate' },
    ],
  },

  // ── Former board members — 2007–2014 era ────────────────────────────────────

  {
    candidateId: 'cnd-walsh',
    name: 'Kat Walsh',
    username: 'Mindspillage',
    countryCode: 'US',
    terms: [
      { start: '2007-09-01', end: '2010-09-01', type: 'community-elected', electionId: '2007-board' },
      { start: '2009-09-01', end: '2012-09-01', type: 'community-elected', electionId: '2009-board' },
      { start: '2011-09-01', end: '2014-09-01', type: 'community-elected', electionId: '2011-board' },
    ],
  },
  {
    candidateId: 'cnd-klempert',
    name: 'Arne Klempert',
    username: 'Arne Klempert',
    countryCode: 'DE',
    terms: [
      { start: '2008-12-01', end: '2011-12-01', type: 'affiliate-selected', electionId: '2008-affiliate' },
      { start: '2010-07-01', end: '2013-07-01', type: 'affiliate-selected', electionId: '2010-affiliate' },
    ],
  },
  {
    candidateId: 'cnd-snow',
    name: 'Michael Snow',
    username: 'Michael Snow',
    countryCode: 'CA',
    terms: [
      { start: '2008-12-01', end: '2011-12-01', type: 'affiliate-selected', electionId: '2008-affiliate' },
    ],
  },
  {
    candidateId: 'cnd-tchen',
    name: 'Ting Chen',
    username: 'Wing',
    countryCode: 'DE',
    terms: [
      { start: '2008-09-01', end: '2011-09-01', type: 'community-elected', electionId: '2008-community' },
      { start: '2009-09-01', end: '2012-09-01', type: 'community-elected', electionId: '2009-board' },
      { start: '2011-09-01', end: '2014-09-01', type: 'community-elected', electionId: '2011-board' },
    ],
  },

  // ── Founders era (2004–2010) ─────────────────────────────────────────────────

  {
    candidateId: 'cnd-moller',
    name: 'Erik Möller',
    username: 'Erik Moeller',
    countryCode: 'DE',
    terms: [
      { start: '2006-09-01', end: '2009-09-01', type: 'community-elected', electionId: '2006-board' },
      { start: '2007-09-01', end: '2010-09-01', type: 'community-elected', electionId: '2007-board' },
    ],
  },
  {
    candidateId: 'cnd-devouard',
    name: 'Florence Devouard',
    username: 'Anthere',
    countryCode: 'FR',
    terms: [
      { start: '2004-09-01', end: '2007-09-01', type: 'community-elected', electionId: '2004-board' },
      { start: '2005-11-01', end: '2008-11-01', type: 'community-elected', electionId: '2005-board' },
    ],
  },
  {
    candidateId: 'cnd-beesley',
    name: 'Angela Beesley',
    username: 'Angela',
    countryCode: 'GB',
    terms: [
      { start: '2004-09-01', end: '2007-09-01', type: 'community-elected', electionId: '2004-board' },
      { start: '2005-11-01', end: '2008-11-01', type: 'community-elected', electionId: '2005-board' },
    ],
  },
];
