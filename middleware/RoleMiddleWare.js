const RoleMiddleware=(...allowedRoles)=>{
    return (req,res,next)=>{
        console.log("user:",req.user)
        console.log("Allowed ROles:",allowedRoles)
        if(!req.user){
            return res.status(401).json({
                message:"Authentication Required"
            })
        }

        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message:"Acces denied"
            })
        }
        next()
    }
}

module.exports=RoleMiddleware;