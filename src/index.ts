import dotenv from "dotenv";
import { DEFAULT_PORT } from "./constants/server";
import { server } from "./server/server";

dotenv.config();
export const port = Number(process.env.PORT) || DEFAULT_PORT;
export const app = server({ port });
