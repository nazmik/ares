export const useFetch = async (url: string) => {
  const response = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          authorization: localStorage.getItem("token") ?? "",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
