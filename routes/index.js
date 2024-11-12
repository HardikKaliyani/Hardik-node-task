import express from "express";
import instituteRoute from "./institutes.route.js";
const router = express.Router();

const routes = [
  {
    path: "/institute",
    route: instituteRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
