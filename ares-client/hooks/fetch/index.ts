export const useFetch = async (url: string) => {
  const response = await fetch(url);
  const data = response.json();

  return { data };
};
