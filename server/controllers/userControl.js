import userService from "../services/userService.js";

export default class UserController {

    constructor(userService){
        this.userService = userService;
    };

    async getAll(req, res){
        try {
            const users = await this.userService.findAll();
            res.status(200).json(users);
          } catch (error) {
            res.status(500).json({ 
                message: error.message 
            });
          }
        };

    async getById(req, res){
        try{
            const user = await this.userService.findById(req.params.id);
            if(!user) return res.status(404).json({message:'client non trouvé'});
            res.status(200).json(user);
        }
        catch(error){
            res.status(500).json({ 
                message: error.message 
            }); 
        }
    };

    async create(req, res){
        const {username, email, password} = req.body;
    try{
        const newUser = await this.userService.create({username, email, password});
        res.status(201).json(newUser);
    }
    catch(error)
    {
        res.status(500).json({ 
            message: error.message 
        }); 
    }
    };

    async update(req, res){
        try{
            const user = await this.userService.update(req.params.id, req.body);
            if(!user) return res.status(404).json({message:'client non trouve'});
            res.status(200).json(user);
        }
        catch(error){
            res.status(500).json({ message: error.message }); 
        }
    };
    
    async delete(req, res){
        try{
            const user = await this.userService.delete(req.params.id);
            if(!user) return res.status(404).json({message : 'client non trouve'});
            res.status(200).json({message : 'user supprimé'});
         }
         catch(error){
             res.status(500).json({ message: error.message }); 
     
         }
    };
}


