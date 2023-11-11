import React, { useEffect, useState } from 'react';

function User(props) {
    const [user, setUser] = useState([]); 

    useEffect(() => {
        fetchUser();
      }, []);

      const fetchUser = () => {
        // 세션 저장소에서 토큰을 읽고
        // Authorization header에 이를 포함한다.
        const token = sessionStorage.getItem("jwt"); 
    
        fetch(SERVER_URL + 'api/cars', {
          headers: { 'Authorization' : token }
        })
        .then(response => response.json())
        .then(data => setUser(data._embedded.user))
        .catch(err => console.error(err));    
      }

    return (
        <div>
            
        </div>
    );
}

export default User;