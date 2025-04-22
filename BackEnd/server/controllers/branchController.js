const Branch = require('../models/Branch');

exports.createBranch = async (req, res) => {
        try {
            const { name, location, email, phone } = req.body;

            const newBranch = new Branch({ name, location, email, phone });

            await newBranch.save();
            res.status(201).json({newBranch});
            
        } catch (error) {
            res.status(500).json({ message: error.message });
  }
};

exports.getAllBranches = async (req, res) => {
        try {
            const branches = await Branch.find();
            if (!branches) return res.status(404).json({message:"branches non trouvé"})
            res.status(200).json(branches);

        } catch (error) {
                res.status(500).json({ message: error.message });
      }
    };

exports.getBranchByName = async (req, res) => {
        try {
            const {name} = req.params;
            const branch = await Branch.findOne({name});
            if (!branch) return res.status(404).json({message:"branch pas trouvé"});
            res.status(200).json(branch);

        } catch (error) {
            res.status(500).json({ message: error.message });
  }
};

exports.updateBranch = async (req, res) => {
        try {
            const {name} = req.params;

            const branch = await Branch.findOneAndUpdate({name}, req.body, {new: true});
            if (!branch) return res.status(404).json({message: "branch non trouvé"});
            res.status(200).json(branch)

        } catch (error) {
            res.status(500).json({ message: error.message });
  }
};

exports.deleteBranch = async (req, res) => {
        try {
            const {name} = req.params;
            const branch = await Branch.findOneAndDelete({name});
            if (!branch) return res.status(404).json({message: "branch non trouvé"})
            res.status(200).json({message: "branch supprime"})

        } catch (error) {
            res.status(500).json({ message: error.message });
  }
};

  
