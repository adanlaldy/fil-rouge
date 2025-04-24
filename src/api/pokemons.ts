export const getPokemonById = async (id: string) => {
    const res = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
    if (!res.ok) throw new Error('Failed to fetch pokemon');
    return res.json();
};

