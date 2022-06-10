import axios from 'axios';

// const PROXY = window.location.hostname === 'localhost' ? '' : 'proxy';

const getHero = async (heroId: number) => {
  try {
    const res = await axios.get<HeroInfo>(
      `https://akabab.github.io/superhero-api/api/id/${heroId}.json`
    );
    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
};

export { getHero };
