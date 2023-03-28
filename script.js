let elForm = select ("#form")
let selectName = select("#selectId")
let elList = select("#list")
let createTemp = select("#tempLi").content
let modalTemplate = select("#modalTemp").content

elForm.addEventListener("submit", evt =>{
  evt.preventDefault()
  let{searchInp,selectName,sortName} = evt.target.elements
  
  let search = new RegExp(searchInp.value.trim(),"gi")
  let result = films.filter((item) =>item.Title.match(search))
  
  if(selectName.value != "All"){
    let filterInp = result.filter((film) => film.genres.includes(selectName.value))
    result = filterInp
  }
  
  if( sortName == "a-z"){
    result.sort((a,b) =>{
      if(a.Title > b.Title){
        return 1
      }
      else if(a.Title > b.Title){
        return -1
      }
      else {
        
        return 0
      }
    } )
  }
  else if (sortName == "z-a"){
    result.sort((a,b) =>{
      if(b.Title > a.Title){
        return 1
      }
      else if(b.Title > a.Title){
        return -1
      }
      else {
        
        return 0
      }
    } )
  }
  renderFunc(result,elList)
  console.log(result);
  console.log(searchInp.value,selectName.value,sortName.value);
})

function renderGenre (array,element){
  let genreArr = []
  array.forEach(film => {
    film.genres.forEach(genre =>{
      !genreArr.includes(genre) ? genreArr.push(genre) : null
    })
  });
  
  genreArr.forEach(genre=> {
    let newOption = create("option")
    newOption.textContent = genre;
    newOption.value = genre;
    element.append(newOption)
  })
}
renderGenre (films,selectName)

function renderFunc(array,element){
  element.innerHTML = null;
  array.forEach(film =>{
    let template = createTemp.cloneNode(true)
    
    let li = select("li",template)
    let img = select("img",template)
    let h2 = select("h2",template)
    let p = select("p",template)
    let btn = select("button",template)
    
    console.log(li,img,h2, p,btn);
    img.src = film.Poster;
    h2.textContent = film.Title;
    p.textContent = film.Year;
    btn.dataset.id = film.id;
    
    btn.addEventListener("click",evt =>{
      let filmId = evt.target.dataset.id
      let cloneTemp = modalTemplate.cloneNode(true)
      // console.log(cloneTemp);
      let cloneFilm =array.find((item) => item.id== filmId)
      // console.log(cloneFilm);
      
      let tempModal = select("#modal",cloneTemp)
      let iframe = select("iframe",cloneTemp)
      let h2 = select("h2",cloneTemp)
      let h3 = select("h3",cloneTemp)
      let p = select("p",cloneTemp)
      
      iframe.src = cloneFilm.link
      // console.log( iframe.src);
      h2.textContent = cloneFilm.Title
      h3.textContent = `Genres : ${cloneFilm.genres.join(",  ")}`
      p.textContent = cloneFilm.overview
      document.querySelector("body").append(tempModal)
    })
    
    
    element.append(li)
    console.log();
  })
}
renderFunc(films,elList)

function delBtn(){
  const modalTempa  = document.getElementById("modal");
  modalTempa.remove();
}