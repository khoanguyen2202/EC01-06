import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg:"Invalid Authentication"})
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,customer)=>{
            if(err) return res.status(400).json({msg:"Invalid Authentication"})
            req.customer = customer
            next()
        })
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
};

export default auth
