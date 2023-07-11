const initialState = {
    username: '',
    picture: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          username: action.payload.username,
          picture: action.payload.picture,
        };
      case 'LOGOUT':
        return {
          ...state,
          username: '',
          picture: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;