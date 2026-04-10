import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  ListMusic, 
  Users, 
  User, 
  ChevronRight, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Play, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  Lock,
  Plus,
  Filter,
  X,
  ThumbsUp,
  AlertCircle,
  Sparkles,
  Music,
  Disc
} from 'lucide-react';
import { 
  MOCK_ARTISTS, 
  MOCK_ALBUMS, 
  MOCK_TRACKS, 
  MOCK_USERS, 
  MOCK_REVIEWS 
} from './constants';
import { Artist, Album, Track, Review, PlanType } from './types';

// --- UI Components ---

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'premium' | 'success' | 'warning', key?: string | number }) => {
  const styles = {
    default: 'bg-white/10 text-gray-300',
    premium: 'premium-gradient text-white',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
};

const Card = ({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void, key?: string | number }) => (
  <motion.div 
    whileHover={onClick ? { y: -4, backgroundColor: 'rgba(255,255,255,0.03)' } : {}}
    onClick={onClick}
    className={`glass-card p-4 transition-all ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

const ScoreGauge = ({ score, label, color = 'primary' }: { score: number, label: string, color?: 'primary' | 'secondary' | 'coral' }) => {
  const colors = {
    primary: 'text-brand-primary',
    secondary: 'text-brand-secondary',
    coral: 'text-orange-400'
  };
  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-display font-bold ${colors[color]}`}>{score}</div>
      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{label}</div>
    </div>
  );
};

// --- Views ---

const HomeView = ({ onNavigate }: { onNavigate: (view: string, id?: string) => void }) => (
  <div className="space-y-10 pb-20">
    <section className="relative h-[400px] flex flex-col justify-center items-center text-center px-6 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-bg-main z-0" />
      <div className="relative z-10 max-w-2xl space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          Découvrez par où <span className="text-gradient">commencer.</span>
        </motion.h1>
        <p className="text-gray-400 text-lg">
          L'application qui transforme les avis musicaux en jugements utiles, lisibles et actionnables.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('explore')}
            className="px-8 py-3 premium-gradient rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
          >
            Explorer les artistes <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <div className="flex justify-between items-end">
        <h2 className="text-2xl">Par où commencer</h2>
        <button className="text-brand-primary text-sm font-bold flex items-center gap-1">Voir tout <ChevronRight size={16}/></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MOCK_ARTISTS.map(artist => (
          <Card key={artist.id} onClick={() => onNavigate('artist', artist.id)} className="flex gap-4 items-center">
            <img src={artist.cover_image_url} alt={artist.name} className="w-20 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg">{artist.name}</h3>
                <Badge variant="premium">Guide IA</Badge>
              </div>
              <p className="text-sm text-gray-400 line-clamp-1 mt-1">{artist.entry_level_advice}</p>
              <div className="flex gap-4 mt-2">
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Consensus: {artist.consensus_score}%</div>
                <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Avis: {artist.review_count}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-2xl">Tendances par genre</h2>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {['Pop', 'Rock', 'Indie', 'Hip-hop', 'Cloud Rap', 'Electro'].map(genre => (
          <button key={genre} className="px-6 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors whitespace-nowrap text-sm font-medium">
            {genre}
          </button>
        ))}
      </div>
    </section>
  </div>
);

