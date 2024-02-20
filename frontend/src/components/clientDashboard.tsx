import { Button, Flex, Table, TableColumnsType, Typography } from "antd";
import { useClient } from "../contexts/clients";
import { ClientType } from "./types";

const columns: TableColumnsType<ClientType> = [
  {
    title: "Nom",
    dataIndex: "firstName",
  },
  {
    title: "Prénom",
    dataIndex: "lastName",
  },
  { title: "Address", dataIndex: "address" },
  {
    title: "Action",
    dataIndex: "action",
    render(_text, record) {
      return <ClientActions data={record} />;
    },
  },
];

function ClientActions({ data }: { data: ClientType }) {
  const { dispatch } = useClient();
  const handleDelete = async () => {
    const res = await fetch(
      `http://localhost:1010/api/v1/clients/${data?.id}`,
      {
        method: "DELETE",
      }
    );
    const dt = await res.json();
    if (dt.success === false) return alert(dt.msg);
    dispatch({ type: "deleteClient", payload: data?.id });
  };
  const handleUpdate = () => {
    fetch(`http://localhost:1010/api/v1/clients/${data?.id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => data.data)
      .then((data) => dispatch({ type: "updateClient", payload: data }))
      .catch((err) => alert(err.message));
  };
  return (
    <Flex>
      <Button onClick={() => handleDelete()}>Delete</Button>
      <Button onClick={() => handleUpdate()}>Update</Button>
    </Flex>
  );
}

export default function ClientDashboard() {
  const { state } = useClient();
  console.log({ newState: state });
  return (
    <Flex vertical>
      <Typography.Title level={1}>Dashboard client</Typography.Title>
      <Table dataSource={state?.clients} columns={columns} rowKey={(record) => record.id}/>
    </Flex>
  );
}
