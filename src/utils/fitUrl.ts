import { ColumnProps,ImageProps,UserProps} from "@/store";

export function generateFitUrl(data:ImageProps,width:number,height:number,format=['m_pad']){
// if(data&&data.url){
//   const formatStr = format.reduce((prev,current)=>{
//     return current + ',' + prev
//   },'')
//   data.fitUrl = data.url+`?x-oss-process-image/resize,${formatStr}h_${height},w_${width}`
// }
if(data.url){
  const formatStr = format.reduce((prev,current)=>{
        return current + ',' + prev
      },'')
      data.fitUrl = data.url +`?x-oss-process-image/resize,${formatStr}h_${height},w_${width}`
}
}

export function addColumnAvatar(data:ColumnProps| UserProps,width:number,height:number){
  if(data.avatar){
    generateFitUrl(data.avatar,width,height)
  }else{
    const parseCol = data as ColumnProps
    data.avatar = {
      fitUrl:require(parseCol.title?'@/assets/column.jpg':'@/assets/avatar.jpg')
    }
  }
}