// (function(){

// var craouselcontent = document.querySelector('#craouselcontent');
// var craouselleftbtn = document.querySelector('#craouselleftbtn');
// var craouselrightbtn = document.querySelector('#craouselrightbtn');
   

// var carouselLeftValue = 0;
// var WidthToMove = 180 + 16 + 180 + 16 + 180 + 16+ 180 + 16;
// var TotalWidth = craouselcontent.getBoundingClientRect().width;
// var arrowbtnWidth = 50;
// var nOofSlides = TotalWidth/WidthToMove;
// var curr = 1;






// craouselleftbtn.addEventListener('click', moveCarouselRight);
// craouselrightbtn.addEventListener('click', moveCarouselLeft);

// manageBtn();

// function moveCarouselLeft()
// {
//     if(curr ==1){
//     carouselLeftValue -= WidthToMove - arrowbtnWidth;}
//     else{
//     carouselLeftValue -= WidthToMove;}


//     curr++;
//     manageBtn();

//     craouselcontent.style.left = `${carouselLeftValue}px`;

// }
// function moveCarouselRight()
// {
//     if(curr ==2){
//     carouselLeftValue = 8;}
//     else{
//     carouselLeftValue += WidthToMove;}


//     curr--;
//     manageBtn();

//     craouselcontent.style.left = `${carouselLeftValue}px`;

// }
//  function manageBtn()
//  {
//     console.log(`its working`);

//     if(curr == nOofSlides-1){
//         craouselrightbtn.classList.remove("show");}
//     else
//        {craouselrightbtn.classList.add("show");}


//     if(curr == 1)
//       {craouselleftbtn.classList.remove("show");}
//     else
//       { craouselleftbtn.classList.add("show");}

//  }


// })
filterOfObjects("all");
function filterOfObjects(c)
{
  console.log("Its working");
   var x,i;
    x = document.getElementsByClassName("box1");
    if(c=="all") c=" ";
    for(i=0;i<x.length;i++)
    {
       removeClass(x[i],"show");
       
        if(x[i].className.indexOf(c)>-1) addClass(x[i],"show");
        
    }

}
 

function removeClass(element , name)
{
 var i , arr1,arr2;

 arr1 = element.className.split(" ");
 arr2 = name.split(" ");
for(i=0;i<arr2.length;i++)
{
   while(arr1.indexOf(arr2[i]) > -1){

    arr1.splice(arr1.indexOf(arr2[i]),1);
   }

}
element.className = arr1.join(" ");

}
function addClass(element , name)
{
  var i , arr1,arr2;
  arr1 = element.className.split(" ");
 arr2 = name.split(" ");
 for(i=0;i<arr2.length;i++)
{
   if(arr1.indexOf(arr2[i]) == -1){

    element.className += " " + arr2[i];
   }

}

}

