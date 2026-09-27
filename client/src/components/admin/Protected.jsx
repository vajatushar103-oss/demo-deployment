import {useCallback, useState} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.js";
import LoadingPage  from "../common/LoadingPage.jsx";

export const Protected = ({children}) => {

    const {user, loading} = useAuth();
    const [loadingScreenFinished, setLoadingScreenFinished] = useState(false);
    const handleLoadingFinished = useCallback(() => {
        setLoadingScreenFinished(true);
    }, []);

    if(loading || !loadingScreenFinished){
        return (
            <LoadingPage
                loading={loading}
                onFinished={handleLoadingFinished}
            />
        )
    }

    if(!user){
        return <Navigate to={"/login"} />
    }

    return children;

}