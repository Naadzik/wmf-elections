import type { Candidate } from '../types';

export const candidates: Candidate[] = [

  // ── Winners ──

  {
    id: 'cnd-devouard',
    name: 'Florence Devouard',
    username: 'Anthere',
    countryCode: 'FR',
    region: 'Western Europe',
    elections: [
      { electionId: '2004-board', type: 'community', elected: true },
      { electionId: '2005-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-beesley',
    name: 'Angela Beesley',
    username: 'Angela',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2004-board', type: 'community', elected: true },
      { electionId: '2005-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-moller',
    name: 'Erik Möller',
    username: 'Erik Moeller',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
      { electionId: '2006-board', type: 'community', elected: true },
      { electionId: '2007-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-brioschi',
    name: 'Frieda Brioschi',
    username: 'Frieda',
    countryCode: 'IT',
    region: 'Western Europe',
    elections: [
      { electionId: '2007-board', type: 'community', elected: true },
      { electionId: '2014-affiliate', type: 'affiliate', elected: true },
    ],
  },

  {
    id: 'cnd-walsh',
    name: 'Kat Walsh',
    username: 'Mindspillage',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
      { electionId: '2007-board', type: 'community', elected: true },
      { electionId: '2009-board', type: 'community', elected: true },
      { electionId: '2011-board', type: 'community', elected: true },
      { electionId: '2013-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-tchen',
    name: 'Ting Chen',
    username: 'Wing',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2008-community', type: 'community', elected: true },
      { electionId: '2009-board', type: 'community', elected: true },
      { electionId: '2011-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-klempert',
    name: 'Arne Klempert',
    username: 'Arne Klempert',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2008-affiliate', type: 'affiliate', elected: true },
      { electionId: '2010-affiliate', type: 'affiliate', elected: true },
    ],
  },

  {
    id: 'cnd-snow',
    name: 'Michael Snow',
    username: 'Michael Snow',
    countryCode: 'CA',
    region: 'North America',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
      { electionId: '2007-board', type: 'community', elected: false },
      { electionId: '2008-affiliate', type: 'affiliate', elected: true },
    ],
  },

  {
    id: 'cnd-klein',
    name: 'Samuel Klein',
    username: 'SJ',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2005-board', type: 'community', elected: false },
      { electionId: '2008-community', type: 'community', elected: false },
      { electionId: '2009-board', type: 'community', elected: true },
      { electionId: '2011-board', type: 'community', elected: true },
      { electionId: '2013-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-ayers',
    name: 'Phoebe Ayers',
    username: 'Phoebe',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2010-affiliate', type: 'affiliate', elected: true },
      { electionId: '2012-affiliate', type: 'affiliate', elected: false },
      { electionId: '2013-board', type: 'community', elected: true },
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-wiegand',
    name: 'Alice Wiegand',
    username: 'Lyzzy',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2012-affiliate', type: 'affiliate', elected: true },
      { electionId: '2014-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-lorente',
    name: 'Patricio Lorente',
    username: 'Patricio.lorente',
    countryCode: 'AR',
    region: 'Latin America',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
      { electionId: '2012-affiliate', type: 'affiliate', elected: true },
      { electionId: '2014-affiliate', type: 'affiliate', elected: true },
    ],
  },

  {
    id: 'cnd-sefidari',
    name: 'María Sefidari',
    username: 'Raystorm',
    countryCode: 'ES',
    region: 'Western Europe',
    elections: [
      { electionId: '2013-board', type: 'community', elected: true },
      { electionId: '2015-board', type: 'community', elected: false },
      { electionId: '2017-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-vrandecic',
    name: 'Denny Vrandečić',
    username: 'Denny',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2015-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-heilman',
    name: 'James Heilman',
    username: 'Doc James',
    countryCode: 'CA',
    region: 'North America',
    elections: [
      { electionId: '2015-board', type: 'community', elected: true },
      { electionId: '2017-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-jemielniak',
    name: 'Dariusz Jemielniak',
    username: 'Pundit',
    countryCode: 'PL',
    region: 'Central Europe',
    elections: [
      { electionId: '2015-board', type: 'community', elected: true },
      { electionId: '2017-board', type: 'community', elected: true },
      { electionId: '2021-board', type: 'community', elected: true },
    ],
  },

  {
    id: 'cnd-henner',
    name: 'Christophe Henner',
    username: 'ChristopheHenner',
    countryCode: 'FR',
    region: 'Western Europe',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: true },
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-tymkiv',
    name: 'Nataliia Tymkiv',
    username: 'NataliaTymkiv',
    countryCode: 'UA',
    region: 'Eastern Europe',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: true },
      { electionId: '2019-affiliate', type: 'affiliate', elected: true },
    ],
  },

  {
    id: 'cnd-evenstein',
    name: 'Shani Evenstein Sigalov',
    username: 'ShaniEvensteinSigalov',
    countryCode: 'IL',
    region: 'Middle East',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: true },
      { electionId: '2022-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-stephenson',
    name: 'Rosie Stephenson-Goodknight',
    username: 'Rosiestep',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2021-board', type: 'community', elected: true },
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-doronina',
    name: 'Victoria Doronina',
    username: 'Victoria',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2021-board', type: 'community', elected: true },
      { electionId: '2024-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-losa',
    name: 'Lorenzo Losa',
    username: 'Laurentius',
    countryCode: 'IT',
    region: 'Western Europe',
    elections: [
      { electionId: '2021-board', type: 'community', elected: true },
      { electionId: '2024-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-peel',
    name: 'Mike Peel',
    username: 'Mike Peel',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
      { electionId: '2022-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-steigenberger',
    name: 'Christel Steigenberger',
    username: 'Kritzolina',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-nadzik',
    name: 'Maciej Nadzikiewicz',
    username: 'Nadzik',
    countryCode: 'PL',
    region: 'Central Europe',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-buczynski',
    name: 'Michał Buczyński',
    username: 'Aegis Maelstrom',
    countryCode: 'PL',
    region: 'Central Europe',
    elections: [
      { electionId: '2022-board', type: 'mixed', elected: false },
      { electionId: '2025-board', type: 'mixed', elected: true },
    ],
  },

  {
    id: 'cnd-shabangu',
    name: 'Bobby Shabangu',
    username: 'Bobbyshabangu',
    countryCode: 'ZA',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: false },
      { electionId: '2025-board', type: 'mixed', elected: true },
    ],
  },

  // ── Non-winners ──

  // 2013 era

  {
    id: 'cnd-kaguna',
    name: 'Francis Kaswahili Kaguna',
    username: 'Francis Kaswahili Kaguna',
    countryCode: 'TZ',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2013-board', type: 'community', elected: false },
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-thelmadatter',
    name: 'Leigh Ann Thelmadatter',
    username: 'Thelmadatter',
    countryCode: 'MX',
    region: 'Latin America',
    elections: [
      { electionId: '2013-board', type: 'community', elected: false },
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-chan',
    name: 'Jeromy-Yu Chan',
    username: 'Yuyu',
    countryCode: 'HK',
    region: 'East Asia',
    elections: [
      { electionId: '2013-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-aaij',
    name: 'Michel Aaij',
    username: 'Drmies',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2013-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-morton',
    name: 'Tom Morton',
    username: 'Errantx',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
      { electionId: '2013-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-wyatt',
    name: 'Liam Wyatt',
    username: 'Wittylama',
    countryCode: 'AU',
    region: 'Oceania',
    elections: [
      { electionId: '2012-affiliate', type: 'affiliate', elected: false },
      { electionId: '2013-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-vandenberg',
    name: 'John Vandenberg',
    username: 'John Vandenberg',
    countryCode: 'AU',
    region: 'Oceania',
    elections: [
      { electionId: '2013-board', type: 'community', elected: false },
    ],
  },

  // 2015 era

  {
    id: 'cnd-turki',
    name: 'Houcemeddine Turki',
    username: 'Csisc',
    countryCode: 'TN',
    region: 'North Africa',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-patnaik',
    name: 'Sailesh Patnaik',
    username: 'Saileshpat',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-ouda',
    name: 'Mohamed Ouda',
    username: 'Mohamed Ouda',
    countryCode: 'EG',
    region: 'Middle East & North Africa',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-lim',
    name: 'Josh Lim',
    username: 'Sky Harbor',
    countryCode: 'PH',
    region: 'Southeast Asia',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-conway',
    name: 'David Conway',
    username: 'Smerus',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-consonni',
    name: 'Cristian Consonni',
    username: 'Cristian Cantoro',
    countryCode: 'IT',
    region: 'Western Europe',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-khan',
    name: 'Ali Haidar Khan',
    username: 'Ali Haidar Khan',
    countryCode: 'BD',
    region: 'South Asia',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-syed',
    name: 'Nisar Ahmed Syed',
    username: 'Ahmad Nisar',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-gallert',
    name: 'Peter Gallert',
    username: 'Pgallert',
    countryCode: 'NA',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2015-board', type: 'community', elected: false },
      { electionId: '2017-board', type: 'community', elected: false },
    ],
  },

  // 2017 era

  {
    id: 'cnd-keating',
    name: 'Chris Keating',
    username: 'The Land',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2017-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-rancic',
    name: 'Miloš Rančić',
    username: 'Millosh',
    countryCode: 'RS',
    region: 'Southeastern Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
      { electionId: '2017-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-diraneyya',
    name: 'Abbad Diraneyya',
    username: 'Abbad',
    countryCode: 'JO',
    region: 'Middle East',
    elections: [
      { electionId: '2017-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-astrakhan',
    name: 'Yuri Astrakhan',
    username: 'Yurik',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2017-board', type: 'community', elected: false },
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-mbula',
    name: 'Abel Lifaefi Mbula',
    username: 'Bamlifa',
    countryCode: 'CD',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2017-board', type: 'community', elected: false },
    ],
  },

  // 2021 era

  {
    id: 'cnd-mustaklem',
    name: 'Farah Jack Mustaklem',
    username: 'FJMustak',
    countryCode: 'PS',
    region: 'Middle East',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
      { electionId: '2022-board', type: 'mixed', elected: false },
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-scheepmans',
    name: 'Lionel Scheepmans',
    username: 'Lionel Scheepmans',
    countryCode: 'BE',
    region: 'Western Europe',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-yao',
    name: 'Eliane Dominique Yao',
    username: 'Eliane Dominique Yao',
    countryCode: 'CI',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-siqueira',
    name: 'Vinicius Siqueira',
    username: 'Vinicius Siqueira',
    countryCode: 'BR',
    region: 'Latin America',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-wight',
    name: 'Adam Wight',
    username: 'Adamw',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-kerbouche',
    name: 'Reda Kerbouche',
    username: 'Reda kerbouche',
    countryCode: 'DZ',
    region: 'North Africa',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-mohanty',
    name: 'Raavi Mohanty',
    username: 'Raavimohanty',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-baindur',
    name: 'Ashwin Baindur',
    username: 'Wikimhijra',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-surampudi',
    name: 'Pavan Santhosh Surampudi',
    username: 'Pavan santhosh',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-ayyakkannu',
    name: 'Ravishankar Ayyakkannu',
    username: 'Ravishankar',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-meijssen',
    name: 'Gerard Meijssen',
    username: 'GerardM',
    countryCode: 'NL',
    region: 'Western Europe',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
      { electionId: '2011-board', type: 'community', elected: false },
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-scott',
    name: 'Douglas Ian Scott',
    username: 'Discott',
    countryCode: 'ZA',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-camuswalter',
    name: 'Pascale Camus-Walter',
    username: 'Pcastrewalter',
    countryCode: 'FR',
    region: 'Western Europe',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-martinez',
    name: 'Iván Martínez',
    username: 'Ivanhercaz',
    countryCode: 'MX',
    region: 'Latin America',
    elections: [
      { electionId: '2021-board', type: 'community', elected: false },
    ],
  },

  // 2022 era

  {
    id: 'cnd-mehta',
    name: 'Kunal Mehta',
    username: 'Legoktm',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-agbor',
    name: 'Egbe Eugene Agbor',
    username: 'EEAgbor',
    countryCode: 'NG',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-ndihokubwayo',
    name: 'Gilbert Ndihokubwayo',
    username: 'Ndihokubwayo',
    countryCode: 'BI',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-quarshie',
    name: 'Joris Darlington Quarshie',
    username: 'Darlington',
    countryCode: 'GH',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-friday',
    name: 'Tobechukwu Precious Friday',
    username: 'TochipreciousNG',
    countryCode: 'NG',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-bennett',
    name: 'Gina Bennett',
    username: 'Ginabennett',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2022-board', type: 'mixed', elected: false },
    ],
  },

  // 2024 era

  {
    id: 'cnd-steyn',
    name: 'Deon Steyn',
    username: 'Oesjaar',
    countryCode: 'ZA',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-hanberg',
    name: 'Erik Hanberg',
    username: 'Erikemery',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-alhassan',
    name: 'Mohammed Awal Alhassan',
    username: 'Alhassan Mohammed Awal',
    countryCode: 'GH',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-abdulkareem',
    name: 'Tesleemah Abdulkareem',
    username: 'Tesleemah',
    countryCode: 'NG',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-rasberry',
    name: 'Lane Rasberry',
    username: 'Bluerasberry',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2024-board', type: 'mixed', elected: false },
    ],
  },

  // 2025 era

  {
    id: 'cnd-jamesalexander',
    name: 'James Alexander',
    username: 'Jamesofur',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2025-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-pedzich',
    name: 'Wojciech Pędzich',
    username: 'Wojciech Pędzich',
    countryCode: 'PL',
    region: 'Central Europe',
    elections: [
      { electionId: '2025-board', type: 'mixed', elected: false },
    ],
  },

  {
    id: 'cnd-altaie',
    name: 'Ravan J Al-Taie',
    username: 'Ravan',
    countryCode: 'IQ',
    region: 'Middle East',
    elections: [],
  },

  // ── 2004–2006 era candidates ─────────────────────────────────────────────────

  {
    id: 'cnd-lagrange',
    name: 'Arno Lagrange',
    username: 'ArnoLagrange',
    countryCode: 'FR',
    region: 'Western Europe',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
      { electionId: '2005-board', type: 'community', elected: false },
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-heiskanen',
    name: 'Jussi-Ville Heiskanen',
    username: 'Cimon Avaro',
    countryCode: 'FI',
    region: 'Northern Europe',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
      { electionId: '2005-board', type: 'community', elected: false },
      { electionId: '2006-board', type: 'community', elected: false },
      { electionId: '2007-board', type: 'community', elected: false },
      { electionId: '2008-community', type: 'community', elected: false },
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-mahan',
    name: 'Christopher Mahan',
    username: 'Christopher Mahan',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-mayer',
    name: 'Daniel Mayer',
    username: 'maveric149',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-koll',
    name: 'Thomas Roland Koll',
    username: 'TomK32',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-shizhao',
    name: 'Shi Zhao',
    username: 'Shizhao',
    countryCode: 'CN',
    region: 'East Asia',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-nelson',
    name: 'Mark Nelson',
    username: 'Delirium',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2004-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-schonken',
    name: 'Francis Schonken',
    username: 'Francis Schonken',
    countryCode: 'BE',
    region: 'Western Europe',
    elections: [
      { electionId: '2005-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-swartz',
    name: 'Aaron Swartz',
    username: 'AaronSw',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-roshuk',
    name: 'Alex Roshuk',
    username: 'alex756',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-arnold',
    name: 'Daniel Arnold',
    username: 'Arnomane',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-matthews',
    name: 'Charles Matthews',
    username: 'Charles Matthews',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-andersen',
    name: 'Bruce Andersen',
    username: 'Evrik',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-gunn',
    name: 'Pat Gunn',
    username: 'Improv',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-kmartin',
    name: 'Kelly Martin',
    username: 'Kelly Martin',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-kbruning',
    name: 'Kim Bruning',
    username: 'Kim Bruning',
    countryCode: 'NL',
    region: 'Western Europe',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-schenck',
    name: 'Alex Schenck',
    username: 'Linuxbeak',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-oscar',
    name: 'Oscar van Dillen',
    username: 'Oscar',
    countryCode: 'NL',
    region: 'Western Europe',
    elections: [
      { electionId: '2006-board', type: 'community', elected: false },
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  // ── 2007 era candidates ──────────────────────────────────────────────────────

  {
    id: 'cnd-dembowski',
    name: 'Paweł Dembowski',
    username: 'Ausir',
    countryCode: 'PL',
    region: 'Central Europe',
    elections: [
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-wool',
    name: 'Danny Wool',
    username: 'Danny',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-safoutin',
    name: 'Jason Safoutin',
    username: 'DragonFire1024',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-tarnell',
    name: 'River Tarnell',
    username: 'Kate',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-kennedy',
    name: 'Stephen Kennedy',
    username: 'Kingboyk',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2007-board', type: 'community', elected: false },
    ],
  },

  // ── 2008 era candidates ──────────────────────────────────────────────────────

  {
    id: 'cnd-huikeshoven',
    name: 'Ad Huikeshoven',
    username: 'Dedalus',
    countryCode: 'NL',
    region: 'Western Europe',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-spurrier',
    name: 'Craig Spurrier',
    username: 'Cspurrier',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-rosenthal',
    name: 'Dan Rosenthal',
    username: 'Swatjester',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-harel',
    name: 'Harel Cain',
    username: 'Harel',
    countryCode: 'IL',
    region: 'Middle East',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-kohs',
    name: 'Gregory Kohs',
    username: 'Thekohser',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-weber',
    name: 'Kurt Weber',
    username: 'Kmweber',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-bisanz',
    name: 'Matthew Bisanz',
    username: 'MBisanz',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-williams',
    name: 'Paul Williams',
    username: 'Skenmy',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-saintonge',
    name: 'Ray Saintonge',
    username: 'Eclecticology',
    countryCode: 'CA',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-ssmith',
    name: 'Steve Smith',
    username: 'Sarcasticidealist',
    countryCode: 'CA',
    region: 'North America',
    elections: [
      { electionId: '2008-community', type: 'community', elected: false },
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  // ── 2009 era candidates ──────────────────────────────────────────────────────

  {
    id: 'cnd-koenigsberg',
    name: 'Adam Koenigsberg',
    username: 'CastAStone',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-stenberg',
    name: 'Beauford Stenberg',
    username: 'B9 hummingbird hovering',
    countryCode: 'AU',
    region: 'Oceania',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-brimdeforest',
    name: 'Brady Brim-DeForest',
    username: 'Bradybd',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-mituzas',
    name: 'Domas Mituzas',
    username: 'Midom',
    countryCode: 'LT',
    region: 'Eastern Europe',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-gongora',
    name: 'José Gustavo Góngora',
    username: 'Góngora',
    countryCode: 'ES',
    region: 'Western Europe',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-okeeffe',
    name: "Kevin O'Keeffe",
    username: 'KevinOKeeffe',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-pieterse',
    name: 'Lourie Pieterse',
    username: 'LouriePieterse',
    countryCode: 'ZA',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-potdevin',
    name: 'Ralph Potdevin',
    username: 'Aruspice',
    countryCode: 'FR',
    region: 'Western Europe',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-braun',
    name: 'Thomas Braun',
    username: 'Redlinux',
    countryCode: 'DE',
    region: 'Western Europe',
    elections: [
      { electionId: '2009-board', type: 'community', elected: false },
    ],
  },

  // ── 2011 era candidates ──────────────────────────────────────────────────────

  {
    id: 'cnd-gelauff',
    name: 'Lodewijk Gelauff',
    username: 'Effeietsanders',
    countryCode: 'NL',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
      { electionId: '2012-affiliate', type: 'affiliate', elected: false },
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-balaguer',
    name: 'Claudi Balaguer',
    username: 'Capsot',
    countryCode: 'FR',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-dubay',
    name: 'William DuBay',
    username: 'Bdubay',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-forrester',
    name: 'James Forrester',
    username: 'Jdforrester',
    countryCode: 'GB',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-goma',
    name: 'Joan Gomà',
    username: 'Gomà',
    countryCode: 'ES',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-pelletier',
    name: 'Marc-André Pelletier',
    username: 'Coren',
    countryCode: 'CA',
    region: 'North America',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-richardson',
    name: 'Jane Richardson',
    username: 'Dcrjsr',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-scala',
    name: 'Ferdinando Scala',
    username: 'Ferdinando Scala',
    countryCode: 'IT',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-vetere',
    name: 'Mischa Vetere',
    username: 'mvart4u',
    countryCode: 'CH',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-waefler',
    name: 'Urs Wäfler',
    username: 'Urs.Waefler',
    countryCode: 'CH',
    region: 'Western Europe',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  {
    id: 'cnd-zarate',
    name: 'Esteban Zárate',
    username: 'Ezarate',
    countryCode: 'AR',
    region: 'Latin America',
    elections: [
      { electionId: '2011-board', type: 'community', elected: false },
    ],
  },

  // ── 2012 affiliate candidates ────────────────────────────────────────────────

  {
    id: 'cnd-franklin',
    name: 'Craig Franklin',
    username: 'Lankiveil',
    countryCode: 'AU',
    region: 'Oceania',
    elections: [
      { electionId: '2012-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-haroon',
    name: 'Salmaan Haroon',
    username: 'Theo10011',
    countryCode: 'IN',
    region: 'South Asia',
    elections: [
      { electionId: '2012-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-gutierrez',
    name: 'Raúl Gutiérrez',
    username: 'Gumr51',
    countryCode: 'MX',
    region: 'Latin America',
    elections: [
      { electionId: '2012-affiliate', type: 'affiliate', elected: false },
    ],
  },

  // ── 2014 affiliate candidates ────────────────────────────────────────────────

  {
    id: 'cnd-wennersten',
    name: 'Anders Wennersten',
    username: 'Yger',
    countryCode: 'SE',
    region: 'Northern Europe',
    elections: [
      { electionId: '2014-affiliate', type: 'affiliate', elected: false },
    ],
  },

  // ── 2016 affiliate candidates ────────────────────────────────────────────────

  {
    id: 'cnd-ainali',
    name: 'Jan Ainali',
    username: 'Ainali',
    countryCode: 'SE',
    region: 'Northern Europe',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-doviana',
    name: 'Siska Doviana',
    username: 'Siska.Doviana',
    countryCode: 'ID',
    region: 'Southeast Asia',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-made',
    name: 'Maarten',
    username: 'MADe',
    countryCode: 'BE',
    region: 'Western Europe',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-mkrtchyan',
    name: 'Susanna Mkrtchyan',
    username: 'SusikMkr',
    countryCode: 'AM',
    region: 'Eastern Europe',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-valdebenito',
    name: 'Osmar Valdebenito',
    username: 'B1mbo',
    countryCode: 'CL',
    region: 'Latin America',
    elections: [
      { electionId: '2016-affiliate', type: 'affiliate', elected: false },
    ],
  },

  // ── 2019 affiliate candidates ────────────────────────────────────────────────

  {
    id: 'cnd-knipel',
    name: 'Richard Knipel',
    username: 'Pharos',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-limpanuparb',
    name: 'Taweetham Limpanuparb',
    username: 'taweetham',
    countryCode: 'TH',
    region: 'Southeast Asia',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-malul',
    name: 'Maor Malul',
    username: 'Maor X',
    countryCode: 'IL',
    region: 'Middle East',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-shields',
    name: 'Gerald Shields',
    username: 'Geraldshields11',
    countryCode: 'US',
    region: 'North America',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },

  {
    id: 'cnd-yussuf',
    name: 'Kayode Yussuf',
    username: 'Kayusyussuf',
    countryCode: 'NG',
    region: 'Sub-Saharan Africa',
    elections: [
      { electionId: '2019-affiliate', type: 'affiliate', elected: false },
    ],
  },
];
