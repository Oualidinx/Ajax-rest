$(document).ready(function () {
    $('.select2-country').select2();
});
console.log("country");
$(function (){
    $.ajax({
        url: 'https://covid-193.p.rapidapi.com/countries',
        type:"GET",
        headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': '63ee636e62msh79b74b9ba0f3cc7p13dca5jsn42625ed92d89'
        },
        contentType: "json",
        statusCode: {
            200: function (response){
                let countries = response['response'];
                let select_node = document.getElementById('country')
                select_node.innerHTML = '<option value="All">All</option>'
                countries.forEach(function(country){
                    select_node.innerHTML = `${select_node.innerHTML}<option value="${country}">${country}</option>`;
                })
            },
            404:function (response){
                alert("data can not be found");
            },
            400:function (response){
                alert('bad request');
            }
        }
    })
    var new_table_header = document.getElementById('table-header-row');
    
    $.ajax({
        url: 'https://covid-193.p.rapidapi.com/history?country=All',
        type:"GET",
        headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': '63ee636e62msh79b74b9ba0f3cc7p13dca5jsn42625ed92d89'
        },
        success:function(response){
            var first_element = response['response'][0];
            console.log(first_element);
            var keys = Object.keys(first_element);
            for (var key in keys){
                
                new_table_header.innerHTML = new_table_header.innerHTML + "</tr><th>"+keys[key]+"</th>";
            }
            // console.log(table_header);
        }
    });
    console.log(new_table_header);
    new_table_header.parentNode.replaceChild(new_table_header, document.getElementById('table-header-row'));
    
})

function covid_19(){
    let baseUrl = 'https://covid-193.p.rapidapi.com/history';
    let country = document.getElementById('country').value;
    let date = document.getElementById('date').value
    if (country !==null) {
        baseUrl = baseUrl +"?country="+country;
    }
    if (date !== ''){
        baseUrl = baseUrl + "?date="+date;
    }
    $.ajax({
        url: baseUrl,
        type:"GET",
        dataType: "json",
        headers: {
            'x-rapidapi-host': 'covid-193.p.rapidapi.com',
            'x-rapidapi-key': '63ee636e62msh79b74b9ba0f3cc7p13dca5jsn42625ed92d89'
        },
        contentType:"application/json",
        
        statusCode:{
            400:function(response){
                alert('bad request');
            },
            404:function (response){
                alert('introuvable');
            }
        }
    })

}
function send_data(){
    var baseUrl="http://192.168.1.123:5555/"
    $.ajax({
        url: baseUrl+"sum/add",
        type:"POST",
        data:JSON.stringify({
            "a":parseFloat(document.getElementById("a").value),
            "b":parseFloat(document.getElementById("b").value)
        }),
        contentType:"application/json",
        dataType: "json",
        statusCode:{
            400:function (response) {
                alert("400:"+ response['responseText'])
            },
            404:function (response){
                alert("404: "+ response['responseText'])
            }
        }
    }).done(function(response){
        document.getElementById('a').value = response['a'];
        document.getElementById('b').value = response['b'];
        document.getElementById('result').value =response['result'];
    });
}