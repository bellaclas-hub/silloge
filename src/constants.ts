import { Artist, Album, Track, User, Review } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'melomane_du_dimanche',
    display_name: 'Julien B.',
    bio_short: 'Passionné de synth-pop et de rock indé français.',
    avatar_url: 'https://picsum.photos/seed/user1/200/200',
    status: 'qualifie',
    plan: 'payant',
    credibility_level: 85
  },
  {
    id: 'u2',
    username: 'claire_vibe',
    display_name: 'Claire Martin',
    bio_short: 'À la recherche du prochain grand nom du hip-hop.',
    avatar_url: 'https://picsum.photos/seed/user2/200/200',
    status: 'confirme',
    plan: 'gratuit',
    credibility_level: 62
  }
];

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'a1',
    name: 'Phoenix',
    slug: 'phoenix',
    genres: ['Indie Rock', 'Pop'],
    short_bio: 'Le groupe versaillais qui a conquis le monde avec son indie-pop solaire.',
    long_bio: 'Formé à la fin des années 90, Phoenix est devenu le fer de lance de la French Touch 2.0. Leur mélange de mélodies accrocheuses et de production léchée en fait un incontournable.',
    hero_image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200',
    cover_image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400',
    consensus_score: 88,
    polarization_score: 15,
    review_count: 1240,
    entry_level_advice: 'Commencez par "Wolfgang Amadeus Phoenix" pour comprendre leur apogée créative.',
    musical_dna: {
      melody: 95,
      energy: 80,
      lyrics: 70,
      innovation: 75,
      accessibility: 90
    },
    key_stats: {
      career_years: '25 ans',
      total_albums: 7,
      main_influence: 'New Wave / French Touch'
    }
  },
  {
    id: 'a2',
    name: 'PNL',
    slug: 'pnl',
    genres: ['Hip-hop', 'Cloud Rap'],
    short_bio: 'Le duo des Tarterêts qui a révolutionné le rap français par son esthétique mélancolique.',
    long_bio: 'Ademo et N.O.S ont imposé un style unique, entre autotune planante et textes introspectifs, sans jamais accorder d\'interview.',
    hero_image_url: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=1200',
    cover_image_url: 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=400',
    consensus_score: 75,
    polarization_score: 45,
    review_count: 3500,
    entry_level_advice: 'L\'album "Dans la légende" est la porte d\'entrée parfaite vers leur univers.',
    musical_dna: {
      melody: 85,
      energy: 50,
      lyrics: 80,
      innovation: 95,
      accessibility: 65
    },
    key_stats: {
      career_years: '9 ans',
      total_albums: 4,
      main_influence: 'Cloud Rap / Melancholy'
    }
  }
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'al1',
    artist_id: 'a1',
    title: 'Wolfgang Amadeus Phoenix',
    slug: 'wolfgang-amadeus-phoenix',
    release_date: '2009-05-25',
    cover_url: 'https://picsum.photos/seed/phoenix-album/600/600',
    genres: ['Indie Pop', 'Synth-pop'],
    critic_score: 92,
    community_score: 89,
    short_description: 'L\'album de la consécration internationale, porté par des tubes comme Lisztomania.',
    is_entry_album: true
  },
  {
    id: 'al2',
    artist_id: 'a2',
    title: 'Dans la légende',
    slug: 'dans-la-legende',
    release_date: '2016-09-16',
    cover_url: 'https://picsum.photos/seed/pnl-album/600/600',
    genres: ['Cloud Rap'],
    critic_score: 85,
    community_score: 94,
    short_description: 'Un classique instantané du rap français moderne.',
    is_entry_album: true
  }
];

export const MOCK_TRACKS: Track[] = [
  { id: 't1', album_id: 'al1', artist_id: 'a1', title: 'Lisztomania', duration_seconds: 241, is_single: true, is_best_entry: true },
  { id: 't2', album_id: 'al1', artist_id: 'a1', title: '1901', duration_seconds: 197, is_single: true },
  { id: 't3', album_id: 'al2', artist_id: 'a2', title: 'DA', duration_seconds: 230, is_single: true, is_best_entry: true },
  { id: 't4', album_id: 'al2', artist_id: 'a2', title: 'Naha', duration_seconds: 285, is_single: true }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    user_id: 'u1',
    target_type: 'album',
    target_id: 'al1',
    rating_overall: 9,
    what_i_hear: 'Une production cristalline, des guitares bondissantes et des synthés qui rappellent les années 80 sans être nostalgiques.',
    what_it_makes_me_feel: 'Une énergie pure, une envie de rouler vitres baissées en plein été.',
    why_it_works: 'L\'équilibre parfait entre complexité musicale et efficacité pop.',
    who_its_for: 'Tous ceux qui aiment la pop intelligente et dansante.',
    limit_or_reserve: 'Peut-être un peu court, on en redemande.',
    quality_score: 92,
    helpful_count: 45,
    created_at: '2025-12-01T10:00:00Z'
  },
  {
    id: 'r2',
    user_id: 'u2',
    target_type: 'album',
    target_id: 'al2',
    rating_overall: 8,
    what_i_hear: 'Des nappes vaporeuses, un autotune maîtrisé comme un instrument à part entière et des basses profondes.',
    what_it_makes_me_feel: 'Une mélancolie urbaine, une sensation de planer au-dessus de la ville la nuit.',
    why_it_works: 'L\'immersion totale dans un univers sonore cohérent et novateur.',
    who_its_for: 'Les amateurs de rap atmosphérique et d\'expérimentations sonores.',
    limit_or_reserve: 'Certains morceaux sont un peu longs, mais l\'ambiance reste intacte.',
    quality_score: 88,
    helpful_count: 32,
    created_at: '2026-01-15T14:30:00Z'
  }
];
