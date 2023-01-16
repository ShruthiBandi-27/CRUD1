
const base = "https://www.anapioficeandfire.com/";

let allDetails = [];

let search = document.getElementById("search");
search.addEventListener("keyup",(event) => {
    if(allDetails.length === 0) getDetails();
    const filterData = allDetails.filter((x) => {
        let filteredValue = x.name.toLowerCase().includes(event.target.value.trim().toLowerCase())
                            || (new Date(x.released).toLocaleDateString()).toLowerCase().includes(event.target.value.trim().toLowerCase())
        return filteredValue;
    } )

    populateDetails(filterData);
})

//function to get details
const getDetails = async () => {
    try{
    const response = await fetch(`${base}/api/books`);
    //console.log(await response.json());
    const result = await response.json();
    allDetails = [];
    allDetails = [...result]
    populateDetails(allDetails);
    }
    catch (err){
        console.log(err);
    }
}

//to populate date in table
const populateDetails = (data) => {
    //console.log(data);
    let tableRow = "";
    data.map((x,index) => {
        tableRow += `<tr id="${index}">
        <td scope="row">${x.name}</td>
        <td>${x.authors}</td>
        <td>${x.country}</td>
        <td>${new Date(x.released).toLocaleDateString()}</td>
        <td><button type="button" class="btn btn-danger btn-sm" onclick="deleteRecord(${index}, '${x.name}')">Delete</button></td>
      </tr>`
    })
    //console.log(tableRow);

    let tbody = document.getElementById("tableBody");
    tbody.innerHTML = tableRow;
}

getDetails();

//to delete record from table
const deleteRecord = async (id, name)=> {
    if(confirm(`Do you want to delete record of ${name}`)){
        document.getElementById(id).remove();
        
    }
}
