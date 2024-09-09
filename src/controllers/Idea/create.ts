import * as Interfaces from "../../interfaces";
import prisma from "../../../prisma/index";
import * as utils from "../../utils/index";

const Create:Interfaces.Controllers.Async=async (req,res)=>{
    try{
        const {user,overview,description,tags,progress}=req.body;
        console.log(req.body);
        const task=await prisma.idea.create(
            {
                data:
                {
                    user,overview,description,tags,progress
                }
            });
        return res.json(utils.Response.success("test"));
        // if(task){
        //     return res.status(200).send("Successfully added your idea");
        // }
        // else{
        //     return res.status(400).send("Problem!!");
        // }
    }
    catch(err:any){
        utils.Response.error(err.message);
    }
}

export default Create;