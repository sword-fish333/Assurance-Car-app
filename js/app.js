//variable
const form=document.getElementById('request-quote');
let html=new HTMLUI();

//event listeners
EventListeners();

function EventListeners(){
document.addEventListener('DOMContentLoaded',function(){


    html.displayYear();
    });
        form.addEventListener('submit',formSubmit);
}

function formSubmit(e){
    e.preventDefault();
        const make=document.getElementById('make').value;
        const year=document.getElementById('year').value;

        //check the value of the radio button
        const level=document.querySelector('input[name="level"]:checked').value;

        if(make==='' || year==='' || level===''){
           html.printError('All the fields are mandatory!');
        }else{

            //clear the previous quotes
            const prevQuote=document.querySelector('#result div');
            if (prevQuote !=null){
                prevQuote.remove();
            }
            const insurance=new Insurance(make,year,level);
            const price=insurance.calculateQuatation(insurance);
            
            //print the result with HTMLUI
            html.showResults(price,insurance);
        }
}


//objects


//Insurance Obj
function Insurance(make,year,level){
    this.make=make;
    this.year=year;
    this.level=level;
}
//Insurance prototype method
Insurance.prototype.calculateQuatation=function(insurance){
  //  console.log(insurance);
  let price;
  const base=2000;
  const make=insurance.make;
   /*
    1-American 15%
    2-Asian 05%
    3-European 35%
    */

    switch(make){
        case '1':
                  price=base*1.15;
                 break;
        case '2':
                price=base*1.05;
                break;
        case '3':
                price=base*1.35;
                break;

    }
        
    //get selected year
    const year=insurance.year;
    const difference=insurance.getYearDifference(year); 
    

    //each year the price of the insurance is going to be 3% less
    price=price-((difference*3)*price)/100;
    

    //level of protection
    const level=insurance.level;

    price=this.calculateLevel(price,level);
 
        return price;
}

Insurance.prototype.getYearDifference=function(year){
    return new Date().getFullYear()-year;
}

    Insurance.prototype.calculateLevel=function(price,level){
           /*
            Basic insurance will increase the price by 30%
              Complet insurance will increase the price by 50%
          */
            if(level==='basic'){
                price*=1.30;
            }else{
                price*=1.50;
            }
            return price;
    }

//evrything related to html
function HTMLUI(){}

HTMLUI.prototype.displayYear=function(){
    //max & minimum years
    const max=new Date().getFullYear();
        min=max-20;

        //generate the list with the last 20 years
        const years=document.getElementById('year');

        for(let i=max;i>=min;i--){
            const option=document.createElement('option');
            option.value=i;
        option.innerText=i;
        years.appendChild(option);
        }
}



HTMLUI.prototype.printError=function(message){
    const div=document.createElement('div');

    div.className='error';
    div.innerHTML=`<p>${message}</p>`;

    form.insertBefore(div,document.querySelector('.form-group'));
    setTimeout(function(){
            div.remove();
    },4500)
}

//print result method
HTMLUI.prototype.showResults=function(price,insurance){
    const result=document.getElementById('result');
    let div=document.createElement('div');
    let make=insurance.make;
    
    switch(make){
        case '1':
        make='American';
        break;
        case '2':
        make='Asian';
        break;
        case '3':
        make='European';
        break;
    }
    div.innerHTML=`
    <p class="header">Summary</p>
    <p>Make: ${make}</p>
    <p>Year: ${insurance.year}</p>
    <p>Level: ${insurance.level}</p>

    <p class='total'>Total:$ ${price}</p>`;
const spinner=document.querySelector("#loading img");

spinner.style.display='block';

setTimeout(function(){
    spinner.style.display='none';
    result.appendChild(div);
},3500)

   
}