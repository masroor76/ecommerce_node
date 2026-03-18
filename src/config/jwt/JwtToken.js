import jwt from 'jsonwebtoken';

export const JwtSign = (id, email) => {
    try {
        const token = jwt.sign(
            { id: id, email: email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        return token;

    } catch (err) {
        throw new Error(`An Error Occured: ${err}`);
    }
}

export const VerifyJwt = (token) => {
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        return verify;
    } catch (err) {
        throw new Error(`An Error Occured: ${err}`);
    }
}