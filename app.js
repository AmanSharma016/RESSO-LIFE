let priceRange = document.querySelector('#extra');
    const priceOutput = document.querySelector('output[for="extra"]');

    priceRange.addEventListener('input', () => {
      priceOutput.textContent = priceRange.value;
});

// search destination
let form=document.querySelector("form");
form.addEventListener("submit",function(event){
  // event.preventDefault();
  let des=document.querySelector("#destination");
  console.log(des.value);
  if(des=='agra'){
    window.location.href = './login.html';
  }
})