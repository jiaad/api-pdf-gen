import { Button, Flex, Form, Input } from "antd";
import { useState } from "react";
import { useClient } from "../contexts/clients";
import { useForm } from "antd/es/form/Form";
export default function ClientForm() {
  const [form] = useForm();
  const [error, setError] = useState("");

  const { dispatch } = useClient();
  const onFinish = (values: object) => {
    console.log({ values });
    fetch("http://localhost:1010/api/v1/clients", {
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
          dispatch({ type: "addClient", payload: data.data });
          form.resetFields();
        } else {
          setError("Error appeared");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Flex vertical>
      {error && <p>{error}</p>}
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          name={"firstName"}
          label="Votre nom"
          rules={[
            { required: true, message: "veuillez-reinseigner votre nom" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"lastName"}
          label="Votre prénom"
          rules={[
            { required: true, message: "veuillez-reinseigner votre prénom" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"email"}
          label="Votre email"
          rules={[
            { required: true, message: "veuillez-reinseigner votre email" },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Votre addresse"
          rules={[
            { required: true, message: "veuillez-reinseigner votre addresse" },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Flex>
  );
}
