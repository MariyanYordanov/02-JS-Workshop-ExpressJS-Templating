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
}