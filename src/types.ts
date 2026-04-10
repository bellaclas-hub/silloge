/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserStatus = 'visiteur' | 'inscrit_non_confirme' | 'confirme' | 'qualifie' | 'suspendu';
export type PlanType = 'gratuit' | 'payant';

export interface User {
  id: string;
  username: string;
  display_name: string;
  bio_short: string;
  avatar_url: string;
  status: UserStatus;
  plan: PlanType;
  credibility_level: number;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  genres: string[];
  short_bio: string;
  long_bio: string;
  hero_image_url: string;
  cover_image_url: string;
  consensus_score: number;
  polarization_score: number;
  review_count: number;
  entry_level_advice: string;
  musical_dna: {
    melody: number;
    energy: number;
    lyrics: number;
    innovation: number;
    accessibility: number;
  };
  key_stats: {
    career_years: string;
    total_albums: number;
    main_influence: string;
  };
}

export interface Album {
  id: string;
  artist_id: string;
  title: string;
  slug: string;
  release_date: string;
  cover_url: string;
  genres: string[];
  critic_score: number;
  community_score: number;
  short_description: string;
  is_entry_album?: boolean;
}

export interface Track {
  id: string;
  album_id: string;
  artist_id: string;
  title: string;
  duration_seconds: number;
  is_single: boolean;
  is_best_entry?: boolean;
}

export interface Review {
  id: string;
  user_id: string;
  user_context?: string; // e.g. "Fan de la première heure"
  target_type: 'artist' | 'album' | 'track';
  target_id: string;
  rating_overall: number;
  what_i_hear: string;
  what_it_makes_me_feel: string;
  why_it_works: string;
  who_its_for: string;
  limit_or_reserve: string;
  quality_score: number;
  helpful_count: number;
  created_at: string;
  tags?: string[];
}

export interface AISummary {
  target_id: string;
  summary_text: string;
  key_points_positive: string[];
  key_points_negative: string[];
}
