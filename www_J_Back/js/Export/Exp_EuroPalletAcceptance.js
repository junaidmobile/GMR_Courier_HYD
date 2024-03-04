
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AWBid;
var type;
var VCTNo;
var flag = window.localStorage.getItem("flag");
var _vctno = window.localStorage.getItem("_vctno");
var _Door = window.localStorage.getItem("_Door");
var UserName = window.localStorage.getItem("UserName");
var flagclear = '';
var d = new Date(),
    n = d.getMonth() + 1,
    y = d.getFullYear()
t = d.getDate();

$(function () {

    //$('#txtVCTNo').blur(function () {
    //    if ($("#txtVCTNo").val().length > 10) {
    //        $('#btnUnScanned').removeAttr('disabled');

    //    }

    //});


    //$("#btnUnScanned").click(function () {
    //    $("#myModalUnScan").modal('show');
    //});


    if (window.localStorage.getItem("RoleExpTDG") == '0') {
        window.location.href = 'EXP_Dashboard.html';
    }

    type = 'A';

    $("#rdoAWB").click(function () {
        rdoAWBChecked();
    });

    $("#rdoSlot").click(function () {
        rdoSlotChecked();
    });

    if (flag == 1 || flagclear != '') {
        GetVCTDetailsForTDGAcceptanceFromBack(_vctno);
    } else {

        $("#txtVCTNo").focus();
    }

});


//EXP_TDGAcceptance2.html




function rdoAWBChecked() {
    clearALL();
    type = 'A';
    $('#divAWB').css('display', 'block');
    $('#divSlot').css('display', 'none');
    $('#txtAWBNo').focus();
}

function rdoSlotChecked() {
    clearALL();
    type = 'S';
    $('#divAWB').css('display', 'none');
    $('#divSlot').css('display', 'block');
    $('#txtSlotNo').focus();
}

function GetAWBForSlotNumber() {

    var SlotNo = $('#txtSlotNo').val();

    clearALL();

    $('#txtSlotNo').val(SlotNo);

    if (SlotNo == '')
        return;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetAWBNoBasedOnSlotNo_PDA",
            data: JSON.stringify({ 'pi_strSlotNo': SlotNo }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;
                if (str != null && str != "") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        if ($(this).find('OutMsg').text() != '') {
                            $.alert($(this).find('OutMsg').text());
                            return false;
                        }

                        var newOption = $('<option></option>');
                        newOption.val($(this).find('AWBNo').text()).text($(this).find('AWBNo').text());
                        newOption.appendTo('#ddlAWBno');

                    });

                }
                else {
                    errmsg = 'Slot no. does not exists';
                   // $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
              //  $.alert(r.Message);
            }
        });
    }

}

function onKeyPressVTNo() {

    if ($('#txtVCTNo').val().length == 15) {
        GetVCTDetailsForTDGAcceptance('true', 'true');
        $('#txtDoor').focus()
    }


}


