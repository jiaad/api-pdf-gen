import { createContext, useContext, useReducer } from "react";
const ClientContext = createContext<any | null>(null);
ClientContext.displayName = "ClientContext";
export type InitialState = {
  clients: Array<object>;
  factures: Array<object>;
};
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function clientReducer(state: InitialState, action: any) {
  console.log({ state, action });
  switch (action.type) {
    case "clients": {
      return { ...state, clients: action.payload };
    }
    case "addClient": {
      return { ...state, clients: [...state.clients, action.payload] };
    }
    case "deleteClient": {
      return {
        ...state,
        clients: state.clients?.filter((elem) => elem?.id !== action.payload),
      };
    }
    case "factures": {
      return { ...state, factures: action.payload };
    }
    case "addFacture": {
      return {
        ...state,
        factures: [...state.factures, action.payload],
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function ClientProvider(props: any) {
  const [state, dispatch] = useReducer(clientReducer, {
    clients: [],
    factures: [],
  });
  const value = { state, dispatch };
  return <ClientContext.Provider value={value} {...props} />;
}

export function useClient() {
  const ctx = useContext(ClientContext);
  if (!ctx) {
    throw Error("useClient must be inside ClientContext");
  }
  return ctx;
}
