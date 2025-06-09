export default function getCategoryOptionsViewData(selectedCategory) {
    const categories = [
        { value: 'movie', title: 'Movie' },
        { value: 'tv-show', title: 'TV Show' },
        { value: 'documentary', title: 'Documentary' },
        { value: 'animation', title: 'Animation' },
        { value: 'short-film', title: 'Short Film' }
    ];

    return categories.map(cat => ({
        ...cat,
        selected: cat.value === selectedCategory ? 'selected' : ''
    }));
}