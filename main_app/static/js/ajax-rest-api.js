// import axios from "axios"

$(document).ready(function () {
    $('.select2-country').select2();
});
const header = {
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    'x-rapidapi-key': '63ee636e62msh79b74b9ba0f3cc7p13dca5jsn42625ed92d89'
}
$(function (){
    axios.get('https://covid-193.p.rapidapi.com/countries', {
        contentType: "application/json",
        dataType:"json",
        headers: header
    }).then(function(response){
        var countries = response['data']['response'];
        let select_node = document.getElementById('country')
        select_node.innerHTML = '<option value="All">All</option>'
        countries.forEach(function(country){
            select_node.innerHTML = `${select_node.innerHTML}<option value="${country}">${country}</option>`;
        });
    }).catch(function(erreur){
        switch (erreur.response.status) {
            case 400:
                alert('Bad request');
                break;
            case 403:
                alert('forbidden access: '+erreur.response.data.message)
                break;
            default:
                break;
        }
    })
    // $.ajax({
    //     url: 'https://covid-193.p.rapidapi.com/countries',
    //     type:"GET",
    //     headers: header,
    //     contentType: "json",
    //     statusCode: {
    //         200: function (response){
    //             let countries = response['response'];
    //             let select_node = document.getElementById('country')
    //             select_node.innerHTML = '<option value="All">All</option>'
    //             countries.forEach(function(country){
    //                 select_node.innerHTML = `${select_node.innerHTML}<option value="${country}">${country}</option>`;
    //             })
    //         },
    //         404:function (response){
    //             alert("data can not be found");
    //         },
    //         400:function (response){
    //             alert('bad request');
    //         },
    //         403:function(response){
    //             console.log(response)
    //             alert('forbidden access update the api key from RapidApi');
    //         }

    //     }
    // })
    var new_table_header = document.getElementById('table-header-row');
    try{
        axios.get('https://covid-193.p.rapidapi.com/history?country=All', {
            headers: header, 
        }).then(function(response){
            document.getElementById('table-body').innerHTML="<tr><td class='text-center'>No data</td></tr>";
            var first_element = response['data']['response'][0];
            var keys = Object.keys(first_element);
            for (var key in keys){
                new_table_header.innerHTML = new_table_header.innerHTML + "</tr><th>"+keys[key]+"</th>";
            }
        })
    }catch(err){ 
        alert(err.status_code+": "+err.data)
    };
    // $.ajax({
    //     url: 'https://covid-193.p.rapidapi.com/history?country=All',
    //     type:"GET",
    //     headers: header,
    //     success:function(response){
    //         document.getElementById('table-body').innerHTML="<tr><td class='text-center'>No data</td></tr>";
    //         var first_element = response['response'][0];
    //         // console.log(first_element);
    //         var keys = Object.keys(first_element);
    //         for (var key in keys){
    //             new_table_header.innerHTML = new_table_header.innerHTML + "</tr><th>"+keys[key]+"</th>";
    //         }
    //         // console.log(table_header);
    //     }
    // });
    new_table_header.parentNode.replaceChild(new_table_header, document.getElementById('table-header-row'));
})

async function covid_19(){
    let baseUrl = 'https://covid-193.p.rapidapi.com/history';
    let country = document.getElementById('country').value;
    let date = document.getElementById('date').value
    console.log("country = "+country);
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
        headers: header,
        contentType:"application/json",
        success: function(response){
            let _response = response['response'];
            let first_element = _response[0];
            let keys=Object.keys(first_element);
            let body = document.getElementById('table-body');
            body.innerHTML = "";
            // console.log(first_element);
            _response.forEach(obj=>{
                body.innerHTML = body.innerHTML+ "<tr>";
                keys.forEach(key=>{
                    body.innerHTML = body.innerHTML +"<td>"+obj[key]+"</td>";
                });
                body.innerHTML = body.innerHTML+ "</tr>";
            });                
        },
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
function ajax_sum(){
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