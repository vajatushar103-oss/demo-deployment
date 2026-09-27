import {useContext, useEffect} from "react";
import {AuthContext} from "../components/context/AuthContext.jsx";
import {register, login, logout, getMe} from "../services/auth.api.js";

export const useAuth = () => {

    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading, isAuthenticated, setAuthenticated} = context;

    const handleRegister = async ({userName, email, password}) => {



    }

    const handleLogin = async ({email, password}) => {

        setLoading(true);
        try{
            const data = await login({email, password});
            setUser(data.user);

        }catch(err){
            console.log("ERROR IN client/src/hooks/useAuth.js => handleLogin. ERROR: " + err);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout = async () => {

        setLoading(true);
        try{
            await logout();
            setUser(null);
        }catch(err){
            console.log("ERROR IN client/src/hooks/useAuth.js => handleLogout(). ERROR: " + err);
        }finally{
            setLoading(false);
        }

    }

    useEffect(() => {

        const getAndSetUser = async () => {
            try{

                const data = await getMe();
                setUser(data.user);
                setAuthenticated(true);

            }catch(err){
                setUser(null);
                setAuthenticated(false);
                console.log("ERROR IN client/src/hooks/useAuth.js => useEffect. ERROR: " + err);
            }finally{
                setLoading(false);
            }
        }

        getAndSetUser();

    },[]);

    return {user, loading, isAuthenticated: !!user, handleRegister, handleLogin, handleLogout};

}
