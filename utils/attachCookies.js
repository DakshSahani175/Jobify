
const attachCookie = ({res, token})=>{
    try{
        const oneDay = 1000 *60*60*24;
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + oneDay),
            secure: process.env.NODE_ENV==="production",
        })
    }
    catch(err){
        console.log(err);
    }
}

export default attachCookie;