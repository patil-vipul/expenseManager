let mainData = null;
let newBalance = 0;
let unsavedData = new Object;
let original_length = null;
let current_length = null;
$(document).ready(function () {
    console.log("ready!");
    showData()

    $('#openModal').click(function () {
        console.log("opening modal")
        $('#mymodal').modal({
            show: true,
            closeOnEscape: true
        });
    });
    $("#newExpense").click(() => {
        console.log("Expense Clicked")
        $("#newEntryWrapper").css("display", "flex")
    })
    $("#cancelEntry").click(() => {
        $("#newEntryWrapper").css("display", "none")
    })
    $("#addEntry").click(() => {
        console.log("Adding Entry")
        let entry = {
            "type": $("#entryType").val(),
            "amount": parseInt($("#entryAmount").val()),
            "particulars": $("#entryParticulars").val(),
            "timestamp": 124231
        }
        if($("#entryType").val() == "expense")
            newBalance - parseInt($("#entryAmount").val());
        else newBalance + parseInt($("#entryAmount").val());
        // console.log(entry)
        current_length++;
        unsavedData[current_length.toString()] = entry;
        // console.log(entry);
        //console.log(unsavedData)
        $('#newRecordModal').modal('hide')
        showNewData(unsavedData)
    })

    $("#saveData").click(() => {
        let newObject = new Object;
        Object.assign(newObject, mainData, unsavedData);
        console.log(newObject)
        $.ajax({
            url: "agent.php",
            type: "POST",
            data: { action: "setData", data: newObject },
            context: document.body
        }).done(function (jsonData) {
            console.log(jsonData)
            $("#saveData").prop('disabled', true);
            $("#newDataDiv").html('')
            showData()
        });
    })

    $("#newCredit").click(() => {
        console.log("Credit Clicked")
    })
});

function showData() {
    $.ajax({
        url: "agent.php",
        type: "POST",
        data: "action=getData",
        context: document.body
    }).done(function (jsonData) {
        let objData = JSON.parse(jsonData);
        mainData = objData;
        original_length = Object.keys(objData).length;
        current_length = original_length;
        console.log(original_length)
        let markup = ``;
        let tStart = `<table class='table table-striped table-dark'>
        <thead class='thead-dark'> 
        <tr> 
        <th scope="col">Sr.No</th> 
        <th scope="col">Type</th> 
        <th scope="col">Amount</th> 
        <th scope="col">Particulars</th>
        </tr>  
        </thead> 
        <tbody>`;
        let tEnd = " </tbody> </table>";

        for (let [key, value] of Object.entries(objData)) {
            if(key == "user"){
                console.log("user found")
                $("#userBalance").html(mainData["user"].balance);
                continue;
            }
            markup += `<tr> 
            <th scope="row">1</th>
            <td>${value.type == "expense" ? "Db" : "Cr"}</td>
            <td>${value.amount}</td>
            <td>${value.particulars}</td>    
          
        </tr>`;
        }
        $("#oldDataDiv").html(tStart + markup + tEnd)
    });
}

function showNewData(newData) {
    $("#saveData").removeAttr("disabled");
    let markup = ``;
    let tStart = `<table class='table table-striped table-dark'>
    <thead class='thead-dark'> 
    <tr> 
    <th scope="col">Sr.No</th> 
    <th scope="col">Type</th> 
    <th scope="col">Amount</th> 
    <th scope="col">Particulars</th>
    </tr>  
    </thead> 
    <tbody>`;;
    let tEnd = "</tbody></table>";

    for (let [key, value] of Object.entries(newData)) {
        markup += `<tr> 
        <th scope="row">1</th>
            <td>${value.type == "expense" ? "Db" : "Cr"}</td>
            <td>${value.amount}</td>
            <td>${value.particulars}</td>    
           
        </tr>`;
    }
    $("#newDataDiv").html(tStart + markup + tEnd)
}