import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";
const router = express.Router(); // bằng app = express();
/**
 *
 * @param {*} app : express app
 * @returns
 */

const handleAbout = (req, res) => {
  return res.send("this is about");
};
const initWebRoutes = (app) => {
  // path và controller
  app.get("/", homeController.handleHome);
  router.get("/user", homeController.handleUser);
  router.post("/user/create", homeController.handleUserCreate);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  // router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/userUpdate", homeController.handleUpdateUser);

  //rest api - dùng web sử dụng các method (CRUD)
  //GET(R), POST (C), PUT (U), DELETE (D)

  router.get("/api/allCode", userController.getAllCode);
  router.get("/api/top-doctor-home", doctorController.getDoctorHome);
  router.get("/api/get-all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-info-doctor", doctorController.postInfoDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getSchedulesByDate
  );
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );

  return app.use("/", router);
};

export default initWebRoutes;