function GetVCTDetailsForTDGAcceptance(clearMsg, overwriteMsg) {
    flagclear = 'a';
    localStorage.removeItem('_vctno');
    localStorage.removeItem('_Door');



    clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    //  $('#spnErrormsg').text('');
    if ($('#txtVCTNo').val() == '') {
        //errmsg = "Please scan/enter AWB No.";
        //$.alert(errmsg);
        return;
    }



    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetVCTDetailsForTDGAcceptance",
            data: JSON.stringify({ 'pi_strVCTNo': $('#txtVCTNo').val() }),
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
                if (str != null && str != "") {


                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        VCTNo = $(this).find('VCTNo').text();
                        TotalVCTPieces = $(this).find('TotalVCTPieces').text();
                        TotalVCTGrWt = $(this).find('TotalVCTGrWt').text();
                        TotalAcceptedPieces = $(this).find('TotalAcceptedPieces').text();
                        TotalRemaingingPieces = $(this).find('TotalRemaingingPieces').text();
                        DockInStatus = $(this).find('DockInStatus').text();
                        DockOutStatus = $(this).find('DockOutStatus').text();
                        AWBCount = $(this).find('AWBCount').text();
                        window.localStorage.setItem("VCTNo", VCTNo);
                        //if (DockInStatus == 'false') {
                        //    btnDockIn
                        //} else if (DockInStatus == 'true') {

                        //}


                        //if ($(this).find('OutMsg').text().length > Number(5)) {
                        //    $.alert($(this).find('OutMsg').text());
                        //    return;
                        //}

                        if (DockInStatus == 'false') {
                            $('#btnDockIn').removeAttr('disabled');
                        } else if (DockInStatus == 'true') {
                            $('#btnDockIn').attr('disabled', 'disabled');

                        }

                        if (DockOutStatus == 'false') {
                           
                            $('#btnDockOut').removeAttr('disabled');
                        } else if (DockOutStatus == 'true') {
                            $('#btnDockOut').attr('disabled', 'disabled');
                        }

                        if (DockInStatus == 'false') {
                            $('#btnNext').attr('disabled', 'disabled');
                        } else if (DockInStatus == 'true') {
                            $('#btnNext').removeAttr('disabled');
                        }

                        $('#txtTotalPieces').val(TotalVCTPieces);
                        $('#txtGrossWt').val(TotalVCTGrWt);
                        $('#txtAcceptedPieces').val(TotalAcceptedPieces);
                        $('#txtRemainingPieces').val(TotalRemaingingPieces);
                        $('#txtAWBCount').val(AWBCount);
                        //debugger;
                        //if (index == 0) {
                        //    AWBid = $(this).find('AWBId').text();
                        //    if (type == 'A')
                        //        $('#txtSlotNo').val($(this).find('SlotNo').text());
                        //    $('#txtSlotTime').val($(this).find('SlotNo').text().slice(-4));
                        //    $('#txtFlightNo').val($(this).find('FlightNo').text());
                        //    $('#txtFlightDate').val($(this).find('FlightDt').text());
                        //    $('#txtFltDestination').val($(this).find('OffPoint').text());
                        //    $('#txtAWBDestination').val($(this).find('Destination').text());
                        //    $('#txtDecPackages').val($(this).find('Pieces').text());
                        //    $('#txtDeclGrossWt').val($(this).find('GrWt').text());
                        //    $('#txtDeclchrgWt').val($(this).find('ChWt').text());
                        //    $('#txtRcvdGrossWt').val($(this).find('ActualGrWt').text());
                        //    $('#txtCommodity').val($(this).find('Commodity').text());
                        //    $('#txtDeclVolWt').val($(this).find('DeclaredVolWt').text());
                        //    $('#txtRcvdVolWt').val($(this).find('ActualVolWt').text());

                        //    $('#txtExporterName').val($(this).find('Exporter').text());
                        //    $('#txtIataCode').val($(this).find('IATA').text());
                        //    $('#txtCHACode').val($(this).find('CHA').text());

                        //    if ($(this).find('TDGStatus').text() == 'true') {
                        //        $("#btnSave").attr("disabled", "disabled");
                        //        $("#txtReceivedPkgs").attr("disabled", "disabled");
                        //    }

                        //    if ($(this).find('Pieces').text() == '0/0') {
                        //        $("#btnSave").attr("disabled", "disabled");
                        //        $("#txtReceivedPkgs").attr("disabled", "disabled");
                        //    }

                        //    if (Number($(this).find('ActualGrWt').text()) > Number($(this).find('ActualChWt').text()))
                        //        $('#txtRcvdchrgWt').val($(this).find('ActualGrWt').text());
                        //    if (Number($(this).find('ActualChWt').text()) > Number($(this).find('ActualGrWt').text()))
                        //        $('#txtRcvdchrgWt').val($(this).find('ActualChWt').text());
                        //    if (Number($(this).find('ActualChWt').text()) == Number($(this).find('ActualGrWt').text()))
                        //        $('#txtRcvdchrgWt').val($(this).find('ActualChWt').text());
                        //}
                    });
                    $(xmlDoc).find('Table').each(function () {
                        if ($(this).find('OutMsg').text().length > Number(5)) {
                            //  $.alert($(this).find('OutMsg').text());
                            if (overwriteMsg == 'true') {
                                $('#spnErrormsg').text($(this).find('OutMsg').text()).css('color', 'red');

                            }
                            $('#btnNext').attr('disabled', 'disabled');
                            $('#btnDockOut').attr('disabled', 'disabled');
                            $('#btnDockIn').attr('disabled', 'disabled');
                        }
                        else {
                            if (clearMsg == 'true') {
                                $('#spnErrormsg').text('');
                            }

                        }
                    });
                }
                else {
                    errmsg = 'VT No. does not exists';
                   // $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
               // $.alert(r.Message);
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



function GetVCTDetailsForTDGAcceptanceFromBack(_vctno) {


    clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    $('#txtVCTNo').val(_vctno);
    $('#txtDoor').val(_Door);
    //if ($('#txtVCTNo').val() == '') {
    //    //errmsg = "Please scan/enter AWB No.";
    //    //$.alert(errmsg);
    //    return;
    //}

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetVCTDetailsForTDGAcceptance",
            data: JSON.stringify({ 'pi_strVCTNo': _vctno }),
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
                if (str != null && str != "") {


                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        VCTNo = $(this).find('VCTNo').text();
                        TotalVCTPieces = $(this).find('TotalVCTPieces').text();
                        TotalVCTGrWt = $(this).find('TotalVCTGrWt').text();
                        TotalAcceptedPieces = $(this).find('TotalAcceptedPieces').text();
                        TotalRemaingingPieces = $(this).find('TotalRemaingingPieces').text();
                        DockInStatus = $(this).find('DockInStatus').text();
                        DockOutStatus = $(this).find('DockOutStatus').text();
                        AWBCount = $(this).find('AWBCount').text();
                        window.localStorage.setItem("VCTNo", VCTNo);
                        //if (DockInStatus == 'false') {
                        //    btnDockIn
                        //} else if (DockInStatus == 'true') {

                        //}

                        //if ($(this).find('OutMsg').text().length > Number(5)) {
                        //    $.alert($(this).find('OutMsg').text());
                        //    return;
                        //}

                        if (DockInStatus == 'false') {
                            $('#btnDockIn').removeAttr('disabled');
                        } else if (DockInStatus == 'true') {
                            $('#btnDockIn').attr('disabled', 'disabled');

                        }

                        if (DockOutStatus == 'false') {
                            $('#btnDockOut').removeAttr('disabled');
                        } else if (DockOutStatus == 'true') {
                            $('#btnDockOut').attr('disabled', 'disabled');
                        }

                        if (DockInStatus == 'false') {
                            $('#btnNext').attr('disabled', 'disabled');
                        } else if (DockInStatus == 'true') {
                            $('#btnNext').removeAttr('disabled');
                        }

                        $('#txtTotalPieces').val(TotalVCTPieces);
                        $('#txtGrossWt').val(TotalVCTGrWt);
                        $('#txtAcceptedPieces').val(TotalAcceptedPieces);
                        $('#txtRemainingPieces').val(TotalRemaingingPieces);
                        $('#txtAWBCount').val(AWBCount);
                        //debugger;
                        //if (index == 0) {
                        //    AWBid = $(this).find('AWBId').text();
                        //    if (type == 'A')
                        //        $('#txtSlotNo').val($(this).find('SlotNo').text());
                        //    $('#txtSlotTime').val($(this).find('SlotNo').text().slice(-4));
                        //    $('#txtFlightNo').val($(this).find('FlightNo').text());
                        //    $('#txtFlightDate').val($(this).find('FlightDt').text());
                        //    $('#txtFltDestination').val($(this).find('OffPoint').text());
                        //    $('#txtAWBDestination').val($(this).find('Destination').text());
                        //    $('#txtDecPackages').val($(this).find('Pieces').text());
                        //    $('#txtDeclGrossWt').val($(this).find('GrWt').text());
                        //    $('#txtDeclchrgWt').val($(this).find('ChWt').text());
                        //    $('#txtRcvdGrossWt').val($(this).find('ActualGrWt').text());
                        //    $('#txtCommodity').val($(this).find('Commodity').text());
                        //    $('#txtDeclVolWt').val($(this).find('DeclaredVolWt').text());
                        //    $('#txtRcvdVolWt').val($(this).find('ActualVolWt').text());

                        //    $('#txtExporterName').val($(this).find('Exporter').text());
                        //    $('#txtIataCode').val($(this).find('IATA').text());
                        //    $('#txtCHACode').val($(this).find('CHA').text());

                        //    if ($(this).find('TDGStatus').text() == 'true') {
                        //        $("#btnSave").attr("disabled", "disabled");
                        //        $("#txtReceivedPkgs").attr("disabled", "disabled");
                        //    }

                        //    if ($(this).find('Pieces').text() == '0/0') {
                        //        $("#btnSave").attr("disabled", "disabled");
                        //        $("#txtReceivedPkgs").attr("disabled", "disabled");
                        //    }

                        //    if (Number($(this).find('ActualGrWt').text()) > Number($(this).find('ActualChWt').text()))
                        //        $('#txtRcvdchrgWt').val($(this).find('ActualGrWt').text());
                        //    if (Number($(this).find('ActualChWt').text()) > Number($(this).find('ActualGrWt').text()))
                        //        $('#txtRcvdchrgWt').val($(this).find('ActualChWt').text());
                        //    if (Number($(this).find('ActualChWt').text()) == Number($(this).find('ActualGrWt').text()))
                        //        $('#txtRcvdchrgWt').val($(this).find('ActualChWt').text());
                        //}
                    });
                    $(xmlDoc).find('Table').each(function () {
                        if ($(this).find('OutMsg').text().length > Number(5)) {
                            //  $.alert($(this).find('OutMsg').text());
                            $('#spnErrormsg').text($(this).find('OutMsg').text()).css('color', 'red');
                            $('#btnNext').attr('disabled', 'disabled');
                        } else {
                            $('#spnErrormsg').text('');
                        }
                    });
                }
                else {
                    errmsg = 'Shipment does not exists';
                   // $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
              //  $.alert(r.Message);
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

function UpdateVCTStatus(D_Status) {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtVCTNo = $('#txtVCTNo').val();
    var txtDoorNo = $('#txtDoor').val();
    //if ($('#txtDoor').val() == "") {
    //    errmsg = "Please enter door.</br>";
    //    $.alert(errmsg);
    //    return;
    //}

    if (D_Status == 'I') {
        if ($('#txtDoor').val() == "") {
            $('#spnErrormsg').text('Please enter door No.').css('color', 'red');
            $('#txtDoor').focus();
            return;
        } else {
            var txtDoorNo = $('#txtDoor').val();
            $('#spnErrormsg').text('');

        }

    } else {
        txtDoorNo = '';
    }



    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var t = formattedDate.getTime();
    var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    newDate = y.toString() + '-' + m.toString() + '-' + d.toString(); var _Mode;


    var allParm = 'pi_strVCTNo == ' + txtVCTNo + '  ' +
                //'pi_VCTDatetime == ' + newDate + '  ' +
                'pi_strUserId == ' + UserId + '  ' +
                'pi_strMode == ' + D_Status + '  ' +
                'pi_strDoor == ' + $('#txtDoor').val()


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "UpdateVCTDokInDockOutStatus",
            data: JSON.stringify({
                'pi_strVCTNo': txtVCTNo,
                //'pi_VCTDatetime': newDate,
                'pi_strUserId': UserName,
                'pi_strMode': D_Status,
                'pi_strDoor': $('#txtDoor').val()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $('#spnErrormsg').text('');
                $("body").mLoading('hide');
                response = response.d;
                var xmlDoc = $.parseXML(response);
                $("#btnScanAccpt").removeAttr('disabled');
                $('#tblNewsForGatePass').hide();
                $('#divULDNumberDetails').empty();
                console.log(xmlDoc);
                $(xmlDoc).find('Table').each(function () {
                    // $.alert($(this).find('OutMsg').text());
                    Status = $(this).find('Status').text()
                    if (Status == 'E') {
                        $('#spnErrormsg').text($(this).find('OutMsg').text()).css('color', 'red');
                    } else {
                        $('#spnErrormsg').text($(this).find('OutMsg').text()).css('color', 'green');
                        // $.alert($(this).find('OutMsg').text()).css('color', 'green');

                        GetVCTDetailsForTDGAcceptance('false', 'false');
                        return;
                    }


                    //var status = $(this).find('Status').text();
                    //$.alert($(this).find('StrMessage').text());
                    //if (status == 'E') {
                    //    // $.alert($(this).find('OutMsg').text());
                    //}
                    //$("#spnMsg").text('');
                    //var Status = $(this).find('Status').text();
                    //var StrMessage = $(this).find('StrMessage').text();
                    //var TxtColor = $(this).find('TxtColor').text();

                    //if (Status == 'E') {

                    //    $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    //    $('#divULDNumberDetails').empty();
                    //    $('#divULDNumberDetails').hide();
                    //    html = '';
                    //    return true;
                    //} else {
                    //    $("#spnMsg").text(StrMessage).css({ 'color': TxtColor });
                    //}
                });

                // $(xmlDoc).find('Table1').each(function () {

                //     FlightSeqNo = $(this).find('FltSeqNo').text();
                // });



            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
               // $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }
}


function goToTDGAcceptanceAWB() {

    //if ($('#txtDoor').val() == '') {
    //    errmsg = "Please enter door.";
    //    $.alert(errmsg);
    //    return;
    //}


    window.localStorage.setItem("VCTNo", VCTNo);
    window.localStorage.setItem("Door", $('#txtDoor').val());
    window.location = "EXP_TDGAcceptance2.html";
}

function GetShipmentDetailsForTDG() {

    $('#divShippingBillInfo').hide();
    $('#divTDGinfo').show();

    $("#btnSave").removeAttr("disabled");
    $("#txtReceivedPkgs").removeAttr("disabled");

    clearBeforePopulate();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var AWBNo;

    if (type == 'S' && $('#txtSlotNo').val() == '') {
        errmsg = "Please enter Slot No.";
        $.alert(errmsg);
        return;
    }

    if (type == 'A')
        AWBNo = $('#txtAWBNo').val();

    if (type == 'S')
        AWBNo = $('#ddlAWBno').find('option:selected').text();

    if (AWBNo == '') {
        errmsg = "Please enter AWB No.";
        $.alert(errmsg);
        return;
    }

    if (AWBNo.length != '11') {
        errmsg = "Please enter valid AWB No.";
        $.alert(errmsg);
        return;
    }

    if (n.toString().length < Number(2))
        n = '0' + n;
    if (t.toString().length < Number(2))
        t = '0' + t;


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetShipmentDetailsforTDGAcceptance_PDA",
            data: JSON.stringify({ 'pi_strNumber': AWBNo, 'pi_strMode': 'A' }),
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
                if (str != null && str != "") {


                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {
                        //debugger;
                        if (index == 0) {
                            AWBid = $(this).find('AWBId').text();
                            if (type == 'A')
                                $('#txtSlotNo').val($(this).find('SlotNo').text());
                            $('#txtSlotTime').val($(this).find('SlotNo').text().slice(-4));
                            $('#txtFlightNo').val($(this).find('FlightNo').text());
                            $('#txtFlightDate').val($(this).find('FlightDt').text());
                            $('#txtFltDestination').val($(this).find('OffPoint').text());
                            $('#txtAWBDestination').val($(this).find('Destination').text());
                            $('#txtDecPackages').val($(this).find('Pieces').text());
                            $('#txtDeclGrossWt').val($(this).find('GrWt').text());
                            $('#txtDeclchrgWt').val($(this).find('ChWt').text());
                            $('#txtRcvdGrossWt').val($(this).find('ActualGrWt').text());
                            $('#txtCommodity').val($(this).find('Commodity').text());
                            $('#txtDeclVolWt').val($(this).find('DeclaredVolWt').text());
                            $('#txtRcvdVolWt').val($(this).find('ActualVolWt').text());

                            $('#txtExporterName').val($(this).find('Exporter').text());
                            $('#txtIataCode').val($(this).find('IATA').text());
                            $('#txtCHACode').val($(this).find('CHA').text());

                            if ($(this).find('TDGStatus').text() == 'true') {
                                $("#btnSave").attr("disabled", "disabled");
                                $("#txtReceivedPkgs").attr("disabled", "disabled");
                            }

                            if ($(this).find('Pieces').text() == '0/0') {
                                $("#btnSave").attr("disabled", "disabled");
                                $("#txtReceivedPkgs").attr("disabled", "disabled");
                            }

                            if (Number($(this).find('ActualGrWt').text()) > Number($(this).find('ActualChWt').text()))
                                $('#txtRcvdchrgWt').val($(this).find('ActualGrWt').text());
                            if (Number($(this).find('ActualChWt').text()) > Number($(this).find('ActualGrWt').text()))
                                $('#txtRcvdchrgWt').val($(this).find('ActualChWt').text());
                            if (Number($(this).find('ActualChWt').text()) == Number($(this).find('ActualGrWt').text()))
                                $('#txtRcvdchrgWt').val($(this).find('ActualChWt').text());
                        }
                    });
                    $(xmlDoc).find('Table').each(function () {
                        if ($(this).find('OutMsg').text().length > Number(5)) {
                            $.alert($(this).find('OutMsg').text());

                        }
                    });
                }
                else {
                    errmsg = 'Shipment does not exists';
                    $.alert(errmsg);
                }

            },
            error: function (msg) {
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
               // $.alert(r.Message);
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

function GetVCTUnScanDetail() {

    if ($("#txtVCTNo").val().length < 10) {
        $('#spnErrormsg').text('Please enter valid  VCT No.').css('color', 'red');
        return;
    } else {
        $('#spnErrormsg').text('');

    }
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: CMSserviceURL + "GetAWBSBDetail_HHT",
            data: JSON.stringify({ 'pi_strAWBNumber': "", 'pi_strVCTNo': $('#txtVCTNo').val() }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d;
                if (str != null && str != "") {

                    $('#divAddLocation').empty();
                    html = '';

                    html = "<table id='tblNews' border='1' style='width:100%;table-layout:fixed;word-break:break-word;border-color: white;margin-top: 2%;'>";
                    html += "<thead><tr>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>MAWB No.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>SB No.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>HAWB No.</th>";
                    html += "<th height='30' style='background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px' align='center'font-weight:'bold'>Pieces</th>";
                    html += "</tr></thead>";
                    html += "<tbody>";

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        AL_ROWID_I = $(this).find('AL_ROWID_I').text();
                        SDA_ROWID_I = $(this).find('SDA_ROWID_I').text();
                        SDA_SBNo_C = $(this).find('SDA_SBNo_C').text();
                        SDA_AWBNumber_C = $(this).find('SDA_AWBNumber_C').text();
                        SDA_HAWBNo_C = $(this).find('SDA_HAWBNo_C').text();
                        SDA_PackageCount_I = $(this).find('SDA_PackageCount_I').text();
                        SDA_GrossWt_I = $(this).find('SDA_GrossWt_I').text();
                        SDA_TimeStamp_Dt = $(this).find('SDA_TimeStamp_Dt').text();
                        SDA_LockStatus_I = $(this).find('SDA_LockStatus_I').text();
                        SDA_IsManaual_B = $(this).find('SDA_IsManaual_B').text();
                        SDA_SBDate = $(this).find('SDA_SBDate').text();
                        TDGStatus = $(this).find('TDGStatus').text();
                        if (TDGStatus != 'true') {
                            $("#myModalUnScan").modal('show');
                            $('#spnErrormsg').text('');
                            AddTableLocation(SDA_AWBNumber_C, SDA_SBNo_C, SDA_HAWBNo_C, SDA_PackageCount_I);
                        } else {
                            $('#spnErrormsg').text('Pending shipment not found.').css('color', 'red');
                        }

                    });


                    html += "</tbody></table>";

                    if (html != '') {
                        $('#divAddLocation').append(html);
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
              //  $.alert(r.Message);
            }
        });
    }
}

