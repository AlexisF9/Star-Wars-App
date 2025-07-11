import axios from 'axios';

export const searchSwapi = async (category: string, text: string) => {
  const categoryInfos = await getAllElementsOfCategory(category)

  if (!category) {
    return []
  }

  // Je filtre par title ou par name pour récupérer les éléments correspondant à ma recherche
  const result = categoryInfos.filter((item: {name: string, title:string}) =>
    (category === 'films' ? item.title : item.name).toLowerCase().includes(text.toLowerCase())
  )

  const newResults = result.map((item: {url: string}) => {
    // Je split l'url en tableau de string 
    const splitUrl = item.url.split('/');

    // Je récupère la catégorie et l'id de l'url (les deux derniers éléments)
    const category = splitUrl[splitUrl.length - 2];
    const id = splitUrl[splitUrl.length - 1];

    // j'injecte la categorie et l'id dans l'objet
    return {...item, category: category, id: id};
  });
  
  return newResults
}

export const getAllElementsOfCategory = async (query: string) => {
  let result = null;

  try {
    const res = await axios.get(`${process.env.SWAPI_BASE_URL}/${query}`);
    result = res.data || null;
  } catch (error) {
    result = null;
    console.warn(`SWAPI error in ${query}:`, error);
  }

  return result;
};

export const getInfoElement = async (query: { name: string, id: string }) => {
  let result = null;

  try {
    const res = await axios.get(`${process.env.SWAPI_BASE_URL}/${query.name}/${query.id}`);
    result = res.data || null;
  } catch (error) {
    result = null;
    console.warn(`SWAPI error in ${query}:`, error);
  }

  const splitUrl = result.url.split('/');
  const category = splitUrl[splitUrl.length - 2];
  const id = splitUrl[splitUrl.length - 1];

  const newResult = {...result, category: category, id: id}

  return newResult;
};

export const getInfoElementByUrl = async (query: string) => {
  let result = null;

  try {
    const res = await axios.get(query);
    result = res.data || null;
  } catch (error) {
    result = null;
    console.warn(`SWAPI error in ${query}:`, error);
  }

  const splitUrl = result.url.split('/');
  const category = splitUrl[splitUrl.length - 2];
  const id = splitUrl[splitUrl.length - 1];

  const newResult = {...result, category: category, id: id}

  return newResult;
};