import { Button, Flex, Form, Input, InputNumber, Select } from "antd";
import { useState } from "react";
import { useClient } from "../contexts/clients";
import { ClientType } from "./types";

export default function FactureForm() {
  const [error, setError] = useState("");
  const [form] = Form.useForm();

  const { state, dispatch } = useClient();
  const onFinish = (values: object) => {
    setError("");
    fetch("http://localhost:1010/api/v1/factures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.success) {
          dispatch({ type: "addFacture", payload: data.data });
          form.resetFields();
        } else {
          setError("Error appeared");
        }
      })
      .catch((err) => setError(err.message));
  };
  return (
    <Flex vertical>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name="clientId" label="Choisissez le client">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            {state?.clients?.map((client: ClientType) => (
              <Select.Option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </Select.Option>
            ))}
            <Select.Option value="female">female</Select.Option>
            <Select.Option value="other">other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name={"companyName"}
          label="Nom de l'entreprise"
          rules={[
            {
              required: true,
              message: "veuillez-reinseigner le nom de l'entreprise",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"title"}
          label="Titre"
          rules={[{ required: true, message: "veuillez-reinseigner le titre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"description"}
          label="La description du projet"
          rules={[
            { required: true, message: "veuillez-reinseigner la description" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name={"total"}
          label="Totale"
          rules={[
            {
              required: true,
              message: "veuillez-reinseigner le montant total",
            },
          ]}
        >
          <InputNumber type="number" style={{ width: "100%" }} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Flex>
  );
}
