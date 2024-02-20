import { Flex, Table, TableColumnsType, Typography } from "antd";
import { useClient } from "../contexts/clients";
import { ClientType } from "./types";

const columns: TableColumnsType<ClientType> = [
  {
    title: "Titre",
    dataIndex: "title",
  },
  {
    title: "description",
    dataIndex: "description",
  },
  {
    title: "totale",
    dataIndex: "total",
  },
  {
    title: "pdf",
    dataIndex: "pdf",
    render(text) {
      if (text == "") {
        return <p>Pdf pas trouvé</p>;
      }
      return <a href={`http://localhost:1010/factures/${text}`}>see pdf</a>;
    },
  },
];

export default function FactureDashboard() {
  const { state } = useClient();
  console.log({ newState: state });
  return (
    <Flex vertical>
      <Typography.Title level={1}>Dashboard Factures</Typography.Title>
      <Table dataSource={state.factures} columns={columns} rowKey={(record) => record.id} />
    </Flex>
  );
}
