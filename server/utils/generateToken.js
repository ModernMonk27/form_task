import jwt from 'jsonwebtoken'


const generateToken = (res,userId) => {

    const token = jwt.sign({userId},'secret',{
        expiresIn : '30d',
    })
    res.cookiee('jwt',token,{
        httpOnly : true,
        sameSite : 'strict',
        secure : false,
        maxAge : 30 * 24 * 60 * 60 * 1000,
    })
    console.log(token)
}

export default generateToken;