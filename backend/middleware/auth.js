import jwt from 'jsonwebtoken';

const secret = 'secret';

const auth = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, secret);
        req.userId = decodedToken?.id;

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;