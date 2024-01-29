const { userModel } = require("../models");
const { emailService, tokenService } = require("../services");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");


const registerUser = catchAsync(async (req, res) => {

    const { email, phone } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);

    if (email) {

        const htmlText = `<p>Verify your otp with below code</p><p style="color:tomato;font-size:25px;letter-spacing:2px"><b>${otp}</b></p>`
        const success = await emailService.sendMail(email, htmlText, 'Otp verification');

        await userModel.deleteOne({ email });

        const user = await userModel.create({

            email,
            otp

        })

        res.json({ message: "Check your gmail for otp verification" });

    }


    // const user = await userModel.create({

    //     name,
    //     phone,
    //     password,
    //     otp

    // })

    // res.json({ message: "check your mail for otp" });

}
)
const verifyUserOtp = catchAsync(async (req, res, next) => {

    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user['otp'] != otp) {

        throw new ApiError(401, "You do not have the necessary credentials to access this resource");

    }
    const token = await tokenService.generateAccessToken(user);
    res.json({ message: "you login successfully", accessToken: token })

})
//

module.exports = { registerUser, verifyUserOtp }