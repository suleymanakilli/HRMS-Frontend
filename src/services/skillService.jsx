import axios from 'axios'
export default class SkillService{
    deleteBySkillNameAndResumeId(skillName,resumeId){
        return axios.post(`skills/deletebyskillnameandresmueid?resumeId=${resumeId}&skillName=${skillName}`)
    }

    add(values){
        return axios.post("skills/add",values)
    }
    getAll(){
        return axios.get("skills/getall")
    }
}