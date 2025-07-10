import axios from 'axios';

const SWAPI_BASE = 'https://swapi.info/api';

//const categories = ['films', 'people', 'planets', 'species', 'vehicles', 'starships'];

//export const searchSwapi = async (query: string) => {
//  const results: { [category: string]: any[] } = {};
//
//  // pour chaque categorie on regarde si on a des données pour la query
//  // si oui on ajoute le tableau de données dans le tableau results à sa categorie associé
//  // si non, on ajoute un tableau vide à sa categorie associé
//  await Promise.all(
//    categories.map(async (category) => {
//      try {
//        const res = await axios.get(`${SWAPI_BASE}/${category}/?search=${query}`);
//        results[category] = res.data || [];
//      } catch (error) {
//        results[category] = []; // On continue même si une catégorie échoue
//        console.warn(`SWAPI error in ${category}:`, error);
//      }
//    })
//  );
//
//  return results;
//};

export const searchSwapi = async (category: string, text: string) => {
  const categoryInfos = await getCategory(category)

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

export const getCategory = async (query: string) => {
  let result = null;

  try {
    const res = await axios.get(`${SWAPI_BASE}/${query}`);
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
    const res = await axios.get(`${SWAPI_BASE}/${query.name}/${query.id}`);
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