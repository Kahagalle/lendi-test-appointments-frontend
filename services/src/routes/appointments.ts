import { Router } from "express";
const moment = require('moment');

const appointments = [
  { id: 1, brokerId: 1, date: "15/10/2021" },
  { id: 2, brokerId: 3, date: "22/11/2021" },
  { id: 3, brokerId: 3, date: "23/11/2021" },
  { id: 4, brokerId: 4, date: "10/5/2021" },
  { id: 5, brokerId: 3, date: "10/5/2022" },
];

const router = Router();

export default router;

router.get("/", (req, res) => {
  appointments.forEach((appointment) => {
    appointment.date = moment(appointment.date, "DD/MM/YYYY").toDate()
  });
  appointments.sort((appointment1: any, appointment2: any) => appointment2.date - appointment1.date);

  appointments.forEach((appointment) => {
    appointment.date = moment(appointment.date).format("DD/MM/YYYY");
  });
  appointments.sort((appointment1: any, appointment2: any) => appointment1.brokerId - appointment2.brokerId);

  res.send(appointments);
});
