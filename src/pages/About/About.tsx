import { Typography } from "antd";

const { Title } = Typography;
export default function About() {
  return (
    <div className="flex  p-2">
      <Title level={2} className="m-0">
        Hello welcome to about
      </Title>
    </div>
  );
}
