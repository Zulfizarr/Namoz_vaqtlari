let template=document.querySelector("template").content
let hero_times=document.querySelector(".hero_times")
let error_template=document.querySelector(".error_template").content
let form=document.querySelector("form")
let region=document.querySelector(".region")
const GetApi=(region)=>{
return`https://islomapi.uz/api/present/day?region=${region}`
}
const handleError=(text_error,params)=>{
hero_times.innerHTML=null
let clone=error_template.cloneNode(true)
let text=clone.querySelector("h1")
text.textContent=text_error
region.textContent=params==="Not_found"?"Noto'g'ri joylashuv kiritdingiz    ":"Iltimos Internetingizni yoqing"
region.classList.add("text-danger")
hero_times.appendChild(clone)
}
const getRenderRegion=(arr)=>{
if( arr?.length){
    let fragment=document.createDocumentFragment()
 for(let i=0; i<arr.length;i++){
    hero_times.innerHTML=null
    if(region.getAttribute("class").includes("text-danger")){
        region.classList.remove("text-danger")
        region.classList.add("text-light")
        region.textContent=arr[i].region
    }else{
        region.textContent=arr[i].region
    }
  
    
let clone=template.cloneNode(true)
let quyosh_chiqish_vaqti=clone.querySelector(".quyosh_chiqish_vaqti")
quyosh_chiqish_vaqti.textContent=arr[i]?.times?.quyosh
let bomdod_time=clone.querySelector(".bomdod_time")
bomdod_time.textContent=arr[i]?.times?.tong_saharlik
let peshin_time=clone.querySelector(".peshin_time")
peshin_time.textContent=arr[i]?.times?.peshin
let asr_time=clone.querySelector(".asr_time")
asr_time.textContent=arr[i]?.times?.asr
let shom_time=clone.querySelector(".shom_time")
shom_time.textContent=arr[i]?.times?.shom_iftor
let xufton_time=clone.querySelector(".xufton_time")
xufton_time.textContent=arr[i]?.times?.hufton
fragment.appendChild(clone)


 }
 hero_times.appendChild(fragment)
    }
}
const getDefaultRegion=()=>{
axios.get(GetApi("Samarqand")).then(response=>getRenderRegion([response.data])).catch(error=>{
    if(error){
        handleError("Internet mavjud emas","Net_internet")
    }
})

}
getDefaultRegion()
const handleSub=(event)=>{
    event.preventDefault()
    let data=new FormData(event.target)
    if(data.get("region_value").length>1){
        axios.get(GetApi(data.get("region_value"))).then(response=>getRenderRegion([response.data])).catch(error=>{
            if(error){
                handleError("Bunday Region Mavjud emas","Not_found")
            }
        })
    }else{
        getDefaultRegion()
    }

}
form.addEventListener("submit",handleSub)
