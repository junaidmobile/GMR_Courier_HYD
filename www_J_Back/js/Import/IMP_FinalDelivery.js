
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");

//var CargoWorksServiceURL = "http://10.22.3.154/Galaxy/services/hhtexpservices.asmx/";

//var AirportCity = "FRA";
//var UserId = "252";
//var CompanyCode = "3";
//var SHEDCODE = "KS1";


var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var UserName = window.localStorage.getItem("UserName");
var currentYear;
var HAWBId;
var MId;
var PkgType;
var MNo;
var LocId;
var MPSId = '0';
var ifMPSId;
var _gatePassNo;
var _HawbIDcome;

$(function () {

    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }
    //if ($('#chkVctNo').prop('checked')) {
    //    $('#frmHAWBNo').show();
    //    $('#frmMPSNo').hide();

    //}

    EnableMPSNo();

    $('#txtHAWBNo').focus();
    //$('#chkHWABNo').click(function () {
    //    var checked = $(this).attr('checked', true);
    //    if (checked) {
    //        $('#lblHAWBNO').show();
    //        $('#lblmpsno').hide();
    //        $('#lblCTM').hide();
    //        $('#txtHAWBNo').focus();
    //        $('#txtHAWBNo').val('');


    //    }

    //});


    //$('#chkMPSNo').click(function () {
    //    var checked = $(this).attr('checked', true);
    //    if (checked) {
    //        $('#lblHAWBNO').hide();
    //        $('#lblmpsno').show();
    //        $('#lblCTM').hide();
    //        $('#txtHAWBNo').focus();
    //        $('#txtHAWBNo').val('');
    //        $('#txtPieces').val('');
    //        $('#txtTotPkgs').val('');
    //        $('#txtMovePkgs').val('');
    //    }

    //});

    $('#chkCTMNo').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblHAWBNO').hide();
            $('#lblmpsno').hide();
            $('#lblCTM').show();

            $('#txtHAWBNo').focus();
            $('#txtHAWBNo').val('');
            $('#txtPieces').val('');
            $('#txtTotPkgs').val('');
            $('#txtMovePkgs').val('');
        }

    });




    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var date = y.toString() + '-' + m.toString() + '-' + d.toString();

    currentYear = y;



});


function EnableMPSNo() {
    MPSStatus = document.getElementById("chkMPSNo").checked;

    if (MPSStatus == false) {
        isMPS = '0';
        $('#lblHAWBNO').show();
        $('#lblIMPSNo').hide();
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        clearBeforePopulate();
    }

    if (MPSStatus == true) {
        isMPS = '1';
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        $('#lblHAWBNO').hide();
        $('#lblIMPSNo').show();
        clearBeforePopulate();
    }
}

//function GetImpShipmentsForLocation_HHT() {
//    if ($('#chkHWABNo').prop('checked')) {

//        getDataByMAWBNo();
//    }

//    if ($('#chkMPSNo').prop('checked')) {

//        getDataByMPSNo();

//    }
//}

