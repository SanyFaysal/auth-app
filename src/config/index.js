const dotenv = require('dotenv')
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

exports.config = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    secret: process.env.JWT_SECRET,
    expire_in: process.env.JWT_EXPIRE_IN,
}; 