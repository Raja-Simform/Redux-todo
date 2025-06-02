import { Typography, Layout } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  return (
    <Layout className="p-8 ">
      <Content>
        <Title>Welcome to home page</Title>
      </Content>
    </Layout>
  );
}
