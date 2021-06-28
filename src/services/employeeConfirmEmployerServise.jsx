import axios from 'axios'

export default class EmployeeConfirmEmployerService{
    approve(employerId,employeeId){
        return axios.post(`employeeconfirm/approve?employerId=${employerId}&employeeId=${employeeId}`)
    }
    doNotApprove(employerId){
        return axios.post(`employeeconfirm/donotapprove?employerId=${employerId}`)
    }
    implementUpdate(employerId){
        return axios.post(`employeeconfirm/implementupdate?employerId=${employerId}`)
    }
    doNotImplementUpdate(employerId){
        return axios.post(`employeeconfirm/donotimplementupdate?employerId=${employerId}`)
    }
}