let myLeads =[]
const inputEl =document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
let inputBtn =  document.getElementById("input-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
const deletebtn=document.getElementById("delete-btn")
let tabBtn=document.getElementById("tab-btn")

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)

}
const tabs=[
    {url: "https://www.linkedin.com/in/per-harald-borgen"}
]
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({
        active: true,
        currentWindow: true
        }, function(tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads",JSON.stringify(myLeads))
            render(myLeads)
         })
    
})
deletebtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
inputEl.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
      inputBtn.click()
        
    }
})
inputBtn.addEventListener("click", function(){
    if(inputEl.value!=""){  
    myLeads.push(inputEl.value) 
   
    render(myLeads)
   
    }
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
   })
function render(leads){
    let listitems=""
    
   for(let i=0;i<leads.length;i++){
   // listitems += "<li><a target='_blank' href='"+ myLeads[i] +"'>" + myLeads[i] + "</a></li>"
   listitems += `<li>
                <a target="_blank" href=${leads[i]}>
                ${leads[i]}
                </a>
                </li>`
}
ulEl.innerHTML=listitems
    }
