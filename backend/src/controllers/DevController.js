const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async update(request, response) {
        const { name, techs, latitude, longitude, bio, avatar_url, github_username } = request.body;

        let dev = await Dev.findOne({ github_username });

        const techsArray = parseStringAsArray(techs);

        const location = {
                type: 'Point',
                coordinates: [longitude, latitude], 
            };
        
        const newDev = { 
            $set: {
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            }
        };

        await Dev.updateOne(dev, newDev);

        return response.json({ message: 'Registro atualizado com sucesso!' });
    },

    async destroy(request, response) {
        const { github_username } = request.body;
        
        await Dev.deleteOne({
             github_username: {
                 $eq: github_username
             }
            });

        return response.json({ message: 'Registro apagado com sucesso!' });
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev)
        {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, bio, avatar_url } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude], 
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
        
        return response.json(dev);
    }
};