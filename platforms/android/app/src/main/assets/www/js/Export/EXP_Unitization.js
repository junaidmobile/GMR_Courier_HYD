//document.addEventListener("deviceready", GetCommodityList, false);

var GHAExportFlightserviceURL = window.localStorage.getItem("GHAExportFlightserviceURL");

var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var FlightSeqNo;
var SegId;
var ULDseqNo;
var strShipmentInfo;
var totalPkgs;
var totalWeight;
var totalVol;
var prorataWeightValue;
var prorataVolumeValue;
var prorataWtParam;
var prorataVolParam;
var html;
var Manpower;
var awbNo;
var nop;
var weight;
var shipmentId;
var ULDBulkType = 'U';
var ShipType;
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("menubutton", onMenuKeyDown, false);

function onPause() {

    HHTLogout();
}

function onResume() {
    HHTLogout();
}

function onMenuKeyDown() {
    HHTLogout();
}
$(function () {

    if (window.localStorage.getItem("RoleExpUnitization") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //$('#txtFlightDate').val(newDate);

    let date = new Date();
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    var today = day + '-' + month + '-' + year;
    $('#txtFlightDate').val(today);

    $("#txtFlightDate").datepicker({
        shortYearCutoff: 1,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd-M-yy'
    });

    //$('#chkAuto').change(function(){
    //    if($(this).is(":checked")){
    //        $("#btnSave").prop('disabled', true);
    //        //$("#txtScannedID").focus();
    //        $("#txtScannedID").val();
    //        $("#txtAWBNo").val();
    //        $("#txtNOG").val();
    //        $("#txtUnitizedPkgs").val();
    //        $("#txtTotalPkgs").val();
    //    }
    //    else{
    //        $("#btnSave").prop('disabled', false);
    //    }
    //});

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();
    //return date + h + ":" + m;
    //// $('#txtGPNo1').val(date);

    //let date = new Date();
    //const day = date.toLocaleString('default', { day: '2-digit' });
    //const month = date.toLocaleString('default', { month: 'short' });
    //const year = date.toLocaleString('default', { year: 'numeric' });
    //var today = day + '-' + month + '-' + year;
    //$('#txtFlightDate').val(today);

    //$("#txtFlightDate").datepicker({
    //    shortYearCutoff: 1,
    //    changeMonth: true,
    //    changeYear: true,
    //    dateFormat: 'dd-M-yy',

    //});

    //    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //"Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    //    ];
    //    let qntYears = 4;
    //    let selectYear = $("#year");
    //    let selectMonth = $("#month");
    //    let selectDay = $("#day");
    //    let currentYear = new Date().getFullYear();

    //    for (var y = 0; y < qntYears; y++) {
    //        let date = new Date(currentYear);
    //        let yearElem = document.createElement("option");
    //        yearElem.value = currentYear
    //        yearElem.textContent = currentYear;
    //        selectYear.append(yearElem);
    //        currentYear--;
    //    }

    //    for (var m = 0; m < monthNames.length; m++) {
    //        let month = monthNames[m];
    //        let monthElem = document.createElement("option");
    //        monthElem.value = m + 1;
    //        monthElem.textContent = month;
    //        selectMonth.append(monthElem);
    //    }

    //    var d = new Date();
    //    var month = d.getMonth();
    //    var year = d.getFullYear();
    //    var day = d.getDate();

    //    selectYear.val(year);
    //    selectYear.on("change", AdjustDays);
    //    selectMonth.val(month + 1);
    //    selectMonth.on("change", AdjustDays);

    //    AdjustDays();
    //    selectDay.val(day)

    //    function AdjustDays() {
    //        var year = selectYear.val();
    //        var month = parseInt(selectMonth.val()) + 1;
    //        selectDay.empty();

    //        //get the last day, so the number of days in that month
    //        var days = new Date(year, month, 0).getDate();

    //        //lets create the days of that month
    //        for (var d = 1; d <= days; d++) {
    //            var dayElem = document.createElement("option");
    //            dayElem.value = d;
    //            dayElem.textContent = d;
    //            selectDay.append(dayElem);
    //        }
    //    }
    //var stringos = 'ECC~N,PER~N,GEN~N,DGR~Y,HEA~N,AVI~N,BUP~Y,EAW~N,EAP~Y';
    //SHCSpanHtml(stringos);
});



function AutoChkCheck() {
    if ($('#chkAuto').is(':checked')) {
        $("#spnMsg").text('');
        $("#btnSave").prop('disabled', true);

        $("#txtScannedID").val('');
        $("#txtNOG").val('');
        $("#txtAWBNo").val('');
        $("#txtNOG").val();
        $("#txtUnitizedPkgs").val('');
        $("#txtTotalPkgs").val('');
        $("#txtScannedID").focus();
    }
    else {
        $("#spnMsg").text('');
        $("#txtScannedID").val('');
        $("#txtAWBNo").val('');
        $("#txtNOG").val('');
        $("#txtUnitizedPkgs").val('');
        $("#txtTotalPkgs").val('');
        $("#btnSave").prop('disabled', false);
        $("#txtScannedID").focus();
    }
}


function SHCSpanHtml(newSHC) {
    var spanStr = "<tr class=''>";
    var newSpanSHC = newSHC.split(',');
    var filtered = newSpanSHC.filter(function (el) {
        return el != "";
    });
    //for (var n = 0; n < filtered.length; n++) {
    //    spanStr += "<td class='foo'>" + filtered[n] + "</td>";

    //}

    for (var n = 0; n < filtered.length; n++) {
        var blink = filtered[n].split('~');

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'Y' && filtered[n] != '~Y') {
                spanStr += "<td class='blink_me'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }

        if (filtered[n].indexOf('~') > -1) {
            if (blink[1] == 'N' && filtered[n] != '~N') {
                spanStr += "<td class='foo'>" + blink[0] + "</td>";
                console.log(filtered[n])
            }
        }
    }
    spanStr += "</tr>";

    $("#TextBoxDiv").html(spanStr);
    return spanStr;

}
//function countChar(val, count) {

//    var currentBoxNumber = 0;
//    textboxes = $('input[name="textbox[]"]');
//    currentBoxNumber = textboxes.index(val);

//    var len = val.value.length;
//    var index = val.index;

//    if (len == count)
//        ToNextTextbox(currentBoxNumber)
//};

//function ToNextTextbox(currentBoxNumber) {

//    textboxes = $('input[name="textbox[]"]');

//    if (textboxes[currentBoxNumber + 1] != null) {
//        nextBox = textboxes[currentBoxNumber + 1];
//        nextBox.focus();
//        nextBox.select();
//        event.preventDefault();
//        return false;

//    }

//}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function CheckULDBulk() {

    if (document.getElementById('rdoULD').checked) {
        $('#divULDText').show();
        $('#divBulkText').hide();
        $('#divDdlULD').show();
        $('#divDdlBulk').hide();
        $('#divContour').show();
        ULDBulkType = 'U';

    }
    if (document.getElementById('rdoBulk').checked) {
        $('#divULDText').hide();
        $('#divBulkText').show();
        $('#divDdlULD').hide();
        $('#divDdlBulk').show();
        $('#divContour').hide();
        ULDBulkType = 'B';
    }
}

