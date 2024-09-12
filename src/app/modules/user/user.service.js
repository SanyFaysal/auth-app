const { hashPassword } = require("../../helpers/passwordHelpers");
const User = require("./user.model")

exports.findUserByEmailService = async (email) => {
    const result = await User.findOne({ email });
    return result;
}
exports.getAllUsersService = async () => {
    const result = await User.find();
    return result;
}

exports.signupService = async (data) => {
    const hashPass = hashPassword(data.password);
    data.password = hashPass;

    const result = await User.create(data);
    return result;
}