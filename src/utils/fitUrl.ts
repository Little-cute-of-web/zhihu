import { ColumnProps} from "@/store";

export function generateFitUrl(column:ColumnProps,width:number,height:number,format=['m_pad']){
// if(data&&data.url){
//   const formatStr = format.reduce((prev,current)=>{
//     return current + ',' + prev
//   },'')
//   data.fitUrl = data.url+`?x-oss-process-image/resize,${formatStr}h_${height},w_${width}`
// }
if(column.avatar){
  const formatStr = format.reduce((prev,current)=>{
        return current + ',' + prev
      },'')
  column.avatar.fitUrl = column.avatar.url +`?x-oss-process-image/resize,${formatStr}h_${height},w_${width}`
}else{
  column.avatar = {
    fitUrl:require('@/assets/column.jpg')
  }
}
}