export default class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }

    async find() {
        return this.roomModel.find();
    }

    async findByID(id) {
        return this.roomModel.findById(id);
    }

    async findByType(type) {
        return this.roomModel.find({type})
    }

    async create(createRoomDto) {
        const room = new this.roomModel(createRoomDto);
        return room.save();
    }

    async update(id, updateRoomDto) {
        return this.roomModel.findByIdAndUpdate(id, updateRoomDto, {new: true});
    }

    async delete(id) {
        return this.roomModel.findByIdAndDelete(id);
    }
};

