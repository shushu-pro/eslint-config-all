// 获取2个年月之间的所有月份
export const getTimeInterval = ([startTime,endTime])=>{
  const list = [];
  const startYear = parseInt(startTime.substring(0,4) , 10 );
  const startMonth = parseInt(startTime.substring(4,6) , 10 );
  const endYear = parseInt(endTime.substring(0,4) , 10 );
  const endMonth = parseInt(endTime.substring(4,6) , 10 );

  if(startYear === endYear){
      for(let i = startMonth ; i<= endMonth ; i++){
          list.push(i)
      }
  }else{
      for(let i = startMonth ; i <= 12 ; i++){
          list.push(i)
      }
      for(let j = 1 ; j<= endMonth ; j++){
          list.push(j)
      }
  }
  return list;
}