function CheckUldNoValidation(uldno) {
    CheckSpecialCharacter(uldno);
    var ValidChars = "0123456789.";
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";
    var IsNumber = true;
    var Char;

    var getULDNo = uldno;//document.getElementById(txtULDNumber).value;
    var getlength = getULDNo.length;

    if ((getlength > 0) && (document.activeElement.getAttribute('id') != 'ext1')) {
        if (getlength == 4) {
            var firstChar = getULDNo.charAt(0);
            var string = getULDNo.substr(1, 3);

            for (var i = 0; i < getlength; i++) {
                if (iChars.indexOf(getULDNo.charAt(i)) != -1) {
                    //$.alert("Special characters not allowed");

                    $('#spnValMsg').text("Special characters not allowed").css('color', 'red');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    return false;
                } else {
                    $('#spnValMsg').text("");
                }
            }

            for (i = 0; i < string.length && IsNumber == true; i++) {
                Char = string.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    // $.alert('Last three character should be numeric  \n if ULD no is 4 digits');
                    $('#spnValMsg').text('Last three character should be numeric  \n if ULD no is 4 digits').css('color', 'red');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    IsNumber = false;
                } else {
                    $('#spnValMsg').text('');
                }
            }

        }
        else if (getlength == 5) {
            var string = getULDNo.substr(1, 4);

            for (var i = 0; i < getlength; i++) {
                if (iChars.indexOf(getULDNo.charAt(i)) != -1) {
                    //$.alert("Special characters not allowed.");
                    $('#spnValMsg').text('Special characters not allowed.').css('color', 'red');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    return false;
                } else {
                    $('#spnValMsg').text('');
                }
            }

            for (i = 0; i < string.length && IsNumber == true; i++) {
                Char = string.charAt(i);
                if (ValidChars.indexOf(Char) == -1) {
                    // $.alert('Last four character should be numeric  \n if ULD no is 5 digits');
                    $('#spnValMsg').text('Last four character should be numeric  \n if ULD no is 5 digits').css('color', 'red');
                    $('#txtULDNumber').val('');
                    $('#txtULDNumber').focus();
                    IsNumber = false;
                } else {
                    $('#spnValMsg').text('');
                }
            }
        }
        else {
            // $.alert('Please Enter minimum four and maximum five character');
            $('#spnValMsg').text('Please Enter minimum four and maximum five character').css('color', 'red');
            $('#txtULDNumber').val('');
            $('#txtULDNumber').focus();
            return false;
        }
    }
}

