import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const Update:Interfaces.Controllers.Async=async (req,res)=>{
    try{
        const {overview,description,tags,progress}=req.body;
        const upd=await prisma.idea.update(
            {
                data:
                    {
                        overview,description,tags,progress
                    },
                where:
                    {
                        id:req.params.id
                    }
            }
        );
        if(upd){
            res.status(200).send(upd);
        } 
    }
    catch(err:any){
        utils.Response.error(err.message);
    }
}

export default Update;