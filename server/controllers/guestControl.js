const Guest = require('../models/Guest');

exports.getAllGuests = async (req, res) => {
    try {
      const guests = await Guest.find();
      res.status(200).json(guests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getGuestById = async (req,res)=>{
    try{
        const guest = await Guest.findById(req.params.id);
        if(!guest) return res.status(404).json({message:'client non trouvé'});
        res.status(200).json(guest);
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}

exports.creatGuest = async(req, res) => {
    const {guestname, roomnumber,checkInDate, checkOutDate, feedback} = req.body;
    try{
        const newGuest = new Guest({guestname, roomnumber,checkInDate, checkOutDate, feedback});
        await newGuest.save();
        res.status(201).json(newGuest);
    }
    catch(error)
    {
        res.status(500).json({message:'error page'});
    }
}

exports.modifyGuest = async(req, res)=> {
    try{
        const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!guest) return res.status(404).json({message:'client non trouve'});
        res.status(200).json(guest);
    }
    catch(error){
        res.status(500).json({message: 'error page'});
    }
}

exports.suppGuest = async(req, res)=>{
    try{
       const guest = await Guest.findByIdAndDelete(req.params.id);
       if(!guest) return res.status(404).json({message : 'client non trouve'});
       res.status(200).json({message : 'guest supprimé'});
    }
    catch(error){
        res.status(500).json({message: 'error page'});

    }
}