function CheckSpecialCharacter(uldno) {

    var getUldno = $('#txtULDNumber').val();
    var iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?~_`";

    for (var i = 0; i < getUldno.length; i++) {
        if (iChars.indexOf(getUldno.charAt(i)) != -1) {
            // $.alert("Your string has special characters. \nThese are not allowed.");
            $('#spnValMsg').text("Your string has special characters. \nThese are not allowed.").css('color', 'red');
            document.getElementById(txtULDNumber).value = "";
            document.getElementById(txtULDNumber).focus();
            return false;
        } else {
            $('#spnValMsg').text("");
        }
    }
}

function GetOffPointForFlight() {

    $('#ddlOffPoint').empty();
    $('#ddlContour').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlContour');

    $('#ddlULD').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlULD');


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();

    var FlightDate = $('#txtFlightDate').val();// $("#year").val() + '-' + $("#month").val() + '-' + $("#day").val();

    //var date = $('#txtFlightDate').val();
    //var newdate = date.split("-").reverse().join("-");
    //var FlightDate = newdate;
    //var FlightDate = $('#txtFlightDate').val();

    if (FlightPrefix == "" || FlightNo == "") {
        //errmsg = "Please enter valid Flight No.";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please enter valid Flight No.").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if (FlightDate == "") {
        //errmsg = "Please enter Flight Date";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please enter Flight Date").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint></Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportFlightDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();

                    if (status == 'E') {
                        //  $.alert($(this).find('StrMessage').text()).css('color', 'red');
                        $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'red');
                    } else {
                        $('#spnValMsg').text("");
                    }
                });

                $(xmlDoc).find('Table1').each(function () {

                    FlightSeqNo = $(this).find('FltSeqNo').text();
                    FltNo = $(this).find('FltNo').text();
                    Manpower = $(this).find('Manpower').text();

                });

                $(xmlDoc).find('Table2').each(function (index) {

                    var RouteId;
                    var OffPointCity;

                    RouteId = $(this).find('RouteID').text();
                    OffPointCity = $(this).find('FLIGHT_AIRPORT_CITY').text();

                    var newOption = $('<option></option>');
                    newOption.val(RouteId).text(OffPointCity);
                    newOption.appendTo('#ddlOffPoint');
                    if (index == 0) {
                        GetULDs(OffPointCity);
                    }
                });

                $(xmlDoc).find('Table4').each(function (index) {

                    var ContourId;
                    var ContourNo;

                    ContourId = $(this).find('Value').text();
                    ContourNo = $(this).find('Text').text();

                    var newOption = $('<option></option>');
                    newOption.val(ContourId).text(ContourNo);
                    newOption.appendTo('#ddlContour');
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function GetULDs(offPonit) {

    $('#ddlULD').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlULD');

    $('#ddlBulk').empty();
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlBulk');

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var FlightPrefix = $('#txtFlightPrefix').val();
    var FlightNo = $('#txtFlightNo').val();
    var FlightDate = $('#txtFlightDate').val();

    // var FlightDate = $("#year").val() + '-' + $("#month").val() + '-' + $("#day").val();

    var inputXML = '<Root><FlightAirline>' + FlightPrefix + '</FlightAirline><FlightNo>' + FlightNo + '</FlightNo><FlightDate>' + FlightDate + '</FlightDate><Offpoint>' + offPonit + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetExportFlightDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table3').each(function (index) {

                    var ULDId;
                    var ULDNo;

                    ULDId = $(this).find('ULD_SEQUENCE_NUMBER').text();
                    ULDNo = $(this).find('ULDBULKNO').text();

                    var newOption = $('<option></option>');
                    newOption.val(ULDId).text(ULDNo);
                    newOption.appendTo('#ddlULD');
                });

                $(xmlDoc).find('Table5').each(function (index) {

                    var TrolleyId;
                    var TrolleyNo;

                    TrolleyId = $(this).find('TrolleySeqNo').text();
                    TrolleyNo = $(this).find('TrolleyNo').text();

                    var newOption = $('<option></option>');
                    newOption.val(TrolleyId).text(TrolleyNo);
                    newOption.appendTo('#ddlBulk');
                });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function AddULD() {

    if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
        //errmsg = "Please enter valid Flight No.";
        //$.alert(errmsg).css('color', 'red');

        $('#spnValMsg').text("Please enter valid Flight No.").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#txtFlightDate').val() == "") {
        //errmsg = "Please enter Flight Date";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please enter Flight Date").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if (document.getElementById('rdoULD').checked) {
        if ($('#txtULDType').val() == "" || $('#txtULDNumber').val() == "") {
            //errmsg = "Please enter ULD Type and No.";
            //$.alert(errmsg).css('color', 'red');
            $('#spnValMsg').text("Please enter ULD Type and No.").css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text("");
        }
        if ($('#txtOwner').val() == "") {
            //errmsg = "Please enter ULD Owner";
            //$.alert(errmsg).css('color', 'red');
            $('#spnValMsg').text("Please enter ULD Owner").css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text("");
        }
    }
    if (document.getElementById('rdoBulk').checked) {
        if ($('#txtBulkType').val() == "" || $('#txtBulkNumber').val() == "") {
            //errmsg = "Please enter Bulk Type and No.";
            //$.alert(errmsg);
            $('#spnValMsg').text("Please enter Bulk Type and No.").css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text("");
        }
    }

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        //errmsg = "No offpoint selected";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("No offpoint selected").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '';
    var servicename;

    if (document.getElementById('rdoULD').checked) {

        inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtULDType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtULDNumber').val() + '</ULDNo><ULDOwner>' + $('#txtOwner').val().toUpperCase() + '</ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>';
        servicename = 'UnitizationSaveULDDetails';
    }
    if (document.getElementById('rdoBulk').checked) {

        inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDType>' + $('#txtBulkType').val().toUpperCase() + '</ULDType><ULDNo>' + $('#txtBulkNumber').val() + '</ULDNo><ULDOwner></ULDOwner><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserId>' + UserId + '</UserId></Root>'
        servicename = 'UnitizationSaveTrolleyDetails ';
    }




    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + servicename,
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {
                        // $.alert($(this).find('Column2').text()).css('color', 'red');

                        if ($(this).find('Column2').text() == 'ULD Added Successfully.') {
                            $('#spnValMsg').text($(this).find('Column2').text()).css('color', 'green');
                        } else {
                            $('#spnValMsg').text($(this).find('Column2').text()).css('color', 'red');
                        }

                    } else {
                        $('#spnValMsg').text("");
                    }
                });

                GetULDs($('#ddlOffPoint').find('option:selected').text());

                $('#txtULDType').val('');
                $('#txtULDNumber').val('');
                $('#txtOwner').val('');

                $('#txtBulkType').val('');
                $('#txtBulkNumber').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function CloseULD() {

    if (document.getElementById('rdoBulk').checked) {

        CloseBulk();
        return;
    }

    if (document.getElementById('rdoULD').checked) {

        if ($('#txtFlightPrefix').val() == "" || $('#txtFlightNo').val() == "") {
            //errmsg = "Please enter valid Flight No.";
            //$.alert(errmsg).css('color', 'red');
            $('#spnValMsg').text("Please enter valid Flight No.").css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text("");
        }
    }


    if ($('#txtFlightDate').val() == "") {
        //errmsg = "Please enter Flight Date";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please enter Flight Date").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    //if ($('#txtOwner').val() == "") {
    //    errmsg = "Please enter ULD Owner";
    //    $.alert(errmsg);
    //    return;
    //}

    if ($('#ddlOffPoint').find('option:selected').text() == "Select" || $('#ddlOffPoint').find('option:selected').text() == "") {
        //errmsg = "No offpoint selected";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("No offpoint selected").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#ddlULD').find('option:selected').text() == "Select" || $('#ddlULD').find('option:selected').text() == "") {
        //errmsg = "Please select ULD";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please select ULD").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    var uldType = $('#ddlULD').find('option:selected').text().substring(0, 3);
    var tempSTR = $('#ddlULD').find('option:selected').text().substring(3);
    var uldOwner = tempSTR.substring(tempSTR.length - 2)
    var uldNumber = (tempSTR.slice(0, -2)).trim();

    var contourCode;
    if ($('#ddlContour').find('option:selected').val() == 'Select')
        contourCode = '';
    else
        contourCode = $('#ddlContour').find('option:selected').val();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "EXPULDClose",
            data: JSON.stringify({
                'ULDType': uldType, 'ULDNo': uldNumber, 'ULDOwner': uldOwner.toUpperCase(),
                'ULDSequenceNo': $('#ddlULD').find('option:selected').val(), 'AirportCity': AirportCity, 'ScaleWeight': $('#txtGrossWt').val(),
                'ContourCode': contourCode, 'CompanyCode': window.localStorage.getItem("companyCode"), 'strUserID': window.localStorage.getItem("UserID"),
                'FlightSeqNumber': FlightSeqNo, 'routepoint': $('#ddlOffPoint').find('option:selected').text(), 'ULDManpower': Manpower,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {
                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();
                    if (Status == 'S') {
                        $.alert($(this).find('StrMessage').text()).css('color', 'green');
                    } else {
                        $.alert($(this).find('StrMessage').text()).css('color', 'red');
                    }


                });

                GetOffPointForFlight();

                $('#txtGrossWt').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function CloseBulk() {

    if ($('#ddlBulk').find('option:selected').text() == "Select" || $('#ddlBulk').find('option:selected').text() == "") {
        //errmsg = "Please select Bulk";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please select Bulk").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }


    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "EXPTrolleyClose",
            data: JSON.stringify({
                'ULDSequenceNo': $('#ddlBulk').find('option:selected').val(), 'AirportCity': AirportCity, 'ScaleWeight': $('#txtGrossWt').val(),
                'CompanyCode': window.localStorage.getItem("companyCode"), 'strUserID': window.localStorage.getItem("UserID"),
                'FlightSeqNumber': FlightSeqNo, 'routepoint': $('#ddlOffPoint').find('option:selected').text(),
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {

                $('#txtGrossWt').val('');

                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });

                GetOffPointForFlight();

                $('#txtGrossWt').val('');
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function SaveDateTimeForULD() {

    if ($('#ddlOffPoint').find('option:selected').text() == "Select") {
        //errmsg = "Please select ULD";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please select ULD").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#txtStartDateTime').val() == "" || $('#txtStartTimeFrom').val() == "" || $('#txtStartTimeTo').val() == "") {
        //errmsg = "Please enter Start Date/hh/mm.";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please enter Start Date/hh/mm.").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#txtEndDateTime').val() == "" || $('#txtEndTimeFrom').val() == "" || $('#txtEndTimeTo').val() == "") {
        //errmsg = "Please enter End Date/hh/mm.";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("Please enter End Date/hh/mm.").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ((new Date($('#txtStartDateTime').val()).getTime() > new Date($('#txtEndDateTime').val()).getTime())) {
        //errmsg = "End date cannot be less start date.";
        //$.alert(errmsg).css('color', 'red');
        $('#spnValMsg').text("End date cannot be less start date.").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ((new Date($('#txtStartDateTime').val()).getTime() == new Date($('#txtEndDateTime').val()).getTime())) {
        if (Number($('#txtStartTimeFrom').val()) > Number($('#txtEndTimeFrom').val())) {
            //errmsg = "End time cannot be less start time.";
            //$.alert(errmsg).css('color', 'red');
            $('#spnValMsg').text("End time cannot be less start time.").css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text("");
        }
    }

    if ($('#txtStartDateTime').val().length > 0) {
        var formattedDate = new Date($('#txtStartDateTime').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var StartDate = m + "/" + d + "/" + y;
    }

    if ($('#txtEndDateTime').val().length > 0) {
        var formattedDate = new Date($('#txtEndDateTime').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var EndDate = m + "/" + d + "/" + y;
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><BuiltUpStart>' + StartDate + '</BuiltUpStart><BuiltUpStartTime>' + $('#txtStartTimeFrom').val() + ':' + $('#txtStartTimeTo').val() + '</BuiltUpStartTime><BuiltUpEnd>' + EndDate + '</BuiltUpEnd><BuiltUpEndTime>' + $('#txtEndTimeFrom').val() + ':' + $('#txtEndTimeTo').val() + '</BuiltUpEndTime><UserId>' + UserId + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "UnitizationBuiltUpULD",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');

                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    $.alert($(this).find('StrMessage').text());
                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function ShowAddAWBGrid() {

    if (document.getElementById('rdoULD').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'Select') {
            //errmsg = "Please select ULD";
            //$.alert(errmsg).css('color', 'red');
            $('#spnValMsg').text("Please select ULD").css('color', 'red');
            return false;
        } else {
            $('#spnValMsg').text("");

        }
        $('#txtULDNo').val($('#ddlULD').find('option:selected').text());

    }

    if (document.getElementById('rdoBulk').checked) {
        if ($('#ddlBulk').find('option:selected').text() == 'Select') {
            //errmsg = "Please select Bulk";
            //$.alert(errmsg).css('color', 'red');
            $('#spnValMsg').text("Please select Bulk").css('color', 'red');
            return;
        } else {
            $('#spnValMsg').text("");
        }
        $('#txtULDNo').val($('#ddlBulk').find('option:selected').text());
    }

    $('#txtFlightPrefix').attr("disabled", "disabled");
    $('#txtFlightNo').attr("disabled", "disabled");
    $('#txtFlightDate').attr("disabled", "disabled");
    $('#ddlOffPoint').attr("disabled", "disabled");
    $('#btnGet').attr("disabled", "disabled");

    //$('#txtULDNo').val($('#ddlULD').find('option:selected').text());
    $("#divULDDetails").hide();
    $("#divAddAWBDetails").show();
    $('#txtScannedID').focus();
}

function ShowULDGrid() {
    $('#txtFlightPrefix').removeAttr("disabled");
    $('#txtFlightNo').removeAttr("disabled");
    $('#txtFlightDate').removeAttr("disabled");
    $('#ddlOffPoint').removeAttr("disabled");
    $('#btnGet').removeAttr("disabled");

    $("#divAddAWBDetails").hide();
    $("#divULDDetails").show();

    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#ddlShipmentNo').empty();
    $('#txtPackages').val('');

    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');

    $('#txtWeight').val('');
    $('#txtVolume').val('');

    $('#divAddTestLocation').empty();
    html = '';
    $('#txtNOG').val('');
    $('#txtScannedID').val('');
    $('#spnValMsg').text("");
    $("#TextBoxDiv").empty();

}

function onChangeLenthCheck() {
    if ($('#txtAWBNo').val().length == 11) {
        // GetShipmentInfoForAWB();
    }
}

function GetShipmentInfoForAWB() {

    // var MAWBPrefix = $('#txtAWBNo').val().substr(0, 3);
    // var MAWBNo = $('#txtAWBNo').val().substr(3, 11);
    var scanedCode = $('#txtScannedID').val();

    var isChecked = $("#chkAuto").is(":checked");
    var isAuto = isChecked ? 1 : 0;

    console.log(scanedCode);
    if (scanedCode == '') {
        //   $('#spnValMsg').text("Please scan/ enter No.").css('color', 'red');
        return;
    }

    // if (MAWBNo.length != '8') {
    //     //errmsg = "Please enter valid AWB No.";
    //     //$.alert(errmsg).css('color', 'red');
    //     $('#spnValMsg').text("Please enter valid AWB No.").css('color', 'red');
    //     return;
    // }

    // $('#txtPackages').val('');
    // $('#txtWeight').val('');
    // $('#txtVolume').val('');
    // $('#txtUnitizedPkgs').val('');
    // $('#txtTotalPkgs').val('');
    // $('#ddlShipmentNo').empty();

    // totalPkgs = '';
    // totalWeight = '';
    // totalVol = '';

    // prorataWtParam = '';
    // prorataVolParam = '';

    var getULDNo;

    // if (MAWBNo == '')
    //     return;

    // if (MAWBNo != '') {
    //     if (MAWBPrefix.length != '3' || MAWBNo.length != '8') {
    //         //errmsg = "Please enter valid AWB No.";
    //         //$.alert(errmsg).css('color', 'red');
    //         $('#spnValMsg').text("Please enter valid AWB No.").css('color', 'red');
    //         return;
    //     } else {
    //         $('#spnValMsg').text("");
    //     }
    // }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";
    //'<Root><flightSeqNo>'+FlightSeqNo+'</flightSeqNo><ScanCode>'+scanedCode+'</ScanCode><Offpoint>'+$('#ddlOffPoint').find('option:selected').text()+'</Offpoint><AirportCity>'+AirportCity+'</AirportCity></Root>'
    var inputXML = '<Root><flightSeqNo>' + FlightSeqNo + '</flightSeqNo><ScanCode>' + scanedCode + '</ScanCode><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            //url: GHAExportFlightserviceURL + "UnitizationPendingAWBDetails",
            url: GHAExportFlightserviceURL + "Unitization_ScanSearch_V4",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                // debugger;
                $("body").mLoading('hide');
                responsee = response.d;

                strShipmentInfo = responsee;

                var xmlDoc = $.parseXML(responsee);
                var sts = $(this).find('Status').text();
                $(xmlDoc).find('Table').each(function () {

                    if ($(this).find('Status').text() != 'S') {
                        //$.alert($(this).find('StrMessage').text());
                        $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'red');
                        $('#btnSave').attr('disabled', 'disabled');
                        return;
                    } else {
                        $('#spnValMsg').text('');
                        $('#btnSave').removeAttr('disabled');
                    }
                });

                $(xmlDoc).find('Table1').each(function (index) {
                    awbNo = $(this).find('AWBNo').text();
                    nop = $(this).find('NOP').text();
                    weight = $(this).find('Weight').text();
                    shipmentId = $(this).find('EXPSHIPROWID').text();
                    ShipType = $(this).find('ShipType').text();
                    var nog = $(this).find('Nog').text();
                    var unitized = $(this).find('RemNOP').text();
                    var ttlPkg = $(this).find('NOP').text();
                    var ManNOP = $(this).find('ManNOP').text();

                    $('#txtAWBNo').val(awbNo);
                    $('#txtNOG').val(nog);
                    $('#txtUnitizedPkgs').val(ManNOP);
                    $('#txtTotalPkgs').val(ttlPkg);
                });

                if (isAuto == 1 && awbNo != undefined && nop != undefined && shipmentId != undefined) {
                    SaveAWBforULDDetails();
                }

                // $(xmlDoc).find('Table1').each(function (index) {

                //     var newOption = $('<option></option>');
                //     newOption.val($(this).find('EXPSHIPROWID').text()).text($(this).find('RNo').text());
                //     newOption.appendTo('#ddlShipmentNo');
                //     $('#txtPackages').focus();
                //     if (index == 0) {
                //         //$('#txtPackages').val($(this).find('NOP').text());
                //         //$('#txtWeight').val($(this).find('WEIGHT_KG').text());
                //         //$('#txtVolume').val($(this).find('VOLUME').text());

                //         $('#txtUnitizedPkgs').val($(this).find('ManNOP').text());
                //         $('#txtTotalPkgs').val($(this).find('NOP').text());
                //         $('#txtNOG').val($(this).find('Nog').text());

                //         totalPkgs = $(this).find('NOP').text();
                //         totalWeight = $(this).find('ManWt').text();
                //         //totalVol = $(this).find('VOLUME').text();

                //         prorataWtParam = Number(totalWeight) / Number(totalPkgs);
                //         //prorataVolParam = Number(totalVol) / Number(totalPkgs);

                //         var newSHC = $(this).find('SHCAll').text();
                //         $("#TextBoxDiv").empty();
                //         SHCSpanHtml(newSHC);
                //     }
                // });

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function ChangeEWRInfo(selectedShpmnt) {

    var xmlDoc = $.parseXML(strShipmentInfo);

    $(xmlDoc).find('Table1').each(function (index) {

        if ($(this).find('RNo').text() == selectedShpmnt) {
            $('#txtUnitizedPkgs').val($(this).find('ManNOP').text());
            $('#txtTotalPkgs').val($(this).find('NOP').text());

            totalPkgs = $(this).find('NOP').text();
            totalWeight = $(this).find('ManWt').text();
            //totalVol = $(this).find('VOLUME').text();

            prorataWtParam = Number(totalWeight) / Number(totalPkgs);
        }
    });

}

function CalculateProrataWtVol() {

    var newWt = Number($('#txtPackages').val()) * prorataWtParam;
    var newVol = Number($('#txtPackages').val()) * prorataVolParam;

    $('#txtWeight').val(newWt.toFixed(3));
    $('#txtVolume').val(newVol.toFixed(3));
}

function SaveAWBforULDDetails() {

    if ($("#txtScannedID").val() == '') {
        $('#spnValMsg').text('Please enter Scan ID').css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text('');
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //var AWBPrefix = $('#txtAWBPrefix').val();
    // var AWBNo = $('#txtAWBNo').val();

    // if (AWBNo == '') {
    //     //errmsg = "Please enter AWB No.";
    //     //$.alert(errmsg).css('color', 'red');
    //     $('#spnValMsg').text("Please enter AWB No.").css('color', 'red');
    //     $('#txtAWBNo').focus();
    //     return;
    // } else {
    //     $('#spnValMsg').text("");
    // }

    // if (AWBNo.length != '11') {
    //     //errmsg = "Please enter valid AWB No.";
    //     //$.alert(errmsg).css('color', 'red');
    //     $('#spnValMsg').text("Please enter valid AWB No.").css('color', 'red');
    //     return;
    // } else {
    //     $('#spnValMsg').text("");
    // }

    // if ($('#ddlShipmentNo').val() == null || $('#ddlShipmentNo').val() == undefined) {
    //     //errmsg = "Please select EWR No.";
    //     //$.alert(errmsg).css('color', 'red');
    //     $('#spnValMsg').text("Please select EWR No.").css('color', 'red');
    //     return;
    // } else {
    //     $('#spnValMsg').text("");
    // }



    // var ShipmentNo = $('#ddlShipmentNo').find('option:selected').text();
    // var Packages = $('#txtPackages').val();
    // var GrossWt = $('#txtWeight').val();
    // var GrossWtUnit = $('#ddlGrossWtUnit').find('option:selected').text();
    // var Volume = $('#txtVolume').val();
    // var ULDNo;
    // var Type;

    // if (document.getElementById('rdoULD').checked) {
    //     Type = 'U';
    //     ULDNo = $('#ddlULD').find('option:selected').val();
    // }
    // if (document.getElementById('rdoBulk').checked) {
    //     Type = 'T';
    //     ULDNo = $('#ddlBulk').find('option:selected').val();
    // }

    //if (AWBNo == "" || Packages == "" || GrossWt == "") {

    //    errmsg = "Please enter all the required fields.</br>";
    //    $.alert(errmsg);
    //    return;

    //}

    // if (Packages == '') {
    //     //errmsg = "Packages enter Packages</br>";
    //     //$.alert(errmsg).css('color', 'red');
    //     $('#spnValMsg').text("Packages enter Packages").css('color', 'red');
    //     return;

    // } else {
    //     $('#spnValMsg').text("");
    // }

    //if (ShipmentNo == "Select" || ShipmentNo == "") {

    //    errmsg = "Shipment number not found</br>";
    //    $.alert(errmsg);
    //    return;

    //}

    if ($('#txtFlightDate').val().length > 0) {
        var formattedDate = new Date($('#txtFlightDate').val());
        var d = formattedDate.getDate();
        if (d.toString().length < Number(2))
            d = '0' + d;
        var m = formattedDate.getMonth();
        m += 1;  // JavaScript months are 0-11
        if (m.toString().length < Number(2))
            m = '0' + m;
        var y = formattedDate.getFullYear();

        var flightDate = m + "/" + d + "/" + y;
    }
    var ULDType = $('#ddlULD').find('option:selected').text().substring(0, 3);
    var tempSTR = $('#ddlULD').find('option:selected').text().substring(3);
    var ULDOwner = tempSTR.substring(tempSTR.length - 2)
    var ULDNumber = (tempSTR.slice(0, -2)).trim();

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + $('#ddlULD').find('option:selected').val() + '</ULDSeqNo><Type>' + ULDBulkType + '</Type><Offpoint>' + $('#ddlOffPoint').find('option:selected').text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity><UserID>' + UserId + '</UserID><ULDType>' + ULDType + '</ULDType><ULDNumber>' + ULDNumber + '</ULDNumber><ULDOwner>' + ULDOwner + '</ULDOwner><AWBId>-1</AWBId><ShipmentId>' + shipmentId + '</ShipmentId><AWBNo>' + awbNo + '</AWBNo><NOP>' + nop + '</NOP><Weight>' + weight + '</Weight><Volume>-1</Volume><HAWBRowId>-1</HAWBRowId><ShipType>' + ShipType + '</ShipType><ScanCode>' + $('#txtScannedID').val() + '</ScanCode></Root>';
    console.log(inputXML);
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAExportFlightserviceURL + "Unitization_AWBSave_V4",
            //data: JSON.stringify({
            //    'strFlightNo': $('#txtFlightPrefix').val() + $('#txtFlightNo').val(), 'strFlightDate': flightDate, 'strULDNo': ULDNo,
            //    'strAWBNo': AWBNo, 'strShipmentNo': ShipmentNo, 'strPkgs': Packages,
            //    'strGrossWt': GrossWt, 'strWtUnit': GrossWtUnit, 'strVolume': Volume,
            //    'strAirportCity': AirportCity, 'strUserID': window.localStorage.getItem("UserID"), 'CompanyCode': window.localStorage.getItem("companyCode"), 'OffPoint': $('#ddlOffPoint').find('option:selected').text(), 'Type': Type,
            //}),
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);

                $(xmlDoc).find('Table').each(function () {

                    var status = $(this).find('Status').text();

                    if (status != 'E') {
                        // $('#txtAWBPrefix').val('');
                        // $('#txtAWBNo').val('');
                        // $('#txtUnitizedPkgs').val('');
                        // $('#txtTotalPkgs').val('');
                        // $('#txtPackages').val('');
                        // $('#ddlShipmentNo').empty();


                        $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'green');
                        clearAWBDetails();
                        $("#txtScannedID").focus();
                        return;
                    }
                    else {
                        $('#spnValMsg').text($(this).find('StrMessage').text()).css('color', 'red');
                        clearAWBDetails();
                        $("#txtScannedID").focus();
                        return;
                    }

                    //if (confirm($(this).find('StrMessage').text())) {
                    //    $('#txtAWBNo').focus();
                    //}

                    //if (!alert($(this).find('StrMessage').text())) {
                    //    $('#txtAWBNo').focus();
                    //}


                });

                //GetShipmentInfoForAWB($('#txtAWBNo').val());


                //$('#txtVolume').val('');
                //window.location.reload();

                GetAWBDetailsForULD();
            },
            //error: function (msg) {
            //    $("body").mLoading('hide');
            //    $.alert('Some error occurred while saving data');
            //}
            error: function (request, status, error) {
                alert(request.responseText);
            }
        });
        return false;
    }

}

function GetAWBDetailsForULD() {
    // $('#txtScannedID').focus();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (document.getElementById('rdoULD').checked) {
        if ($('#ddlULD').find('option:selected').text() == 'Select') {
            return false;
        }
    }

    if (document.getElementById('rdoBulk').checked) {
        if ($('#ddlBulk').find('option:selected').text() == 'Select') {
            return false;
        }
    }

    var ULDid;
    var type;

    if (document.getElementById('rdoULD').checked) {
        ULDid = $("#ddlULD option:selected").val();
        type = 'U';
    }

    if (document.getElementById('rdoBulk').checked) {
        ULDid = $("#ddlBulk option:selected").val();
        type = 'T';
    }



    //SelectedHawbId = $("#ddlHAWB option:selected").val();      

    //var inputXML = '<Root><AWBNo>' + AWBNo + '</AWBNo><HouseNo>' + HAWBNo + '</HouseNo><IGMNo>' + IgmVal + '</IGMNo><UserId>' + window.localStorage.getItem("UserID") + '</UserId><AirportCity>' + AirportCity + '</AirportCity></Root>';

    var inputXML = '<Root><FlightSeqNo>' + FlightSeqNo + '</FlightSeqNo><ULDSeqNo>' + ULDid + '</ULDSeqNo><Type>' + type + '</Type><Offpoint>' + $("#ddlOffPoint option:selected").text() + '</Offpoint><AirportCity>' + AirportCity + '</AirportCity></Root>';

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAExportFlightserviceURL + "GetUnitizedShipmentDetails",
            data: JSON.stringify({ 'InputXML': inputXML }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                var str = response.d;

                var totalPkgs;

                strXmlStore = str;

                if (str != null && str != "") {

                    $('#divAddTestLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>AWB</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Packages</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table1').each(function (index) {

                        //var outMsg = $(this).find('Status').text();

                        //if (outMsg == 'E') {
                        //    $.alert($(this).find('StrMessage').text());
                        //    return;
                        //}

                        var Awb;
                        var Pkgs;

                        Awb = $(this).find('AWBNo').text().toUpperCase();
                        Pkgs = $(this).find('NOP').text();

                        AddTableLocation(Awb, Pkgs);

                    });

                    $(xmlDoc).find('Table2').each(function (index) {

                        totalPkgs = $(this).find('NOP').text();

                        html += "<tr>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>TOTAL</td>";

                        html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:13px;font-weight: bold;'align='center'>" + totalPkgs + "</td>";
                        html += "</tr>";


                    });

                    html += "</tbody></table>";

                    if (totalPkgs > Number(0))
                        $('#divAddTestLocation').append(html);
                    else {
                        $('#divAddTestLocation').empty();
                        html = '';
                    }
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function AddTableLocation(AWB, Pkgs) {

    html += "<tr>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + AWB + "</td>";

    html += "<td height='30' style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + Pkgs + "</td>";
    html += "</tr>";

}

function clearAllULDDetails() {

    $('#txtFlightPrefix').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#ddlOffPoint').empty();
    $('#txtULDType').val('');
    $('#txtULDNumber').val('');
    $('#txtOwner').val('');
    $('#ddlULD').empty();
    $('#ddlBulk').empty();
    $('#txtStartDateTime').val('');
    $('#txtStartTimeFrom').val('');
    $('#txtStartTimeTo').val('');
    $('#txtEndDateTime').val('');
    $('#txtEndTimeFrom').val('');
    $('#txtEndTimeTo').val('');
    $('#txtBulkType').val('');
    $('#txtBulkNumber').val('');
    $('#txtGrossWt').val('');
    $('#txtFlightPrefix').focus();
    $('#spnValMsg').text('');
}

function clearAWBDetails() {
    $("#txtScannedID").val('');
    $("#txtScannedID").focus();
    //$('#txtULDNo').val('');
    $('#txtAWBPrefix').val('');
    $('#txtAWBNo').val('');
    $('#ddlShipmentNo').empty();
    $('#txtPackages').val('');
    $('#txtUnitizedPkgs').val('');
    $('#txtTotalPkgs').val('');
    $('#txtScanID').focus();
    $('#txtNOG').val('');
    $('txtScannedID').val('');
    //$('#txtTotalPkgs').val('');
    $("#TextBoxDiv").empty();
    //  $("#divAddTestLocation").empty();
    $('spnValMsg').text('');
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
}


