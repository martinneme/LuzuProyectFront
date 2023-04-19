import stringSimilarity from 'string-similarity';

export async function search(arr, title) {
  const resultados = await Promise.all(arr.map(async (objeto) => {
    const similitud = await stringSimilarity.compareTwoStrings(objeto.title, title.toUpperCase());
    return {
      ...objeto,
      similitud
    };
  }));

  await resultados.sort((a, b) => b.similitud - a.similitud);

  return await resultados[0].similitud && resultados[0].similitud  > 0.5 ? resultados[0] : 0
}