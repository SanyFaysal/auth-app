const { config } = require("../../../config");
const { createToken } = require("../../helpers/createToken");
const { checkPassword } = require("../../helpers/passwordHelpers");
const { findUserByEmailService, signupService, getAllUsersService } = require("./user.service");

exports.signup = async (req, res) => {
    try {

        const data = req.body;
        const isUserExist = await findUserByEmailService(data.email);
        if (isUserExist) {
            return res.status(400).json({
                success: false,
                message: 'User already existed'
            })
        }


        const result = await signupService(data)



        const tokenData = {
            email: data.email,
            role: data.role
        }
        const token = createToken(tokenData, config.secret, config.expire_in)

        return res.status(200).json({
            success: true,
            message: 'Signup successful',
            data: result,
            token
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}


exports.login = async (req, res) => {
    try {

        const data = req.body;
        const userInfo = await findUserByEmailService(data.email)
        console.log(userInfo)
        if (!userInfo) {
            return res.status(404).json({
                success: false,
                message: 'Invalid credential'
            })
        }
        console.log(userInfo)
        const isPasswordValid = checkPassword(data.password, userInfo.password)

        if (!isPasswordValid) {
            return res.status(404).json({
                success: false,
                message: 'Invalid credential'
            })
        }


        const tokenData = {
            email: userInfo.email,
            role: userInfo.role
        }

        const token = createToken(tokenData, config.secret, config.expire_in)

        return res.status(200)
            .cookie('token', token)
            .json({
                success: true,
                message: 'Loggedin successful',
                data: userInfo,
                token
            })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const result = await getAllUsersService();

        return res.status(200).json({
            success: true,
            message: 'User fetched',
            data: result
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}