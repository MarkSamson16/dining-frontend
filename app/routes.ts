import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route(null, "./routes/_layout.tsx", [
    index("./routes/home.tsx"),
    route("menu", "./routes/menu.tsx"),
  ]),
] satisfies RouteConfig;
