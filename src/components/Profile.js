import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = ({setAppUser}) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    isAuthenticated && (
        setAppUser(user.sub)
    )
    
    if (isLoading) {
        return <div>Loading ...</div>;
    }
    
    return (
        isAuthenticated && (
            
            <div>
               
                <h2>{user.sub}</h2>
                <p>{user.email}</p>
                
            </div>
        )
        
    );
};

export default Profile;