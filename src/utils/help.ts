//检查文件类型
interface CheckFunction {
  //格式
  format?: string[];
  size?: number;
}
type ErrorType = 'size' | 'format' | null;
export function beforeUploadCheck(file: File, condition: CheckFunction) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? (file.size / 1024 / 1024 < size) : true;
  //如果有错误
  let error: ErrorType = null;
  if (!isValidFormat) {
    error = 'format'
  }
  if (!isValidSize) {
    error = 'size'
  }
  return {
    passed:isValidFormat&&isValidSize,
    error
  }
}