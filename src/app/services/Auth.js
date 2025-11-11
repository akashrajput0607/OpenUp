import { API } from "../Utils/Axiosinstance";

export async function signup(body){
    try {
        console.log(body);
        const result=await API.post("/auth/signup",body,{
            headers:{"Content-Type":"application/json"}
        })
        return result;
    } catch (error) {
        console.log(error);
    }
}