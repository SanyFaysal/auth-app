require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const { config } = require('./config');



async function main() {
    try {
        await mongoose.connect(config.database_url)
        console.log('Database is connected')
        app.listen(config.port, () => {
            console.log(`App is listening on port:${config.port}`)
        })
    } catch (error) {
        console.log('Failed to connect to the database:', error)
    }
}

main()