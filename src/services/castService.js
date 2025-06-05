// createCastMember(newCastMember)
import Cast from '../models/Cast.js';

export default {
    getAllCastMembers() {
        return Cast.find({});
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