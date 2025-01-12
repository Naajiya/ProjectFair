import axios from "axios";

const commonApi=async(httpMethod,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"content-type":"application/json"}
    }

    return await axios(reqConfig).then(res=>{
        return res
    }).catch(er=>{
        return er
    })
}

export default commonApi