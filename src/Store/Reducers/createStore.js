import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./authReducer";
import thunkMiddleware from "redux-thunk";

const persistConfig = {
  key: "root",
  storage
};
var pReducer = persistReducer(persistConfig, authReducer);

export default () => {
  const store = createStore(pReducer, applyMiddleware(thunkMiddleware));
  const persistor = persistStore(store);
  return { store, persistor };
};
