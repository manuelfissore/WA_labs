"use strinct mode"

const oneMonthAgo= new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);
console.log(oneMonthAgo);


function createFilm(ID, Title, isFavorite=False, Date, Rating){
    const film = {
        ID: ID,
        Title:Title,
        isFavorite:isFavorite,
        Date:Date,
        Rating: Rating
        }
    return film;

}

const films= [{
    ID:1, 
    Title: "Pulp Fiction",
    isFavorite: true, 
    Date: dayjs('2023-03-07'),
    Rating: 4},
        {
    ID:2, 
    Title: "21 Grams",
    isFavorite: true, 
    Date: dayjs('2022-09-22'),
    Rating: 5},
        {
    ID: 3,
    Title:"Star Wars",
    isFavorite:false,
    Date: undefined,
    Rating: 3}
    ];


    var tmp=[...films];
    let j=0;
    

    function createFilmElement(film) {

        const newTd1 = document.createElement("td");
       
        const newContentText= document.createTextNode(film.Title);
        newTd1.appendChild(newContentText);

        const newTd2 = document.createElement("td");
        const newCheckbox = document.createElement("INPUT");
        newCheckbox.setAttribute("type", "checkbox");
        newCheckbox.setAttribute("id", "fav");
        if(film.isFavorite)
            newCheckbox.checked=true;
        newTd2.appendChild(newCheckbox);

        const newTd3 = document.createElement("td");
        if(typeof film.Date === 'undefined')
            newContentDate = document.createTextNode(film.Date)
        else
            var newContentDate = document.createTextNode(film.Date.format('DD/MM/YYYY'));

        newTd3.appendChild(newContentDate);

        const newTd4 = document.createElement("td");
        var rating='';
       
        for(i=0; i<film.Rating; i++){
            rating+='<span class="fa fa-star checked"></span>'
        }
        newTd4.innerHTML=rating;

        const newTd5 = document.createElement("td");
        const newCheckboxDelete = document.createElement("INPUT");
        newCheckboxDelete.setAttribute("type", "checkbox");
        let id_string="lineToHide"+j;
        j++;
        newCheckboxDelete.setAttribute("id", id_string);
        newTd5.appendChild(newCheckboxDelete);
        const newTr = document.createElement("tr");
        newTr.appendChild(newTd1);
        newTr.appendChild(newTd2);
        newTr.appendChild(newTd3);
        newTr.appendChild(newTd4);
        newTr.appendChild(newTd5);
        
        return newTr;
    }

    window.addEventListener('DOMContentLoaded', event => {
        j=0, k=0;
        const tableBody = document.querySelector('tbody');
        
        
        for (let film of films) {
            const newRow = createFilmElement(film);
            tableBody.appendChild(newRow);
        }
        tableBody.setAttribute("id", "Table"); 
        let idString;
        
        for(k=0;k<j;k++){
            idString="lineToHide"+k;
            document.getElementById(idString).style.display = 'none'; 
        }
        
            
        //const rows = document.querySelectorAll('tbody tr');
    
    });

    var all=1;
    var seen=0;
    var Best=0;
    var fav=0;

    function showByFilters(){
        tmp=films;
        const tableBody = document.querySelector('tbody');
        delete_Table();

        if(all){
            for (let film of films) {
                const newRow = createFilmElement(film);
                tableBody.appendChild(newRow);
            }
        }
        else{
            if(fav)
               tmp=tmp.filter((t)=>{return t.isFavorite==true});
            if(seen)
                tmp=tmp.filter((t)=>{return t.Date>oneMonthAgo});
            if (Best)
                tmp=tmp.filter((t)=>{return t.Rating==5});

            for (let film of tmp) {
                const newRow = createFilmElement(film);
                tableBody.appendChild(newRow);
            }
            for(k=0;k<j;k++){
                idString="lineToHide"+k;
                document.getElementById(idString).style.display = 'none'; 
            }
        }
        tableBody.setAttribute("id", "Table");  
    }

    function allSelected(){
        document.getElementById("all").checked=true;
        document.getElementById("Seen").checked=false;
        document.getElementById("Best").checked=false;
        document.getElementById("Fav").checked=false;

        all=1;
        showByFilters();
    };

    document.getElementById("Fav").addEventListener('click', event => {
        if( document.getElementById("Fav").checked==true){
            all=0;
            fav=1;
            document.getElementById("all").checked=false;
        }
        else{
            fav=0;
            if(!Best && !seen){
                all==1;
                document.getElementById("all").checked=true;
            }

        }
            showByFilters();
    });


    document.getElementById("Seen").addEventListener('click', event => {
        if( document.getElementById("Seen").checked==true){
            all=0;
            seen=1;
            document.getElementById("all").checked=false;
        }
        else{
            seen=0;
            if(!Best && !fav){
                all==1;
                document.getElementById("all").checked=true;
            }
            
        }
       
        showByFilters();
    });

    document.getElementById("Best").addEventListener('click', event => {

        if( document.getElementById("Best").checked==true){ 
            all=0;
            Best=1;
            document.getElementById("all").checked=false;
        
        }
        else{
            Best=0;
            if(!fav && !seen){
                all==1;
                document.getElementById("all").checked=true;
            }
            
        }

        showByFilters();
    });

    function delete_Table(){
        var table = document.getElementById("Table");
        
        while(table.rows.length>0){
           table.deleteRow(0);
        }
        j=0;
     }
    var first=1;
    function deleteFilm(){  
        if(first){
            for(k=0;k<j;k++){
                idString="lineToHide"+k;
                document.getElementById(idString).style.display = 'block'; 
            }
            first=!first;
        }
        else{
            for(k=0;k<j;k++){
                idString="lineToHide"+k;
                console.log(document.getElementById(idString).checked);
                if (document.getElementById(idString).checked==true){
                    films.splice(k,1);
                }
            }
            showByFilters()
        }
     }