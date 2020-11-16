export const getPoster = (
  path: string,
  config: '200' | '500' | 'original' = 'original'
) => {
  const size = config === 'original' ? 'original' : `w${config}`;
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};
