import { NestFactory } from "@nestjs/core";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new IoAdapter());
  app.enableCors();
  await app.listen(3000);
  console.log("🚀 Server ready at http://localhost:3000`");
  console.log("🚀 Websocket ready at ws://localhost:3001`");
}
bootstrap();
