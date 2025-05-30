import { Typography, Layout } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  return (
    <Layout
      style={{
        padding: "2rem",
      }}
    >
      <Content>
        <Title>Welcome to home page</Title>
      </Content>
    </Layout>
  );
}
