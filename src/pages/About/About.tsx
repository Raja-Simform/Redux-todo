import { Typography } from "antd";

const { Title } = Typography;
export default function About() {
  return (
    <div style={{ display: "flex", padding: 16 }}>
      <Title level={2} style={{ margin: 0 }}>
        Hello welcome to about
      </Title>
    </div>
  );
}
