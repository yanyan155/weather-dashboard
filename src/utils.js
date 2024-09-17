const appid = "f54e26292e8a7851c509d107a3730b1d";

const getResource = async (url) => {
  const res = await fetch(`${url}&appid=${appid}`);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, received ${res.status}`);
  }
  return await res.json();
};

export { getResource };
