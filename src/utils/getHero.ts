import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : 'proxy';

const getHero = async (heroId: number) => {
  try {
    const res = await axios.get<HeroInfo>(
      `${PROXY}/api/${process.env.REACT_APP_SUPERHERO_API_KEY}/${heroId}`
    );
    return res.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  }
};

export { getHero };
