export const BGM_TRACKS = Object.freeze([
  { file: 'cozy-morning.ogg', title: 'Easy Cozy Morning' },
  { file: 'bamboo-flute.ogg', title: 'Guzheng and Bamboo Flute' },
  { file: 'calm-acoustic.ogg', title: 'Relaxing Calm Acoustic' },
  { file: 'rally-forest.ogg', title: 'Cinematic Rally Forest' },
  { file: 'fun-music.ogg', title: 'Fun Music' },
]);

export function bgmTrackPath(index, baseUrl = '/') {
  const root = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const track = BGM_TRACKS[((index % BGM_TRACKS.length) + BGM_TRACKS.length) % BGM_TRACKS.length];
  return `${root}audio/bgm/${track.file}`;
}