function AddTableLocation(DA_AWBNumber_C, SDA_SBNo_C, SDA_HAWBNo_C, SDA_PackageCount_I) {
    html += "<tr>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + DA_AWBNumber_C + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='left'>" + SDA_SBNo_C + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + SDA_HAWBNo_C + "</td>";

    html += "<td height='30' onclick='GetMeetingByNo(abc)'style='background: rgb(224, 243, 215);padding-left: 4px;font-size:14px'align='center'>" + SDA_PackageCount_I + "</td>";

    html += "</tr>";
}

function SaveTDGDetails() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var txtReceivedPkgs = $('#txtReceivedPkgs').val();
    var GrossWt = 0;
    var ChargablWt = 0;
    var EuroPalletNo = 0;
    var ReceivedPieces = 0;


    if (txtReceivedPkgs == "") {

        errmsg = "Please enter received pckgs.</br>";
        $.alert(errmsg);
        return;

    }

    //if (EuroPalletNo == "") {
    //    EuroPalletNo = '0';
    //}

    //if (Number(ReceivedPieces) > Number(TotalPIECESno)) {
    //    errmsg = "TDG packages cannot be more than declared packages.</br>";
    //    $.alert(errmsg);
    //    return;
    //}


    var xml = "";
    xml = '<TDGInfo><TDGDetail ALRowId="' + AWBid + '" ScannedPkgs="' + txtReceivedPkgs + '" ScannedGrossWt="' + GrossWt + '" VolumetricWt="' + ChargablWt + '" EuroPalletNo="' + EuroPalletNo + '" IsPalletWiseScan="0" CreatedBy="' + window.localStorage.getItem("UserName") + '" Remarks="" TDGDate="' + n + "/" + t + "/" + y + '"/></TDGInfo>';
    console.log(xml);
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: CMSserviceURL + "CreatePartTDGAcceptance_PDA",
            data: JSON.stringify({
                'pi_strTDGDetails': xml, 'pi_strMode': "false",
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
                var str = response.d

                var xmlDoc = $.parseXML(str);
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {
                        //if (($(this).find('OutMsg').text()).length < Number(5))
                        $.alert($(this).find('OutMsg').text());
                        //else
                        //    $.alert($(this).find('OutMsg').text());
                    }
                });
                //clearALL();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                //$.alert('Some error occurred while saving data');
                var r = jQuery.parseJSON(msg.responseText);
              //  $.alert(r.Message);
            }
        });
        return false;
    }

}

