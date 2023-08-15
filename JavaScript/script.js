// creating hamburger menu

let menusList = document.querySelector("#header");

let mobileHamClose = document.querySelector("#mobile-hamburger-close");

mobileHamClose.addEventListener('click', function()
{
  menusList.classList.toggle("active");
  console.log("toggled");
});

// Making website smooth scrolling

let navigationBarMenus = document.querySelectorAll("#navigation-bar a"); //fetching values of menus from navigation bar through css.

//Applying smooth scrolling in each of the menus of the nav bar.
for(let menus of navigationBarMenus)
{
  menus.addEventListener('click', function(event)
  {
    event.preventDefault(); // function that prevents default event while clicking.

    // option 1 to get ids.
    /*
    let getId = menus.textContent.toLowerCase(); //Id of the desired input and content is same so getting content.
    */
   //option 2 to get ids

   let getId = menus.getAttribute("href").substring(1).toLowerCase();

    let desiredSectionName = document.getElementById(getId);

    let animation = setInterval(function()
    {
      let desiredSectionPoint = desiredSectionName.getBoundingClientRect(); // method that gives the coordinates to the desired section by id. We need to write this line here because everytime setInterval() function runs it needs different value from the top because it would already have been scrolled.

      if(desiredSectionPoint.top <= 0 || window.innerHeight+10 >= desiredSectionPoint.bottom)
      {
        clearInterval(animation);
        return;
      }
      
      console.log(desiredSectionName+ "  Window height +  : "+ window.innerHeight+ " :   Top of element" +desiredSectionPoint.top +"+ : Bottom : "+ desiredSectionPoint.bottom)
      window.scrollBy(0, 50);
    }, 30);
  });
}

// Animatinig skills section

let skillsBar = document.querySelectorAll("#my-skills-percentage div div");

function clearPercentage()
{
  for(let skills of skillsBar)
  {
    skills.style.width = 0;
  }
}

clearPercentage();


function distanceFromTop(divBar)
{
  return divBar.getBoundingClientRect().top;
}
function getBarPercentage(element)
{
  return element.getAttribute("data");
}
let animationDone = false;
function fillBars()
{
  for(let skills of skillsBar)
  {
    if(skills.getAttribute("data-visited") === "false" && distanceFromTop(skills) <= window.innerHeight)
    {
      let tempWidth = 0;
      let progressAnimation = setInterval(function()
      {
          if(tempWidth >= getBarPercentage(skills))
          {
            skills.setAttribute("data-visited", "true");
            clearInterval(progressAnimation);
            return;
          }
          else
          {
            skills.style.width = ++tempWidth + "%";
          }
      }, 5); 
    }
    else if(distanceFromTop(skills) > window.innerHeight)
    {
      skills.setAttribute("data-visited", "false");
    }
  }
}
window.addEventListener('scroll', fillBars);