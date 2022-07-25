let paramstrc=" ";
let addedparamCount=0;


{
let parameterBox=document.getElementById('parameterBox');
let requestjsonBox=document.getElementById('requestjsonBox');


// -----------Hide and Manage requestJson /parameter Feilds
parameterBox.style.display='none';
let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
        parameterBox.style.display='none'; 
        requestjsonBox.style.display='block';
        document.getElementById('paramAdd').style.display='none';
    
})

let paramsCustom=document.getElementById('paramsCustom');
paramsCustom.addEventListener('click',()=>{
        requestjsonBox.style.display='none';
        parameterBox.style.display='block';  
        document.getElementById('paramAdd').style.display='block';

    
})
}

// ---------------------------Add parameters by Clicking on (+) and (-) ------------------
let paramaddBtn=document.getElementById('paramaddBtn');
paramaddBtn.addEventListener('click',()=>{
    let paramAdd=document.getElementById('paramAdd');
    paramstrc+=`<div class="row mb-3">
    <label class="col-sm-2 col-form-label" for="parameterKey1">
        Paramter
      </label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterKey${addedparamCount+2}" placeholder="Enter Parameter ${addedparamCount+2} KEY" aria-label="First name">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterValue${addedparamCount+2}" placeholder="Enter Paramter ${addedparamCount+2} VALUE" aria-label="Last name">
    </div>
    <div class="col-md-2">
        <button  class="btn btn-primary paramdeleteBtn">-</button>
     </div>
  </div>`;
  paramAdd.innerHTML=paramstrc;
  addedparamCount++;

  let paramdeleteBtn=document.getElementsByClassName('paramdeleteBtn');
  for(let item of paramdeleteBtn){
      item.classList.remove('btn-primary')
      item.classList.add('btn-danger')
      item.addEventListener('click',(e)=>{
          e.target.parentElement.parentElement.remove();
      })
  }
     


})


// ------------------------------Submit Button-------------------------------
let submitBtn=document.getElementById('submitBtn');
submitBtn.addEventListener('click',()=>{
// -----------Showing please Wait & spinner----------------
document.getElementById('responsePrism').innerHTML=`Please Wait...fetching Data`;
document.getElementById('spinnerFetch').innerHTML=`<div class="spinner-grow text-primary " role="status">
<span class="visually-hidden">Loading...</span>
</div>`;

// ------------------Getting Values & JSON Conversion----------

let urlField=document.getElementById('urlField').value;
// let getRadio=document.getElementById('get');        //Normal from ternory operator
// let postRadio=document.getElementById('post');
// let requestType;
// requestType=(getRadio.checked)?getRadio.value:postRadio.value;
let requestType=document.querySelector("input[name='requestType']:checked").value;
let contentType=document.querySelector("input[name='contentType']:checked").value;
let data;
if(contentType=='ParamsCustom'){
    data={};
    for(let i=0;i<addedparamCount+1;i++){
    if((document.getElementById('parameterKey'+(i+1)))!=null){ 
    let key=document.getElementById('parameterKey'+(i+1)).value;
    let value=document.getElementById('parameterValue'+(i+1)).value;
    data[key]=value;
    }
}
     data=JSON.stringify(data);
}
else{
    data=document.getElementById('requestjsonText').value;
    
}

 
console.log(urlField);
console.log(requestType);
console.log(contentType);
console.log(data);

// -------------------------------Fetching Data------------------------
if(requestType=='GET'){
    fetch(urlField,{
        method:'GET'
    }).then((response)=>{
       return response.text();
    }).then((text)=>{
    //    document.getElementById('responsejsonText').value=text;
       document.getElementById('responsePrism').innerHTML=text;
       document.getElementById('spinnerFetch').style.display='none';
       Prism.highlightAll();


    }).catch(()=>{
        console.log("Your Link might be incorrect");
    })

}
else{
    fetch(urlField,{
        method:'POST',
        headers:{
            'Content-type':'application/json; charset=UTF-8'
        },
        body: data
    }).then((response)=>{
        return response.text();
     }).then((text)=>{
        // document.getElementById('responsejsonText').value=text;
        document.getElementById('responsePrism').innerHTML=text;
        document.getElementById('spinnerFetch').style.display='none';
        Prism.highlightAll();
 
     }).catch(()=>{
         console.log("Your Link might be incorrect");
     })
}



})