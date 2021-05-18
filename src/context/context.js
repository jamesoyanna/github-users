import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//  the githubContext will be supplying a Provider and a Consumer

const GithubProvider = ({children}) => {
    const [githubUser, setgithubUser] = useState(mockUser);
    const [followers, setFollowers] = useState(mockFollowers);
    const [repos, setRepos] = useState(mockRepos);
 
    // Requests , Loading
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState({show: false, msg: ""});

    const searchGithubUser = async(user) => {
      toggleError()
      setIsloading(true);
      const response = await axios(`${rootUrl}/users/${user}`)
      .catch((err) => console.log(err)
      );
      console.log(response)

      if(response) {
          setgithubUser(response.data);
          const {login, followers_url } = response.data;

          //
            await Promise.allSettled([
                axios(`${rootUrl}/users/${login}/repos?per_page=100`), 
                axios(`${followers_url}?per_page=100`) ])
            .then((results) => {
               const [repos, followers] = results;
               const status = "fulfilled";
               if(repos.status === status) {
                  setRepos(repos.value.data);
               }

                 if (followers.status === status) {
                   setFollowers(followers.value.data);
                 } 
               
            }).catch((err) => console.log(err))
      } else {
          toggleError(true, "There is no user with that username")
      }
      checkRequests();
      setIsloading(false)
    }

    //Check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`)
        .then(({data}) =>{
        let {rate:{ remaining}, } = data;
        setRequests(remaining);
        if(remaining === 0) {
            // throw error
            toggleError(true, "Sorry you have exceed your hourly rate limit")

        }
        })
        .catch((err) => console.log(err))
    }

    //Error handling
  function toggleError(show =false, msg="") {
      setError({show, msg})
  }

    useEffect((checkRequests), [])

return (
  <GithubContext.Provider
    value={{
      githubUser,
      followers,
      repos,
      requests,
      error,
      searchGithubUser,
      isLoading,
    }}
  >
    {children}{" "}
  </GithubContext.Provider>
);
}

export {GithubProvider, GithubContext}
