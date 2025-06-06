// createCastMember(newCastMember)
import Cast from '../models/Cast.js';

export default {
    getAllCastMembers(filter) {
        let query = Cast.find();

        if(filter.exclude){
            query = query.nin('_id', filter.exclude);
        }
        return query;
    },
    createCastMember(castData) {
        const cast = new Cast({ ...castData });
        return cast.save();
    },
}