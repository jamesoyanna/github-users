import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

//  the githubContext will be supplying aProvider and a Consumer

const GithubProvider = ({children}) => {
return <GithubContext.Provider value="JAMES OYANNA">{children}  </GithubContext.Provider>
}

export {GithubProvider, GithubContext}
