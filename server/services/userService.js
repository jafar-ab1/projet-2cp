import user from '../models/User';

export class UserService{
    constructor(userModel){
        this.userModel = userModel;
    }

    async findAll(){
        return this.userModel.find();
    }

    async findById(id){
        return this.userModel.findById(id);
    }

    async create(createUserDto){
        const newuser = new this.userModel(createUserDto);
        return newuser.save();
    }

    async update(id, updateUserDto){
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true})
    }

    async delete(id){
        return this.userModel.findByIdAndDelete(id)
    }
}

const userService = new UserService(user);
export default userService;
