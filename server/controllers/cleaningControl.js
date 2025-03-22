import  cleaningService  from '../services/cleaningService.js';

export default class CleaningController {

    constructor(cleaningService) {
        this.cleaningService = cleaningService;
    }

    async getAll(req, res) {
        try {
            const cleanings = await this.cleaningService.findAll();
            res.status(200).json(cleanings); 
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async getByRoomNb(req, res) {
        try {
            const roomNumber = req.params.roomNumber;

            const cleaning = await this.cleaningService.findByRoomNb( roomNumber );
            if (!cleaning) return res.status(404).json({ message: 'Cleaning not found' });
            res.status(200).json(cleaning);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async create(req, res) {
        const { roomNumber, status, lastCleaned, nextCleaning } = req.body;

        try {
            const newCleaning = await this.cleaningService.create({ roomNumber, status, lastCleaned, nextCleaning }); 
            res.status(201).json(newCleaning);
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async delete(req, res) {
        const { roomNumber } = req.body;

        try {
            const cleaning = await this.cleaningService.Delete( roomNumber ); 
            if (!cleaning) return res.status(404).json({ message: 'Cleaning not found' });
            res.status(200).json({ message: 'Cleaning deleted successfully' });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

