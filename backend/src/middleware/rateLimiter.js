import ratelimit from "../config/upstash.js"


//Rate limiting should be per user but for concept we have done for everyone
const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key")

        if(!success) return res.status(429).json({message:"Too many request. Please try again later!"})

        next();
    } catch (error) {
        console.log("Rate limit error", error)
        next(error);
    }
}

export default rateLimiter;