function getDetailsByHWABNo() {

    $('#ddlGatePassNo').empty();
    $('#txtPieces').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');

    if ($('#txtHAWBNo').val() == '') {
        //  $('#spnErrorMsg').text('Please enter HAWB No./MPS No./CTM').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#chkHWABNo').prop('checked')) {

        strType = "C";
        // strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        strType = "I";
        // strMode = "H";

    }

    // if ($('#chkCTMNo').prop('checked')) {

    //     strType = "T";
    //     //strMode = "H";

    // }
    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }


    inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><BarCode>' + $('#txtHAWBNo').val() + '</BarCode><Gatepass></Gatepass><AirportCity>' + AirportCity + '</AirportCity></Root>';


    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetGatepassDetails_V4",
            data: JSON.stringify({

                'InputXML': inputxml


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

                // clearBeforePopulate();
                var xmlDoc = $.parseXML(str);
                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {
                    // if (index == 0) {

                    WDO_NO = $(this).find('WDO_NO').text();
                    HAWBId = $(this).find('HAWBId').text();
                    GPNo = $(this).find('GPNo').text();
                    MAWBNo = $(this).find('MAWBNo').text();
                    HAWBNo = $(this).find('HAWBNo').text();
                    HAWBId = $(this).find('HAWBId').text();

                    //<GPId>729871</GPId>
                    //<HAWBId>923846</HAWBId>
                    //<GPNo>G2201180228</GPNo>
                    //<MAWBNo>12560412424</MAWBNo>
                    //<HAWBNo>6977920095</HAWBNo>
                    //<IsDelivered>true</IsDelivered>

                    if (index == 0 && $("#ddlGatePassNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlGatePassNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(WDO_NO).text(WDO_NO);
                    newOption.appendTo('#ddlGatePassNo');

                    //  }
                    $('#spnErrorMsg').text('');
                });


                $(xmlDoc).find('Table').each(function (index) {


                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnErrorMsg').text(StrMessage).css('color', 'red');
                        $('#btnSave').attr('disabled', 'disabled');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');
                        $('#btnSave').removeAttr('disabled');

                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function getDetailsByHWABNoOnClickGetButton() {

    $('#ddlGatePassNo').empty();
    $('#txtPieces').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');

    if ($('#txtHAWBNo').val() == '') {
        $('#spnErrorMsg').text('Please enter HAWB No./MPS No./CTM').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#chkHWABNo').prop('checked')) {

        strType = "C";
        // strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        strType = "I";
        // strMode = "H";

    }

    // if ($('#chkCTMNo').prop('checked')) {

    //     strType = "T";
    //     //strMode = "H";

    // }
    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }


    inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><BarCode>' + $('#txtHAWBNo').val() + '</BarCode><Gatepass></Gatepass><AirportCity>' + AirportCity + '</AirportCity></Root>';


    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetGatepassDetails_V4",
            data: JSON.stringify({

                'InputXML': inputxml


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

                // clearBeforePopulate();
                var xmlDoc = $.parseXML(str);
                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {
                    // if (index == 0) {

                    WDO_NO = $(this).find('WDO_NO').text();
                    HAWBId = $(this).find('HAWBId').text();
                    GPNo = $(this).find('GPNo').text();
                    MAWBNo = $(this).find('MAWBNo').text();
                    HAWBNo = $(this).find('HAWBNo').text();
                    HAWBId = $(this).find('HAWBId').text();

                    //<GPId>729871</GPId>
                    //<HAWBId>923846</HAWBId>
                    //<GPNo>G2201180228</GPNo>
                    //<MAWBNo>12560412424</MAWBNo>
                    //<HAWBNo>6977920095</HAWBNo>
                    //<IsDelivered>true</IsDelivered>

                    if (index == 0 && $("#ddlGatePassNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlGatePassNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(WDO_NO).text(WDO_NO);
                    newOption.appendTo('#ddlGatePassNo');

                    //  }
                    $('#spnErrorMsg').text('');
                });


                $(xmlDoc).find('Table').each(function (index) {


                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnErrorMsg').text(StrMessage).css('color', 'red');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');
                        $('#btnSave').removeAttr('disabled');
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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






function clearBeforePopulate() {

    $('#ddlGatePassNo').empty();

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlGatePassNo');
    $('#btnSave').attr('disabled', 'disabled');

    $('#txtHAWBNo').focus();
    $('#txtHAWBNo').val('');
    $('#txtPieces').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
    $('#txtPkgType').val('');

    $('#spnErrorMsg').text('');


}

function getDataOnChangeOfMAWBNo(GPNoHAWBno) {

    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }


    inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><BarCode>' + $('#txtHAWBNo').val() + '</BarCode><Gatepass>' + $('#ddlGatePassNo').val() + '</Gatepass><AirportCity>' + AirportCity + '</AirportCity></Root>';
    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetGatepassDetails_V4",
            data: JSON.stringify({
                'InputXML': inputxml
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
                console.log(xmlDoc)
                $(xmlDoc).find('Table1').each(function (index) {
                    if (index == 0) {

                        NPX = $(this).find('NPX').text();
                        NPX = $(this).find('NPX').text();
                        NPR = $(this).find('NPR').text();
                        PKG_RECD = $(this).find('PKG_RECD').text();

                        $('#txtPieces').val('1');
                        $('#txtTotPkgs').val(NPX);
                        $('#txtMovePkgs').val(PKG_RECD);

                    }

                });



                $(xmlDoc).find('Table').each(function (index) {

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnErrorMsg').text(StrMessage).css('color', 'red');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function getDataOnChangeofIGMNo(IGMNo) {


    $('#PkgsType').val('');
    $('#txtPkgs').val('');
    $('#txtxLocation').val('');
    $('#txtBinningPkgs').val('');
    $('#spnErrorMsg').val('');

    if (IGMNo == '0') {

        return
    }
    if ($('#chkHWABNo').prop('checked')) {
        strType = "I";
        MPSNoORHAWBNo = '';
    }

    if ($('#chkMPSNo').prop('checked')) {
        strType = "M";
        MPSNoORHAWBNo = $('#txtHAWBNo').val();
    }

    //if ($('#txtHAWBNo').val() == '') {
    //    MPSNoORHAWBNo = '';
    //} else {
    //    MPSNoORHAWBNo = $('#txtHAWBNo').val();
    //}


    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImpShipmentLocationDetails_HHT",
            data: JSON.stringify({
                'pi_strParamCode': strType,
                'pi_intHAWBId': HId,
                'pi_intIGMNo': IGMNo,
                'pi_strMPSNo': MPSNoORHAWBNo,
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
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    LocId = $(this).find('LocId').text();
                    LocCode = $(this).find('LocCode').text();
                    Pieces = $(this).find('Pieces').text();
                    ShipmentPieces = $(this).find('ShipmentPieces').text();
                    LocPieces = $(this).find('LocPieces').text();
                    LocStatis = $(this).find('LocStatis').text();
                    MPSNo = $(this).find('MPSNo').text();
                    MPSId = $(this).find('MPSId').text();
                    PkgType = $(this).find('PkgType').text();
                    ifMPSId = MPSId;
                    $('#txtFromLoc').val(LocCode);
                    $('#txtTotPkgs').val(LocPieces);
                    $('#txtPkgType').val(PkgType);
                    $('#spnErrorMsg').text('');
                });

                $(xmlDoc).find('Root').each(function (index) {


                    Output = $(this).find('Output').text();

                    if (Output != '') {
                        $('#spnErrorMsg').text(Output).css('color', 'red');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');
                    }

                });

                // "<Root><Output>Shipment location still pending</Output></Root>"

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

function SaveGatepassDetails_V4() {

   
    if ($('#txtHAWBNo').val() == '') {
        $('#spnErrorMsg').text('Please enter HAWB / MPS No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#ddlGatePassNo').val() == '0' || $('#ddlGatePassNo').val() == null) {
        $('#spnErrorMsg').text('Please select Gate Pass No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (document.getElementById('chkMPSNo').checked) {
        IsMPSNo = 'Y';
    }
    else {
        IsMPSNo = 'N';
    }


    // inputxml = '<Root><IsMPSNo>' + IsMPSNo + '</IsMPSNo><BarCode>' + $('#txtHAWBNo').val() + '</BarCode><Gatepass></Gatepass><AirportCity>' + AirportCity + '</AirportCity></Root>';
    inputxml = '<Root><WDONo>' + $('#ddlGatePassNo').val() + '</WDONo><IsMPSNo>' + IsMPSNo + '</IsMPSNo><BarCode>' + $('#txtHAWBNo').val() + '</BarCode><AirportCity>' + AirportCity + '</AirportCity><Username>' + UserName + '</Username><CollectedBy>' + UserName + '</CollectedBy><Identification></Identification><VehicleNo></VehicleNo><DriverName></DriverName></Root>';
    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",

            url: GHAImportFlightserviceURL + "SaveGatepassDetails_V4",
            data: JSON.stringify({
                'InputXML': inputxml
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
                console.log(xmlDoc)
                $(xmlDoc).find('Table').each(function (index) {

                    Status = $(this).find('Status').text();
                    StrMessage = $(this).find('StrMessage').text();

                    if (Status == 'E') {
                        $('#spnErrorMsg').text(StrMessage).css('color', 'red');
                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();
                        return;

                    } else {
                        $('#spnErrorMsg').text(StrMessage).css('color', 'green');

                        $('#ddlGatePassNo').empty();

                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlGatePassNo');


                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();
                        $('#txtPieces').val('');
                        $('#txtTotPkgs').val('');
                        $('#txtMovePkgs').val('');
                        $('#txtNewLoc').val('');
                        $('#txtPkgType').val('');

                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
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

