console.log("connected");

const account1={
    owner:"Manali Jain",
    movements:[2200,340,500,-67,-3450,1230],
    interest:1.2,
    pin:1111,
    userName:"MJ"
}
const account2={
    owner:"Kunal Jain",
    movements:[2560,-890,512,678,-345,123],
    interest:1.5,
    pin:2222,
    userName:"KJ"
}
const account3={
    owner:"Aadi Jain",
    movements:[2230,345,-678,-345,673],
    interest:1.3,
    pin:3333,
    userName:"AJ"
}
const account4={
    owner:"Vanshika Jain",
    movements:[8000,3456,-78,345,89123],
    interest:1.2,
    pin:4444,
    userName:"VJ"
}
const account=[account1,account2,account3,account3];



const labelwelcome=document.querySelector('.welcome');
const labelbalance=document.querySelector('.value');
const labelin=document.querySelector('.svaluein');
const labelout=document.querySelector('.svalueout');
const labelinterest=document.querySelector('.svalueinterest');
const labeltimer=document.querySelector('.timer');



const labelapp=document.querySelector(".app");
const labelmovement=document.querySelector(".movement");

const labelbtn=document.querySelector(".btn");
const labeltransfer=document.querySelector(".formbtntranfer");
const labelloan=document.querySelector(".formbtnloan");
const labelclose=document.querySelector(".formbtnclose");

const labelloginuser=document.querySelector(".user");
const labelloginpin=document.querySelector(".pin");
const labeltransferto=document.querySelector(".finputto");
const labeltransferamount=document.querySelector(".finputamount");
const formbtntransfer=document.querySelector('.formbtntransfer');
const labelamountloan=document.querySelector(".finputamountloan");
const labeluser=document.querySelector(".finputuser");
const labelpin=document.querySelector(".finputpin");
const labeldate=document.querySelector(".date");

const dateNow=new Date();
const day=dateNow.getDate();
const month=dateNow.getMonth();
const year=dateNow.getFullYear();

labeldate.textContent=` Date:${day}/${month}/${year}`


const starttimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const seconds = String(time % 60).padStart(2, 0);
        time--;
        labeltimer.textContent = `${min}:${seconds}`;
        if (time === 0) {
            clearInterval(timer); // Use "timer" instead of "time" to clearInterval
            labelwelcome.textContent = "Login to get started";
            labelapp.style.opacity = 0;
        }
    };

    let time = 120;
    tick();
    const timer = setInterval(tick, 1000);
};

starttimer();



const displaymovement=function(movements){
    labelmovement.innerHTML='';
    movements.forEach((mov,i)=>{
        const type=mov>0?'deposit':'withdrawal';
        const html=`<div class="row">
        <div class="type ${type}">${i+1} ${type}</div>
        <div class="mvalue">${mov}</div>
    </div>`;
      
  labelmovement.insertAdjacentHTML('afterbegin',html);

    })
}
const displaybalance=function(acc){
    acc.balance=acc.movements.reduce(function(ac,mov){
        return ac+mov;
    },0);
    labelbalance.textContent=`Balance :${acc.balance} $`;
}


const displaysummary=function(acc){
    let inbalance =acc.movements
    .filter(mov=> mov>0)
    .reduce((ac,mov)=>ac+mov,0);
    labelin.textContent=`${inbalance}$`;

    const outbalance=acc.movements
    .filter(mov=>mov<0)
    .reduce((ac,mov)=>Math.abs(ac+mov),0);
    labelout.textContent=`${outbalance}$`;

    const interest=acc.movements
    .filter(mov=>mov>0)
    .map(deposit=>(deposit*1.2)/100)
    .filter((int,i)=>{
        return int>1
    })
    .reduce((acc,int)=>acc+int,0);

    labelinterest.textContent=`${interest.toFixed(2)}$`;
    
}

const updateaccount=function(acc){
    displaymovement(currentAccount.movements);
        displaybalance(currentAccount);
        displaysummary(currentAccount);
}

let currentAccount;

labelbtn.addEventListener("click",function(e){
    e.preventDefault();
    console.log("clicked");

    currentAccount=account.find(acc=>acc.userName===labelloginuser.value);
    console.log(currentAccount);

    if(currentAccount?.pin===Number(labelloginpin.value)){
        labelwelcome.textContent=`Welcome back ${currentAccount.owner.split(' ')[0]}`;
        labelapp.style.opacity=100;

        displaymovement(currentAccount.movements);
        displaybalance(currentAccount);
        displaysummary(currentAccount);

    }
    labelloginuser.value=labelloginpin.value='';
})
formbtntransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount=labeltransferamount.value;
    const recevierAccount=account.find(acc=>acc.userName===labeltransferto.value);
    labeltransferto.value=labeltransferamount.value="";


    if(amount>0 &&recevierAccount
        &&currentAccount.balance>amount
        &&recevierAccount.userName!=currentAccount.userName){
        currentAccount.movements.push(-amount);
        recevierAccount.movements.push(amount);
        updateaccount(currentAccount);

    }

})

labelclose.addEventListener('click',function(e){
 e.preventDefault();
 console.log("closed");

 if(labeluser.value===currentAccount.userName && Number(labelpin.value)===currentAccount.pin){
    const index=account.findIndex(acc=>acc.userName===currentAccount.userName);
    account.splice(index,1);
    labelapp.style.opacity=0;
    labelwelcome.textContent="Login to get started";
 }
 labeluser.value=labelpin.value="";
})

labelloan.addEventListener('click',function(e){
    e.preventDefault();
    console.log("loan requested");
    const amount=Number(labelamountloan.value);
    if(amount>0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){
        currentAccount.movements.push(amount);
        updateaccount(currentAccount);
    }
    labelamountloan.value;
})