export default function getCategoryOptionsViewData(category) {
    const categories = [
        { value: 'movie', title: 'Movie' },
        { value: 'tv-show', title: 'TV Show' },
        { value: 'documentary', title: 'Documentary' },
        { value: 'animation', title: 'Animation' },
        { value: 'short-film', title: 'Short Film' }
    ];
    const options = categories.map(option => ({ ...option, selected: option.value === category ? 'selected' : '' }));
    return options;
}