//Might delete, depends if auth will be stored in context, cookies or local storage

import React, { createContext } from "react";

const AuthContext = createContext(null);

export {AuthContext};