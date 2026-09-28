import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5000",
//     withCredentials: true
// });

const api = axios.create({
    baseURL: "/api",
    withCredentials: true
});


export async function register(){


}

export async function login({email, password}){

    try{

        const response = await api.post("/auth/login",{
            email, password
        });


        return response.data;
        
    }catch(err){
        console.log("ERROR IN client/src/services/auth.api.js. ERROR: " + err);
    }

}

export async function logout(){
    try{
        await api.get("/auth/logout");
    }catch(err){
        console.log("ERROR IN client/src/services/auth.api.js. ERROR: " + err);
    }

}

export async function  getMe() {

    try{

        const response = await api.get("/auth/getMe");
        return response.data;

    }catch(err){
        console.log("ERROR IN client/src/services/auth.api.js => getMe(). ERROR: " + err);
    }
    
}

export async function tempAdminUsers() {
   
    try{

        // console.log("==========================CLIENT_CHECKPOINT==========================");

        const response = await api.get("/admin/users");
        return response.data;

    }catch(err){
        console.log("ERROR IN client/src/services/auth.api.js => tempAdminUsers(). ERROR: " + err);
    }
}

