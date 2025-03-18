import Room from '../Models/Room'

export class RoomService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }

    async findAll() {
        return this.roomModel.find();
    }

    async findByID(id) {
        return this.roomModel.findById(id);
    }

    async findByroomType(type) {
        return this.roomModel.find({type})
    }

    async create(createRoomDto) {
        const room = new this.roomModel(createRoomDto);
        return room.save();
    }

    async update(id, updateRoomDto) {
        return this.roomModel.findByIdAndUpdate(id, updateRoomDto);
    }

    async remove(id) {
        return this.roomModel.findByIdAndDelete(id);
    }
}

const roomService = new RoomService(Room);
export default roomService;