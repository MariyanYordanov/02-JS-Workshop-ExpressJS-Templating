// createCastMember(newCastMember)
import Cast from '../models/Cast.js';

export default {
    async getAllCastMembers(filter = {}) {
        let result = await Cast.find({});

        if (filter.name) {
            result = result.filter(cast => cast.name.toLowerCase().includes(filter.name.toLowerCase()));
        }
        if (filter.age) {
            result = result.filter(cast => cast.age === Number(filter.age));
        }
        if (filter.born) {
            result = result.filter(cast => cast.born.getFullYear() === Number(filter.born));
        }
        return result;
    },
    createCastMember(castData) {
        const cast = new Cast({ ...castData });
        return cast.save();
    },
    async getCastMemberById(castId) {
        const cast = await Cast.findById(castId);
        if (!cast) {
            throw new Error(`Cast member with id ${castId} not found`);
        }
        return cast;
    },
    async updateCastMember(castId, castData) {
        const cast = await Cast.findByIdAndUpdate(castId, castData, { new: true });
        if (!cast) {
            throw new Error(`Cast member with id ${castId} not found`);
        }
        return cast;
    }
    ,
    async deleteCastMember(castId) {
        const cast = await Cast.findByIdAndDelete(castId);
        if (!cast) {
            throw new Error(`Cast member with id ${castId} not found`);
        }
        return cast;
    },
}