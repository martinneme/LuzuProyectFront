const stringSimilarity = require('string-similarity');

export async function search(arr, title) {
    const resultados = await Promise.all(arr.map(async (objeto) => {
      const similitud = await stringSimilarity.compareTwoStrings(objeto.title, title.toUpperCase());
      return {...objeto, similitud};
    }));
  
    resultados.sort((a, b) => b.similitud - a.similitud);
    
    return resultados[0].similitud > 0.5 ? resultados[0] : 0;
  }