import { Button, Flex } from "antd";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import FactureForm from "./components/factureForm";
import { useClient } from "./contexts/clients";
import ClientForm from "./components/clientForm";
import ClientDashboard from "./components/clientDashboard";
import FactureDashboard from "./components/factureDashboard";
const getClients = async () => {
  const res = await fetch("http://localhost:1010/api/v1/clients");
  const data = await res.json();
  return data.data;
};
const getFactures = async () => {
  const res = await fetch("http://localhost:1010/api/v1/factures");
  const data = await res.json();
  return data.data;
};

function App() {
  const [createClient, setCreateClient] = useState(false);
  const [createFacture, setCreateFacture] = useState(false);
  const { dispatch } = useClient();

  const toggleClientLogic = () => setCreateClient((prev) => !prev);
  const toggleFactureLogic = () => setCreateFacture((prev) => !prev);
  const getData = useCallback(async () => {
    const [clients, factures] = (await Promise.allSettled([
      getClients(),
      getFactures(),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ])) as { status: "fulfilled" | "rejected"; value: any }[];
    console.log({ dispatch });
    dispatch({ type: "factures", payload: factures?.value });
    dispatch({ type: "clients", payload: clients.value });
  }, [dispatch]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex vertical gap={"large"}>
      <Flex justify="space-between">
        <div>HETIC PROJECT</div>
        <Flex gap={"small"}>
          <Button onClick={() => toggleClientLogic()} type="primary">
            {createClient == false ? "create client" : "cancel"}
          </Button>
          <Button onClick={toggleFactureLogic} type="primary">
            {createFacture == false ? "create facture" : "cancel"}
          </Button>
        </Flex>
      </Flex>
      <Flex vertical>
        {createClient && <ClientForm />}
        {createFacture && <FactureForm />}
      </Flex>
      <Flex vertical>
        <ClientDashboard />
        <FactureDashboard />
      </Flex>
    </Flex>
  );
}

export default App;
