import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const Create:Interfaces.Controllers.Async=async (req,res)=>{
    try{
        const {user,overview,description,tags,progress}=req.body;
        const task=await prisma.idea.create(
            {
                data:
                {
                    user,overview,description,tags,progress
                }
            });
        if(task){
            res.status(200).send("Successfully added your idea");
        } 
    }
    catch(err:any){
        utils.Response.error(err.message);
    }
}

export default Create;