function BackFromSbill() {
    $('#divShippingBillInfo').hide();
    $('#divTDGinfo').show();

}

function clearALL() {

    $('#txtVCTNo').focus();

    $('#txtVCTNo').val('');
    $('#txtDoor').val('');
    $('#txtTotalPieces').val('');
    $('#txtGrossWt').val('');
    $('#txtAcceptedPieces').val('');
    $('#txtRemainingPieces').val('');
    $('#txtAWBCount').val('');

    $('#txtAWBDestination').val('');
    $('#txtDecPackages').val('');
    $('#txtDeclGrossWt').val('');
    $('#txtDeclchrgWt').val('');
    $('#txtRcvdGrossWt').val('');
    $('#txtRcvdchrgWt').val('');
    $('#txtDeclVolWt').val('');
    $('#txtRcvdVolWt').val('');
    $('#txtCommodity').val('');
    $('#txtReceivedPkgs').val('');
    $('#txtExporterName').val('');
    $('#txtIataCode').val('');
    $('#txtCHACode').val('');
    $("#btnSave").removeAttr("disabled");
    $("#txtReceivedPkgs").removeAttr("disabled");
    if (type == 'A')
        $('#txtAWBNo').focus();
    $('#ddlAWBno').empty();
    $('#divAddLocation').empty();
    $('#spnErrormsg').text('');

    $('#btnDockIn').attr('disabled', 'disabled');
    $('#btnNext').attr('disabled', 'disabled');
    $('#btnDockOut').attr('disabled', 'disabled');
    $('#btnUnScanned').attr('disabled', 'disabled');

}

function FocusSlot() {
    if (type == 'S')
        $('#txtSlotNo').focus();
}

function clearBeforePopulate() {
    $('#txtEuroPalletNo').val('');
    $('#txtFlightNo').val('');
    $('#txtFlightDate').val('');
    $('#txtPackages').val('');
    $('#txtGrossWt').val('');
    $('#txtchrgWt').val('');
    $('#txtReceivedPkgs').val('');
    $('#txtPendingPkgs').val('');
    $('#txtDestination').val('');
    $('#txtCommodity').val('');
}


function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}

function clearModalTbl() {

    $('#divAddLocation').empty();


}
