import React from 'react';
import { Layout, Grid } from './UI';
import { discover, getPoster } from './util';

function App() {
  const [movies, setMovies] = React.useState<any[]>([]);
  const [background, setBackground] = React.useState<string>('');

  React.useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const params = {
      sort_by: 'popularity.desc',
      page: 1,
      language: 'en-US',
    };

    const request = await discover(params);
    setMovies(request.data.results);
  };

  const handleSetBackground = (el: any) => {
    setBackground(getPoster(el.backdrop_path, 'original'));
  };

  return (
    <Layout background={background}>
      <Grid movies={movies} hoverOver={handleSetBackground} />
    </Layout>
  );
}

export default App;
