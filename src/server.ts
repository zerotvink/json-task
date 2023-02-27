import { config } from "configuration";
import { ApplicationHttpServer } from "servers/ApplicationHttpServer";

const application = new ApplicationHttpServer(config);

application.listen();
