import BdUk from '../models/bdinfo'
import Mock from '../models/mock'

class UserAPI{
  static async userinfo(name, pwd) {
    let rlt = 3
    const user = Mock.finduserbyname(name)
    if(user != null){
      rlt = user.passwd === pwd ? 0 : 2
    }
    return rlt
  }
  static async useradd(name, pwd) {
    let rlt = 4
    const user = Mock.finduserbyname(name)
    if(user === null){
      rlt = Mock.adduser(name, pwd)
    }
    return rlt
  }
  static async bind(name, ukinfo) {
    let rlt = 5
    if(!Mock.finduk(ukinfo.uk)) {
      Mock.addyk(ukinfo.uk, ukinfo.cookie)
      Mock.useradduk(name, ukinfo.uk)
      rlt = ukinfo.uk
    }
    return rlt
  }
  static async ukinuser(name, uk) {
    let rlt = 0
    const user = Mock.finduserbyname(name)
    rlt = user.uks.map(u=>u === uk)
    return rlt>0
  }
  static async ukinfos(name) {
    let rlt = []
    const user = Mock.finduserbyname(name)
    rlt = user.uks.map(uk=>{ return { Uk: uk }} )
    return rlt
  }
}

export default UserAPI;
