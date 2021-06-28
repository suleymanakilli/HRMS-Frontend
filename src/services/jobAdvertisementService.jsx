import axios from "axios";

export default class JobAdvertisementService {
  getAll() {
    return axios.get("jobadvertisements/getall");
  }
  getJobAdvertisementDetails(id) {
    return axios.get(`jobadvertisements/getbyid?id=${id}`);
  }
  postJobAdvertisement(values) {
    return axios.post("jobadvertisements/add", values);
  }
  getNotApprovedOnes() {
    return axios.get("jobadvertisements/getnotapprovedones");
  }
  getApprovedOnes() {
    return axios.get("jobadvertisements/getapprovedones");
  }
  approve(id) {
    return axios.post(`jobadvertisements/approve?jobAdvertisementId=${id}`);
  }
  doNotApprove(id) {
    return axios.post(
      `jobadvertisements/donotapprove?jobAdvertisementId=${id}`
    );
  }
  getFiltered(pageNo = 1, pageSize = 10, cityId = 0, wayOfWorkId = 0) {
    return axios.get(
      `jobadvertisements/getfiltered?cityId=${cityId}&pageNo=${pageNo}&pageSize=${pageSize}&wayOfWorkId=${wayOfWorkId}`
    );
  }
  getFavorites(candidateId) {
    return axios.get(
      `jobadvertisements/getfavorites?candidateId=${candidateId}`
    );
  }
}
