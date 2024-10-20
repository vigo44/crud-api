import http from "node:http";
import { requestHandler } from "./requestHandler";

type serverProps = {
  port: number;
};

export const server = ({ port }: serverProps) => {
  const server = http.createServer(requestHandler);
  server.listen(port, () => console.log(`Server  running at http://localhost:${port}`));
};
