import { env } from "../environment"

export const calculateCredit = async( credit)=>{

    try{
         const result = await fetch(env.url+'creditSimulator/simulate',{
         method: 'POST',
         headers:{'Content-type': 'application/json'},
         body: JSON.stringify(credit)
         })
         return await result.json();
    }catch(error){
        console.log(error)
        return null;
    }
}