const DNAIndicator = ({ label, value }: { label: string, value: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-gray-500">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full premium-gradient"
      />
    </div>
  </div>
);

const ArtistView = ({ artistId, onNavigate }: { artistId: string, onNavigate: (view: string, id?: string) => void }) => {
  const artist = MOCK_ARTISTS.find(a => a.id === artistId);
  const albums = MOCK_ALBUMS.filter(al => al.artist_id === artistId);
  
  if (!artist) return <div>Artiste non trouvé</div>;

  return (
    <div className="space-y-8 pb-20">
      {/* Header Premium */}
      <div className="relative h-[400px] rounded-3xl overflow-hidden group">
        <img src={artist.hero_image_url} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {artist.genres.map(g => <Badge key={g} variant="premium">{g}</Badge>)}
              <Badge variant="success">Actif</Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">{artist.name}</h1>
            <p className="text-gray-300 text-lg max-w-xl line-clamp-2 font-light">
              {artist.short_bio}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-8 py-3 premium-gradient rounded-full font-bold shadow-xl shadow-brand-primary/20 hover:scale-105 transition-transform">
              Suivre l'artiste
            </button>
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors">
              <Plus size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Colonne Gauche: Dashboard & Bio */}
        <div className="lg:col-span-8 space-y-8">
          {/* Section "Par où commencer" - Version Enrichie */}
          <section className="glass-card p-8 bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sparkles size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-brand-primary mb-6">
                <div className="p-2 bg-brand-primary/20 rounded-lg">
                  <TrendingUp size={24} />
                </div>
                <h2 className="text-2xl font-display">Par où commencer ?</h2>
              </div>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed font-light italic">
                "{artist.entry_level_advice}"
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card onClick={() => onNavigate('album', albums[0]?.id)} className="bg-white/5 hover:bg-white/10 border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-3">Album de référence</div>
                  <div className="flex items-center gap-4">
                    <img src={albums[0]?.cover_url} className="w-16 h-16 rounded-xl shadow-lg" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold text-lg">{albums[0]?.title}</div>
                      <div className="text-xs text-brand-primary font-bold">Porte d'entrée idéale</div>
                    </div>
                  </div>
                </Card>
                <Card onClick={() => onNavigate('track', 't1')} className="bg-white/5 hover:bg-white/10 border-white/10">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-3">Morceau signature</div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-secondary/20 rounded-xl flex items-center justify-center text-brand-secondary shadow-lg">
                      <Play fill="currentColor" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-lg">Lisztomania</div>
                      <div className="text-xs text-brand-secondary font-bold">100% représentatif</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* Discographie Structurée */}
          <section className="space-y-6">
            <div className="flex justify-between items-end">
              <h2 className="text-3xl font-display">Discographie sélectionnée</h2>
              <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors">Tout voir ({artist.key_stats.total_albums})</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {albums.map(album => (
                <Card key={album.id} onClick={() => onNavigate('album', album.id)} className="flex gap-5 items-center p-5">
                  <div className="relative">
                    <img src={album.cover_url} className="w-20 h-20 rounded-xl object-cover shadow-2xl" referrerPolicy="no-referrer" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-bg-surface border border-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-brand-primary">
                      {album.critic_score}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-lg">{album.title}</h3>
                    <p className="text-xs text-gray-500">{new Date(album.release_date).getFullYear()} • {album.genres[0]}</p>
                    <div className="flex gap-4 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-600 uppercase font-bold">Public</span>
                        <span className="text-sm font-bold text-brand-secondary">{album.community_score}%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-600 uppercase font-bold">Polarité</span>
                        <span className="text-sm font-bold text-orange-400">Faible</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-700" />
                </Card>
              ))}
            </div>
          </section>

          {/* Bio Longue */}
          <section className="glass-card p-8 space-y-4">
            <h2 className="text-2xl font-display">L'univers artistique</h2>
            <p className="text-gray-400 leading-relaxed text-lg font-light">
              {artist.long_bio}
            </p>
          </section>
        </div>

        {/* Colonne Droite: DNA & Stats */}
        <div className="lg:col-span-4 space-y-8">
          {/* Dashboard DNA */}
          <section className="glass-card p-6 space-y-8 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">ADN Musical</h3>
              <Badge variant="premium">Analyse IA</Badge>
            </div>
            
            <div className="space-y-6">
              <DNAIndicator label="Mélodie" value={artist.musical_dna.melody} />
              <DNAIndicator label="Énergie" value={artist.musical_dna.energy} />
              <DNAIndicator label="Textes" value={artist.musical_dna.lyrics} />
              <DNAIndicator label="Innovation" value={artist.musical_dna.innovation} />
              <DNAIndicator label="Accessibilité" value={artist.musical_dna.accessibility} />
            </div>

            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-6">
              <ScoreGauge score={artist.consensus_score} label="Consensus" />
              <ScoreGauge score={artist.polarization_score} label="Polarisation" color="coral" />
            </div>
          </section>

          {/* Stats Clés */}
          <section className="glass-card p-6 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Chiffres & Signaux</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <span className="text-sm text-gray-400">Carrière</span>
                <span className="font-bold text-brand-secondary">{artist.key_stats.career_years}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <span className="text-sm text-gray-400">Influence majeure</span>
                <span className="font-bold text-brand-primary">{artist.key_stats.main_influence}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                <span className="text-sm text-gray-400">Avis certifiés</span>
                <span className="font-bold">{artist.review_count}</span>
              </div>
            </div>
          </section>

          {/* Artistes Similaires Contextualisés */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Pour approfondir</h3>
            <div className="space-y-3">
              {[
                { name: 'Metronomy', reason: 'Pour la pop synthétique' },
                { name: 'Daft Punk', reason: 'Pour l\'héritage French Touch' },
                { name: 'Air', reason: 'Pour les textures planantes' }
              ].map(item => (
                <div key={item.name} className="group p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold group-hover:text-brand-primary transition-colors">{item.name}</span>
                    <ArrowRight size={14} className="text-gray-600 group-hover:text-brand-primary" />
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{item.reason}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const TrackView = ({ trackId, onNavigate }: { trackId: string, onNavigate: (view: string, id?: string) => void }) => {
  const track = MOCK_TRACKS.find(t => t.id === trackId);
  const album = MOCK_ALBUMS.find(al => al.id === track?.album_id);
  const artist = MOCK_ARTISTS.find(a => a.id === track?.artist_id);

  if (!track || !album || !artist) return <div>Morceau non trouvé</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
        <div className="relative group">
          <img src={album.cover_url} className="w-48 h-48 rounded-2xl shadow-xl" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center"><Play fill="white" size={20}/></div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {track.is_best_entry && <Badge variant="premium">Meilleure entrée</Badge>}
            {track.is_single && <Badge>Single</Badge>}
          </div>
          <h1 className="text-4xl font-bold">{track.title}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-lg">
            <button onClick={() => onNavigate('artist', artist.id)} className="text-brand-primary hover:underline">{artist.name}</button>
            <span className="text-gray-600">•</span>
            <button onClick={() => onNavigate('album', album.id)} className="text-gray-400 hover:underline">{album.title}</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-brand-primary/5 border-brand-primary/20 space-y-4">
          <div className="flex items-center gap-2 text-brand-primary">
            <Sparkles size={18} />
            <h3 className="font-bold">Pourquoi l'écouter ?</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            C'est le morceau qui définit le son de l'album. Si vous aimez les mélodies solaires et les productions léchées, c'est votre porte d'entrée.
          </p>
        </Card>
        <Card className="bg-brand-secondary/5 border-brand-secondary/20 space-y-4">
          <div className="flex items-center gap-2 text-brand-secondary">
            <AlertCircle size={18} />
            <h3 className="font-bold">Ce qui peut rebuter</h3>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed">
            Le côté très "pop" assumé pourrait déplaire aux amateurs de rock plus rugueux ou expérimental.
          </p>
        </Card>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Signaux rapides</h2>
        <div className="grid grid-cols-3 gap-4">
          <ScoreGauge score={92} label="Accessibilité" />
          <ScoreGauge score={85} label="Énergie" color="secondary" />
          <ScoreGauge score={10} label="Polarisation" color="coral" />
        </div>
      </section>

      <div className="flex justify-center pt-8">
        <button onClick={() => onNavigate('album', album.id)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10 flex items-center gap-2">
          Voir l'album complet <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
const ReviewCard = ({ review }: { review: Review }) => (
  <Card className="space-y-6 p-8 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
    
    <div className="flex justify-between items-start relative z-10">
      <div className="flex items-center gap-4">
        <img src={MOCK_USERS[0].avatar_url} className="w-12 h-12 rounded-full border-2 border-brand-primary/20" referrerPolicy="no-referrer" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{MOCK_USERS[0].display_name}</span>
            <Badge variant="success">Qualifié</Badge>
          </div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
            Auditeur de longue date • Crédibilité: {MOCK_USERS[0].credibility_level}%
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-3xl font-display font-bold text-brand-primary">{review.rating_overall}/10</div>
        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Note globale</div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-brand-primary uppercase font-bold tracking-widest">
            <Music size={12} /> Ce que j'entends
          </div>
          <p className="text-gray-300 leading-relaxed text-sm italic">"{review.what_i_hear}"</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-brand-secondary uppercase font-bold tracking-widest">
            <Sparkles size={12} /> Ce que ça me fait
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">"{review.what_it_makes_me_feel}"</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-green-400 uppercase font-bold tracking-widest">
            <ThumbsUp size={12} /> Pourquoi ça fonctionne
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">{review.why_it_works}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] text-orange-400 uppercase font-bold tracking-widest">
            <AlertCircle size={12} /> La limite ou réserve
          </div>
          <p className="text-gray-300 leading-relaxed text-sm">{review.limit_or_reserve}</p>
        </div>
      </div>
    </div>

    <div className="pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
      <div className="flex gap-4">
        <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-primary transition-colors">
          <ThumbsUp size={14} /> Utile ({review.helpful_count})
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors">
          <MessageSquare size={14} /> Commenter
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-gray-600 uppercase font-bold">Score Qualité</span>
        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-green-500" style={{ width: `${review.quality_score}%` }} />
        </div>
      </div>
    </div>
  </Card>
);

const AlbumView = ({ albumId, onNavigate }: { albumId: string, onNavigate: (view: string, id?: string) => void }) => {
  const album = MOCK_ALBUMS.find(al => al.id === albumId);
  const artist = MOCK_ARTISTS.find(a => a.id === album?.artist_id);
  const reviews = MOCK_REVIEWS.filter(r => r.target_id === albumId);

  if (!album || !artist) return <div>Album non trouvé</div>;

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative group shrink-0">
          <img src={album.cover_url} alt={album.title} className="w-64 h-64 rounded-2xl shadow-2xl shadow-black/50 group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
            <Play fill="white" size={48} />
          </div>
        </div>
        <div className="flex-1 space-y-4 pt-4">
          <div className="flex flex-wrap gap-2">
            {album.is_entry_album && <Badge variant="premium">Porte d'entrée</Badge>}
            {album.genres.map(g => <Badge key={g}>{g}</Badge>)}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{album.title}</h1>
          <button onClick={() => onNavigate('artist', artist.id)} className="text-2xl text-brand-primary hover:underline flex items-center gap-2 font-light">
            {artist.name} <ChevronRight size={24} />
          </button>
          <p className="text-gray-400 text-xl leading-relaxed max-w-3xl font-light">
            {album.short_description}
          </p>
          <div className="flex gap-12 pt-6">
            <ScoreGauge score={album.critic_score} label="Critique Pro" />
            <ScoreGauge score={album.community_score} label="Communauté" color="secondary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-display">Avis de la communauté</h2>
              <button onClick={() => onNavigate('write-review')} className="flex items-center gap-2 text-sm font-bold premium-gradient px-6 py-2.5 rounded-full shadow-lg shadow-brand-primary/20 hover:scale-105 transition-transform">
                <Plus size={18} /> Rédiger un avis
              </button>
            </div>
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="p-20 text-center glass-card border-dashed border-white/10">
                <MessageSquare className="mx-auto text-gray-700 mb-4" size={48} />
                <p className="text-gray-500 text-lg">Soyez le premier à structurer un avis sur cet album.</p>
              </div>
            )}
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="glass-card p-8 bg-gradient-to-br from-brand-secondary/10 to-transparent border-brand-secondary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Sparkles size={100} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand-secondary mb-6">
                <Sparkles size={24} />
                <h2 className="text-2xl font-display">Résumé IA</h2>
              </div>
              <p className="text-gray-300 leading-relaxed mb-8 text-lg font-light">
                L'album est largement salué pour sa production innovante et son accessibilité immédiate, marquant un tournant dans la carrière du groupe.
              </p>
              <div className="space-y-4">
                <div className="flex gap-3 items-start p-3 bg-white/5 rounded-xl">
                  <div className="mt-1 p-1 bg-green-500/20 text-green-400 rounded-full"><ThumbsUp size={14}/></div>
                  <div className="text-sm text-gray-300">Mélodies accrocheuses et production léchée.</div>
                </div>
                <div className="flex gap-3 items-start p-3 bg-white/5 rounded-xl">
                  <div className="mt-1 p-1 bg-orange-500/20 text-orange-400 rounded-full"><AlertCircle size={14}/></div>
                  <div className="text-sm text-gray-300">Certains morceaux peuvent sembler répétitifs.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-gray-500 font-bold">Critiques Professionnelles</h3>
            <div className="space-y-4">
              {[
                { source: 'Pitchfork', score: '8.5', excerpt: 'Un chef-d\'œuvre de pop moderne.', url: '#' },
                { source: 'Les Inrocks', score: '4/5', excerpt: 'Le groupe au sommet de son art.', url: '#' },
                { source: 'Rolling Stone', score: '4.5/5', excerpt: 'Indispensable et solaire.', url: '#' }
              ].map(pro => (
                <a key={pro.source} href={pro.url} className="block p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold group-hover:text-brand-primary transition-colors">{pro.source}</span>
                      <ExternalLink size={12} className="text-gray-600" />
                    </div>
                    <span className="font-bold text-brand-primary text-lg">{pro.score}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">"{pro.excerpt}"</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const WriteReviewView = ({ onCancel }: { onCancel: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    rating: 5,
    what_i_hear: '',
    what_it_makes_me_feel: '',
    why_it_works: '',
    who_its_for: '',
    limit: ''
  });

  const steps = [
    { title: 'Note globale', field: 'rating' },
    { title: 'Ce que j\'entends', field: 'what_i_hear', desc: 'Décrivez la production, les instruments, la voix...' },
    { title: 'Ce que ça me fait', field: 'what_it_makes_me_feel', desc: 'Quelles émotions, quelles images cela évoque ?' },
    { title: 'Pourquoi ça fonctionne', field: 'why_it_works', desc: 'L\'aspect technique ou artistique qui fait mouche.' },
    { title: 'Pour qui c\'est', field: 'who_its_for', desc: 'À quel type d\'auditeur recommandez-vous ceci ?' },
    { title: 'La limite ou réserve', field: 'limit', desc: 'Un point faible, une déception mineure ?' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Rédiger un avis structuré</h1>
        <button onClick={onCancel} className="p-2 hover:bg-white/10 rounded-full"><X size={24}/></button>
      </div>

      <div className="flex gap-2">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full ${i + 1 <= step ? 'premium-gradient' : 'bg-white/10'}`} />
        ))}
      </div>

      <Card className="p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">{steps[step-1].title}</h2>
          {steps[step-1].desc && <p className="text-sm text-gray-500">{steps[step-1].desc}</p>}
        </div>

        {step === 1 ? (
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="text-6xl font-display font-bold text-brand-primary">{formData.rating}/10</div>
            <input 
              type="range" min="1" max="10" 
              value={formData.rating} 
              onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
              className="w-full accent-brand-primary"
            />
          </div>
        ) : (
          <textarea 
            className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-brand-primary transition-colors resize-none"
            placeholder="Écrivez ici..."
            value={(formData as any)[steps[step-1].field]}
            onChange={(e) => setFormData({...formData, [steps[step-1].field]: e.target.value})}
          />
        )}

        <div className="flex justify-between pt-4">
          <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 rounded-full font-bold disabled:opacity-30"
          >
            Précédent
          </button>
          <button 
            onClick={() => step === steps.length ? onCancel() : setStep(step + 1)}
            className="px-8 py-2 premium-gradient rounded-full font-bold"
          >
            {step === steps.length ? 'Publier l\'avis' : 'Suivant'}
          </button>
        </div>
      </Card>

      <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl flex gap-3 items-start">
        <ShieldCheck className="text-brand-primary shrink-0" size={20} />
        <p className="text-xs text-gray-400 leading-relaxed">
          Votre avis sera analysé pour garantir un haut niveau de qualité communautaire. Les avis constructifs augmentent votre score de crédibilité.
        </p>
      </div>
    </div>
  );
};

const ProfileView = ({ user, onNavigate }: { user: any, onNavigate: (v: string) => void }) => (
  <div className="space-y-10 pb-20">
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
      <img src={user.avatar_url} className="w-32 h-32 rounded-full border-4 border-brand-primary/20" referrerPolicy="no-referrer" />
      <div className="flex-1 text-center md:text-left space-y-2">
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          <Badge variant="premium">Profil Qualifié</Badge>
          <Badge>Mélomane</Badge>
        </div>
        <h1 className="text-4xl font-bold">{user.display_name}</h1>
        <p className="text-gray-400">@{user.username}</p>
        <p className="text-gray-300 max-w-md">{user.bio_short}</p>
      </div>
      <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full font-bold hover:bg-white/10">Modifier le profil</button>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: 'Avis publiés', value: '24' },
        { label: 'Crédibilité', value: '85%' },
        { label: 'Abonnés', value: '1.2k' },
        { label: 'Listes', value: '8' }
      ].map(stat => (
        <Card key={stat.label} className="text-center">
          <div className="text-2xl font-display font-bold text-brand-primary">{stat.value}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</div>
        </Card>
      ))}
    </div>

    <section className="space-y-6">
      <h2 className="text-2xl">Derniers avis</h2>
      <div className="space-y-4">
        {MOCK_REVIEWS.map(review => (
          <Card key={review.id} className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-brand-primary/20 rounded flex items-center justify-center text-brand-primary font-bold">
              {review.rating_overall}
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Wolfgang Amadeus Phoenix</h3>
              <p className="text-xs text-gray-500">Publié il y a 2 jours</p>
            </div>
            <ChevronRight size={18} className="text-gray-600" />
          </Card>
        ))}
      </div>
    </section>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [viewParams, setViewParams] = useState<string | undefined>(undefined);
  const [isPremium, setIsPremium] = useState(false);

  const navigate = (view: string, id?: string) => {
    setCurrentView(view);
    setViewParams(id);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigate={navigate} />;
      case 'artist': return <ArtistView artistId={viewParams || 'a1'} onNavigate={navigate} />;
      case 'album': return <AlbumView albumId={viewParams || 'al1'} onNavigate={navigate} />;
      case 'track': return <TrackView trackId={viewParams || 't1'} onNavigate={navigate} />;
      case 'profile': return <ProfileView user={MOCK_USERS[0]} onNavigate={navigate} />;
      case 'write-review': return <WriteReviewView onCancel={() => navigate('home')} />;
      case 'lists': return (
        <div className="space-y-8">
          <div className="flex justify-between items-end">
            <h1 className="text-3xl font-bold">Listes partagées</h1>
            <button className="px-6 py-2 premium-gradient rounded-full font-bold flex items-center gap-2">
              <Plus size={18} /> Créer une liste
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Les pépites de la French Touch', items: 12, author: 'Julien B.', type: 'Découverte' },
              { title: 'Cloud Rap : Les essentiels', items: 8, author: 'Claire M.', type: 'Curated' },
              { title: 'Rock Indé 2024', items: 15, author: 'Sillage IA', type: 'IA' }
            ].map(list => (
              <Card key={list.title} className="group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-brand-primary">
                    <ListMusic size={24} />
                  </div>
                  <Badge variant={list.type === 'IA' ? 'premium' : 'default'}>{list.type}</Badge>
                </div>
                <h3 className="text-xl font-bold group-hover:text-brand-primary transition-colors">{list.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Par {list.author} • {list.items} éléments</p>
                <div className="flex gap-2 mt-4">
                  <div className="w-8 h-8 rounded bg-white/5" />
                  <div className="w-8 h-8 rounded bg-white/5" />
                  <div className="w-8 h-8 rounded bg-white/5" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      );
      case 'community': return (
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Communauté</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_USERS.map(user => (
              <Card key={user.id} onClick={() => navigate('profile')} className="flex items-center gap-4">
                <img src={user.avatar_url} className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h3 className="font-bold">{user.display_name}</h3>
                  <p className="text-xs text-gray-500">@{user.username}</p>
                </div>
                <button className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10">Suivre</button>
              </Card>
            ))}
          </div>
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Contributeurs mis en avant</h2>
            <div className="p-8 glass-card bg-brand-primary/5 border-brand-primary/20 text-center space-y-4">
              <ShieldCheck className="mx-auto text-brand-primary" size={40} />
              <h3 className="text-lg font-bold">Devenez un contributeur qualifié</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                Publiez des avis structurés et utiles pour augmenter votre score de crédibilité et débloquer des badges exclusifs.
              </p>
              <button onClick={() => navigate('write-review')} className="px-6 py-2 premium-gradient rounded-full font-bold">Rédiger mon premier avis</button>
            </div>
          </section>
        </div>
      );
      default: return <HomeView onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 bg-bg-surface border-r border-white/5 p-6 fixed h-full z-50">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <TrendingUp className="text-white" size={24} />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight">Sillage</span>
        </div>
        
        <div className="space-y-2 flex-1">
          {[
            { id: 'home', label: 'Accueil', icon: Home },
            { id: 'explore', label: 'Explorer', icon: Search },
            { id: 'lists', label: 'Listes', icon: ListMusic },
            { id: 'community', label: 'Communauté', icon: Users },
            { id: 'profile', label: 'Profil', icon: User },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${currentView === item.id ? 'bg-brand-primary/10 text-brand-primary font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </div>

        {!isPremium && (
          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-white/10">
            <div className="flex items-center gap-2 text-brand-primary mb-2">
              <Lock size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Premium</span>
            </div>
            <p className="text-xs text-gray-300 mb-4">Accédez aux avis complets et aux filtres avancés.</p>
            <button 
              onClick={() => setIsPremium(true)}
              className="w-full py-2 premium-gradient rounded-lg text-xs font-bold shadow-lg shadow-brand-primary/20"
            >
              Passer au payant
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-bg-surface/80 backdrop-blur-xl border-t border-white/5 z-50 px-6 py-3 flex justify-between items-center">
        {[
          { id: 'home', icon: Home },
          { id: 'explore', icon: Search },
          { id: 'write-review', icon: Plus, special: true },
          { id: 'community', icon: Users },
          { id: 'profile', icon: User },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`p-2 rounded-xl ${item.special ? 'premium-gradient text-white shadow-lg shadow-brand-primary/20' : currentView === item.id ? 'text-brand-primary' : 'text-gray-500'}`}
          >
            <item.icon size={24} />
          </button>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <header className="md:hidden flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={18} />
            </div>
            <span className="text-xl font-display font-bold">Sillage</span>
          </div>
          <button onClick={() => navigate('profile')} className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
            <img src={MOCK_USERS[0].avatar_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </button>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (viewParams || '')}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
