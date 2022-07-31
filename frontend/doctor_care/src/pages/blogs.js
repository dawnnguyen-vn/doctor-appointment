import React from "react";

export const BlogsPage = () => {
  let result = "";
  
  const decToBin =(n) =>{
    if(n===0){
      console.log(result);
      return n;
    }
    result+=n%2;
    return decToBin(Math.floor(n/2));
  }

  const reverse = (n) =>{
    if(n===0){
      console.log(result);
      return ;
    }
    result+= n%10;
    return reverse(Math.floor(n/10));
  }

  return (
    <div className="">
      {/* {decToBin(5)} */}
      <h3>
        {reverse(300)}
        {result}
      </h3>
    </div>
  )
}
